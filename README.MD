# Informe del Proyecto: Sistema de Autenticación y Gestión de Usuarios

Este informe documenta el desarrollo de un sistema de autenticación y gestión de usuarios implementado en Java y TypeScript. El proyecto utiliza el framework Spring Boot en el backend para construir la API RESTful y Axios en el frontend para realizar las solicitudes HTTP. El sistema utiliza tokens JWT (JSON Web Tokens) para autenticar y autorizar a los usuarios.

## Desarrollo del Programa

El sistema se divide en dos componentes principales: el backend y el frontend.

### Backend

El backend del sistema está desarrollado en Java utilizando el framework Spring Boot. A continuación, se describen las principales características y componentes del backend:

- Controladores (Controllers): Los controladores son responsables de manejar las solicitudes HTTP y definir las rutas de la API. En el controlador `UserController` se implementan los métodos para obtener información de usuarios, eliminar usuarios, realizar inicio de sesión, registro de usuarios y cambiar contraseñas.

- DAO (Data Access Object): El DAO es responsable de acceder a los datos almacenados en la base de datos. En este proyecto, el `UserDao` se encarga de realizar operaciones relacionadas con la entidad de usuario, como obtener usuarios, eliminar usuarios y cambiar contraseñas.

- Utilidades: La clase `JWTUtil` proporciona métodos para la generación y validación de tokens JWT. Estos métodos son utilizados para crear y verificar tokens en el proceso de autenticación y autorización.

- Utilidad de cifrado de contraseñas: La clase `HashPBKDF2` proporciona métodos para generar y validar contraseñas cifradas utilizando el algoritmo PBKDF2 con SALT. Esto mejora la seguridad de las contraseñas almacenadas en la base de datos.

### Frontend

El frontend del sistema está desarrollado en TypeScript y utiliza la biblioteca Axios para realizar las solicitudes HTTP. A continuación, se describen las características principales del frontend:

- Clase `UserService`: Esta clase encapsula las llamadas a la API del backend relacionadas con la autenticación y gestión de usuarios. Proporciona métodos para obtener usuarios, eliminar usuarios, iniciar sesión, registrarse y cambiar contraseñas. También maneja el almacenamiento del token JWT en el LocalStorage del navegador y lo agrega a los encabezados de las solicitudes.

## Dificultades

Durante el desarrollo del proyecto, se encontraron algunas dificultades que requirieron atención y resolución:

- Implementación del manejo de tokens JWT: La implementación adecuada del manejo de tokens JWT fue un desafío importante. Fue necesario comprender el proceso de generación y validación de tokens JWT, así como garantizar su seguridad y manejo correcto en el backend y el frontend.

- Validación de tokens y autorización: Se debió garantizar que los tokens fueran válidos y que los usuarios tuvieran los permisos adecuados para acceder a determinadas rutas y recursos. Esto requirió la implementación de lógica adicional en el backend para validar y verificar los tokens y realizar la autorización adecuada.

## Conclusiones

El desarrollo de este sistema de autenticación y gestión de usuarios fue un desafío enriquecedor que permitió adquirir conocimientos sobre el uso de tokens JWT, la implementación de una API RESTful y la integración entre el backend y el frontend. A través del proyecto, se logró desarrollar un sistema funcional que permite a los usuarios autenticarse, acceder a información de usuarios, eliminar usuarios, realizar cambios de contraseña, registrarse y cerrar sesión de manera segura.

El uso de Spring Boot en el backend facilitó el desarrollo de la API y proporcionó características y herramientas útiles. Por otro lado, el uso de TypeScript en el frontend permitió contar con un código más estructurado y con verificaciones estáticas de tipos.

En resumen, el proyecto permitió adquirir habilidades en el desarrollo de sistemas de autenticación y gestión de usuarios, así como en la integración de componentes backend y frontend. Además, se pudo profundizar en el uso de tokens JWT para proporcionar seguridad en la autenticación y autorización de usuarios.

