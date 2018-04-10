REGISTRY := registry.k8s.zeit.de
REV := $(shell git describe --tags)

.PHONY: build
build:
	docker build --tag ${REGISTRY}/a11y_dashbord_connector:${REV} .

.PHONY: test
test:
	docker run --publish 8080:8080 ${REGISTRY}/a11y_dashbord_connector:${REV}

.PHONY: k8s
k8s:
	# docker push ${REGISTRY}/hangman:${REV}
	sed 's#${REGISTRY}/hangman:.*\",#${REGISTRY}/hangman:${REV}",#' k8s/deployment.json 
	# | kubectl apply -f -
	# kubectl rollout status deployment/hangman-deployment