.PHONY: build up down logs

build:
	docker-compose build

up -d:
	docker-compose up -d


up:
	docker-compose up

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose down
	docker-compose up -d

build-%:
	docker-compose build $*

up-%:
	docker-compose up -d $*

logs-%:
	docker-compose logs -f $*