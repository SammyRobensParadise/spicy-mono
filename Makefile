# makefile

.PHONY: help

help:
	@echo "Makefile commands:"
	@echo "builds   - builds library container"
	@echo "up      - builds and starts library container"
	@echo "stop    - stops library docker container"
	@echo "all     - One-stop-shop builds and starts everything"

builds:
	@echo "Building Docker Images... 🐳"
	docker-compose build
	@echo "Done! ✨"
up: builds
	@echo "Starting library... ⚡️ "
	docker-compose up --build -d
	@docker-compose ps
	@echo "Done! ✨"
	@echo "Storybook Library is running on http://localhost:6006 🌐"
	open http://localhost:6006
	@docker-compose logs --follow
stop:
	@echo "Stopping Library 🛑"
	docker-compose down
	@echo "Done! ✨"
	@echo "Sucessfully stopped Library"
all: builds up
	@echo "Success 🎉"



