# CI deploy pipeline

`.github/workflows/deploy.yml` builds the image, pushes it to the homelab Nexus
registry, and rolls it out to **homelab-k8s** on every merge to `main`. It runs
on the org's self-hosted runner **`gh-runner-02`** on the home LAN
(`runs-on: [self-hosted, linux, x64, homelab]`), because GitHub-hosted runners
can't reach Nexus or the cluster API.

```
merge to main ──► gh-runner-02 (LAN)
                    ├─ docker login nexus-lan.keresifon.com
                    ├─ deploy/deploy.sh all   (SYNC_SECRETS=0)
                    │    ├─ docker buildx build --platform linux/amd64 --push
                    │    ├─ kubectl apply -k deploy/k8s   (as github-deployer)
                    │    └─ rollout status + curl health check
                    └─ remove kubeconfig, docker logout
```

## Security model

The runner authenticates as the **`github-deployer`** ServiceAccount, whose Role
(`rbac.yaml`) is namespaced to `akisok` and can manage only Deployments,
ReplicaSets, and Services, and read Pods/logs/events. It **cannot read or write
Secrets** and has **no cluster-scoped rights**. Because of that, the pipeline runs
with `SYNC_SECRETS=0`: the namespace and secrets are created once from the Mac.

## One-time setup (from the Mac, admin kubeconfig)

```bash
export KUBECONFIG="$HOME/homelab-k8s/kubeconfig"

# 1. Namespace + nexus-pull + akisok-site-env
deploy/deploy.sh secrets

# 2. Deployer identity and its token
kubectl apply -f deploy/ci/rbac.yaml

# 3. Deployer kubeconfig -> GitHub secret
chmod +x deploy/ci/make-kubeconfig.sh
deploy/ci/make-kubeconfig.sh | gh secret set KUBE_CONFIG_B64 -R kere-sifon/akisok-site

# 4. Nexus push credentials
gh secret set NEXUS_PUSH_USER     -R kere-sifon/akisok-site --body kere-docker
# Same docker-hosted-push password as kwesiblack / keresifonii:
gh secret set NEXUS_PUSH_PASSWORD -R kere-sifon/akisok-site

# 5. Cloudinary (used at image *build* time, not only runtime)
gh secret set CLOUDINARY_CLOUD_NAME  -R kere-sifon/akisok-site
gh secret set CLOUDINARY_API_KEY     -R kere-sifon/akisok-site
gh secret set CLOUDINARY_API_SECRET  -R kere-sifon/akisok-site
```

Then push to `main`, or run the **Deploy** workflow manually.

## GitHub secrets

| Secret | What it is |
| --- | --- |
| `KUBE_CONFIG_B64` | base64 `github-deployer` kubeconfig |
| `NEXUS_PUSH_USER` / `NEXUS_PUSH_PASSWORD` | Nexus docker-hosted-push user |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | photo lookup during `next build` |
