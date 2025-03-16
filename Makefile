.PHONY: all
all: gomod generate build

.PHONY: clean-gen
clean-gen:
	rm -rf gen
	rm -rf client/src/grpc
	rm -rf docs/gen

.PHONY: generate
generate: clean-gen
	mkdir -p gen/go
	mkdir -p client/src/grpc
	go generate ./api/...
	# go generate ./internal/...
	# go generate .

.PHONY: build
build: cmd/*
	@for file in $^ ; do \
                srvsrv="`echo $$file | cut -f 2 -d '/'`"; \
				echo cmd/$$srvsrv/main.go;\
				go build -cover -o bin/$$srvsrv cmd/$$srvsrv/main.go; \
    done

docker-%:
	docker run --rm -v $$PWD:$$PWD:rw -w $$PWD go-image make $*

.PHONY: bash
docker-bash:
	docker run --rm -v $$PWD:$$PWD:rw -w $$PWD -it go-image bash

.PHONY: build-docker-images
build-docker-images: build-envoy
	docker build -f docker/go-image -t go-image:latest .
	docker build -t ui-stavki:latest ./client

.PHONY: build-envoy
build-envoy: envoy/*
	@for file in $^ ; do \
                srvsrv="`echo $$file | cut -f 2 -d '/'`"; \
				echo envoy/$$srvsrv/main.go;\
				docker build -t envoy/$$srvsrv -f ./envoy/Dockerfile envoy/$$srvsrv; \
    done

.PHONY: gomod
gomod: 
	go mod tidy

test-%:
	rm -rf cover
	docker-compose down --remove-orphans --volumes
	docker-compose --profile $* up --force-recreate
	
.PHONY: cover
docker-cover:
	docker run --rm -v $$PWD:$$PWD:rw -w $$PWD main-image:latest mkdir -p /cover_merged && \
		go tool covdata textfmt -i=cover -o cover.out && \
    	go tool cover -html cover.out -o cover.html

.PHONY: run
run:
	rm -rf cover
	docker-compose down --remove-orphans --volumes
	docker-compose up --build --force-recreate

.PHONY: compose-build
compose-build:
	docker-compose build