# Configura la imagen base de Java
FROM adoptopenjdk:11-jdk-hotspot

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR generado por tu proyecto Spring Boot al directorio de trabajo en el contenedor
COPY BACK/target/auth_provider-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto en el que tu aplicación Spring Boot escucha
EXPOSE 8080

# Establece el comando de entrada para ejecutar tu aplicación Spring Boot
CMD ["java", "-jar", "app.jar"]
