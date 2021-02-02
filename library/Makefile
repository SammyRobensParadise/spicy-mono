# makefile

.PHONY: help library

help:
	@echo "Makefile commands:"
	@echo "build-library"
	@echo "start-library"
	@echo "stop-library"

build-library:
	@echo "Building Docker Image... 🐳"
	docker build -t library .
	@echo "Done! ✨"
start-library:
	@echo "Starting library... ⚡️ "
	docker run -p 6006:6006 -d library
	@docker ps
	@echo "Done! ✨"
	@echo "Storybook Library is running on http://localhost:6006 🌐"
	open http://localhost:6006
stop-library:
	@echo "Stopping Library 🛑"
	docker container stop $$(docker ps -a -q  --filter ancestor=library)
	@echo "Done! ✨"
	@echo "Sucessfully stopped Library"
library:
	@echo "Making library..."
	make build-library && make start-library
	@echo "Success 🎉"



