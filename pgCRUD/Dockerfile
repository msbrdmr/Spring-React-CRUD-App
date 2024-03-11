FROM openjdk:17-oracle
EXPOSE 8080
ARG JAR_FILE=target/pgCRUD-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} pgCRUD.jar
ENTRYPOINT ["java", "-jar", "pgCRUD.jar"]
