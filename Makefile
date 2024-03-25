#!make
version  ?= "1.0.0"

# Set the Terraform version
TERRAFORM_VERSION=1.7.5
NEXT_PUBLIC_SITE_URL=https://d286rl1ujj4u0.cloudfront.net

.PHONY: deps
deps: ### Check prerequisites of work environment
	pnpm --version || (echo "Please install pnpm: https://pnpm.io/installation" && exit 1)
	docker --version || (echo "Please install docker: https://docs.docker.com/get-docker/" && exit 1)
	terraform --version || (echo "Please install terraform: https://learn.hashicorp.com/tutorials/terraform/install-cli" && exit 1)

.PHONY: init
init: deps ### Init environment
	if [ ! -f ./.env ]; then cp ./.env.example ./.env; fi
	if [ ! -d ./node_modules ]; then pnpm install; fi

	make _tf_infra_cli cmd=init infra_env=local
	make _tf_infra_cli cmd=plan infra_env=local
	make _tf_infra_cli cmd=apply cmd_args="-auto-approve" infra_env=local
	# pnpm run db:update

.PHONY: clean
clean: tclean ### Cleans PNPM workspace (rm node_modules|dist), kills node processes, stop+rm docker containers
	pnpm run clean:workspaces
	killall -s KILL node ; true
	make _tf_infra_cli cmd=destroy cmd_args="-auto-approve" infra_env=local
	
	
.PHONY: dclean
dclean: ### Stop and remove docker containers and prune networks
	docker stop $(shell docker ps -q) && docker rm $(shell docker ps -q) || echo "No docker containers to stop. Skipping..."
	docker network prune --force
	docker volume prune --force

.PHONY: tclean
tclean: ### Stop and remove local infra terraform state
	make _tf_infra_cli cmd=destroy cmd_args="-auto-approve" infra_env=local
	#rm -rf infra/local/terraform.tfstate infra/local/.terraform infra/local/.terraform.lock.hcl infra/local/terraform.tfstate.backup


.PHONY: fix
fix: ### Run linting and pretty formatting
	pnpm run lint:fix
	pnpm run format:fix



.PHONY: check
check: init _check ### Run all checks
	osascript -e 'display notification "PASSED Checks" with title "Makefile Check"' || echo "PASSED Checks"


.PHONY: qcheck
qcheck: _check ### Run quick check
	osascript -e 'display notification "PASSED Quick Checks" with title "Quick Makefile Check"' || echo "PASSED Checks"


.PHONY: build
build: init ### Build environment
	pnpm build

.PHONY: start
start: init build ### Build and start environment
	pnpm start

.PHONY: dev
dev: init ### Run development environment
	pnpm dev


.PHONY: e2e
e2e: ### Run environment
	pnpm run test:e2e

.PHONY: e2ew
e2ew: ### Run environment
	pnpm run test:e2e:watch

.PHONY: sb
sb: ### Runs and opens storybook
	pnpm storybook


.PHONY: help
help: ### Help with commands
	@printf "\033[33mWFR Makefile v$(version)\033[0m\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?### .*$$' ./Makefile | awk 'BEGIN {FS = ":.*?### "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help





_check:
	pnpm turbo build lint type-check
	

	make _tf_infra_cli cmd=validate infra_env=local
	make _tf_infra_cli cmd=validate infra_env=remote

	## smoketests: check if services are running before e2e tests
	CHECK_RESPONSE__URL="${NEXT_PUBLIC_SITE_URL}" \
          CHECK_RESPONSE__EXPECT_STATUS_CODE="200" \
          bash ./util/check_response_wait_code.sh

	NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} pnpm run test:unit
	pnpm run test:e2e
	


## NOTE: use this to use locally installed terraform cli
_tf_infra_cli:
	if [ -z $(cmd) ]; then echo "cmd not set! (e.g. make _tf_infra_cli cmd=[cmd] infra_env=[infra_env])"; exit 1; fi
	if [ -z $(infra_env) ]; then echo "infra_env not set! (e.g. make _tf_infra_cli cmd=[cmd] infra_env=[infra_env])"; exit 1; fi
	cd ./infra/local && terraform $(cmd) $(cmd_args)

## NOTE: this is broken, need to use custom docker image to have docker cli available inside image hashicorp/terraform for local-exec provisioners
# _tf_infra_cli:
# 	if [ -z $(cmd) ]; then echo "cmd not set! (e.g. make _tf_infra_cli cmd=[cmd] infra_env=[infra_env])"; exit 1; fi
# 	if [ -z $(infra_env) ]; then echo "infra_env not set! (e.g. make _tf_infra_cli cmd=[cmd] infra_env=[infra_env])"; exit 1; fi
# 	docker run --rm \
# 	-v /var/run/docker.sock:/var/run/docker.sock \
# 	-v ${PWD}/infra:/workspace/infra \
# 	-v ${PWD}/services:/workspace/services \
# 	-w /workspace/infra/$(infra_env) hashicorp/terraform:${TERRAFORM_VERSION} $(cmd) $(cmd_args)