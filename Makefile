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
	docker-compose build --no-cache
	@echo "Done! ✨"
up:
	@echo "Starting library... ⚡️ "
	docker-compose up --build
	@docker-compose ps
	@echo "Done! ✨"
	@echo "Storybook Library is running on http://localhost:6006 🌐"
	open http://localhost:6006
stop:
	@echo "Stopping Library 🛑"
	docker-compose down
	@echo "Done! ✨"
	@echo "Sucessfully stopped Library"
all:
	@echo "Making library..."
	make builds && make up
	@echo "Success 🎉"



