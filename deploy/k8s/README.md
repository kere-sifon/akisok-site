# Deploying akisok-site to homelab-k8s

Next.js standalone app from this repo. Photos resolve from Cloudinary at **build** time.
Exposed on the LAN at http://192.168.2.244:3000 (Cilium LoadBalancer, pinned in `service.yaml`).
Public at https://akisok.keresifon.com through the existing Cloudflare Tunnel.

All commands run from the repo root.

## 1. Build and push

```bash
docker login nexus-lan.keresifon.com
# Production images need Cloudinary at build time or posts fall back to placeholders.
export CLOUDINARY_CLOUD_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET
make build
```

The cluster is x86_64; the Mac is arm64, so `deploy/deploy.sh` always builds `linux/amd64`.

## 2. Secrets (never committed)

```bash
export KUBECONFIG="$HOME/homelab-k8s/kubeconfig"
make secrets
```

That creates the `akisok` namespace, `akisok-site-env` from `.env.local`, and `nexus-pull`
(password from the macOS Keychain item `nexus-k8s-pull`).

## 3. Deploy

```bash
make deploy    # build + push + apply
# or
make apply     # existing TAG
```

Health check: `curl -I http://192.168.2.244:3000/`

## 4. Cutover from Vercel

1. LAN curl returns 200.
2. Cloudflare dashboard > Zero Trust > Networks > Tunnels > Public hostnames:
   add `akisok.keresifon.com` → `http://192.168.2.244:3000`.
3. Confirm https://akisok.keresifon.com loads.
4. Pause or disconnect the Vercel project so Git pushes only rebuild the cluster image.

Still needed before the first image rolls out:

- `gh secret set NEXUS_PUSH_PASSWORD -R kere-sifon/akisok-site` (same docker-hosted-push password as kwesiblack)
- Merge/push this branch to `main` so gh-runner-02 builds the image
- Cloudflare Tunnel hostname `akisok.keresifon.com` → `http://192.168.2.244:3000`

## CI

See [../ci/README.md](../ci/README.md). Push to `main` on `kere-sifon/akisok-site` runs on **gh-runner-02**.
