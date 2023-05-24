@echo off

REM Maven Wrapper Clean
.\mvnw.cmd clean package -DskipTests

REM Docker Compose
docker-compose up
