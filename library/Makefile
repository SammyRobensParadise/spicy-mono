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
	@echo "Start library... ⚡️ "
	docker run -p 6006:6006 -d library
	@docker ps
	@echo "Done! ✨"
	@echo "Storybook Library is running on http://localhost:6006 🌐"
stop-library:
	@echo "Stopping Library 🛑"
	docker ps -a -q  --filter ancestor=library
	@echo "Done! ✨"
	@echo "Sucessfully stopped Library"



