# akisok-site on homelab-k8s. See deploy/k8s/README.md.
export KUBECONFIG ?= $(HOME)/homelab-k8s/kubeconfig
NS := akisok

.PHONY: deploy build apply secrets status logs rollback restart

deploy:   ## build, push and roll out the current working tree
	@deploy/deploy.sh all

build:    ## build and push only
	@deploy/deploy.sh build

apply:    ## roll out without rebuilding (TAG=<tag> to pick one)
	@deploy/deploy.sh apply

secrets:  ## namespace + akisok-site-env + nexus-pull only
	@deploy/deploy.sh secrets

status:
	@kubectl -n $(NS) get deploy,pods,svc -o wide

logs:
	@kubectl -n $(NS) logs -f deploy/akisok-site --all-containers --max-log-requests=4

rollback: ## back to the previous ReplicaSet
	@kubectl -n $(NS) rollout undo deploy/akisok-site && kubectl -n $(NS) rollout status deploy/akisok-site

restart:
	@kubectl -n $(NS) rollout restart deploy/akisok-site
