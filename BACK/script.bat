@echo off

REM Maven Wrapper Clean
call .\mvnw.cmd clean package -DskipTests

REM Docker Compose
call docker-compose up
