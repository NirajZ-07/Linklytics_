# Use a Java 23 JDK image to build the Spring Boot app
#FROM eclipse-temurin:23-jdk AS build
FROM eclipse-temurin:21-jdk AS build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw ./
COPY .mvn/ .mvn/

# Ensure the Maven wrapper is executable
RUN chmod +x mvnw

# Copy the pom.xml and install dependencies
COPY pom.xml ./
RUN ./mvnw dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Use a Java 23 runtime image to run the application
#FROM eclipse-temurin:23-jre
FROM eclipse-temurin:21-jre

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8085
EXPOSE 8085

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]