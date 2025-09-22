pipeline {
    agent any
    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        IMAGE_BACKEND = 'music_backend'
        IMAGE_FRONTEND = 'music_frontend'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YASHWANTMNV/Music-streaming-application.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    echo "Building backend..."
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    echo "Building frontend..."
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker images..."
                sh """
                    docker build -t ${IMAGE_BACKEND} ./backend
                    docker build -t ${IMAGE_FRONTEND} ./frontend
                """
            }
        }

        stage('Docker Run') {
            steps {
                echo "Running Docker containers..."
                sh """
                    docker stop ${IMAGE_BACKEND} || true
                    docker rm ${IMAGE_BACKEND} || true
                    docker stop ${IMAGE_FRONTEND} || true
                    docker rm ${IMAGE_FRONTEND} || true

                    docker run -d -p 8080:8080 --name ${IMAGE_BACKEND} ${IMAGE_BACKEND}
                    docker run -d -p 3000:3000 --name ${IMAGE_FRONTEND} ${IMAGE_FRONTEND}
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
