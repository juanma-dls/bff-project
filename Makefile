.PHONY: build up down logs

build:
	docker-compose build

up-d:
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

test-all:
	docker-compose exec int-products-ms npm test
	docker-compose exec int-category-ms npm test
	docker-compose exec fcd-products npm test
	docker-compose exec bff-products npm test

test-%:
	docker-compose exec $* npm test