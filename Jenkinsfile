pipeline {
    agent any

    tools {
        maven 'Maven3'      // configure in Jenkins -> Manage Jenkins -> Global Tool Configuration
        nodejs 'Node16'     // configure NodeJS tool in Jenkins too
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YASHWANTMNV/Music-streaming-application.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    echo 'Building backend...'
                    bat 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    echo 'Building frontend...'
                    bat '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                bat 'docker build -t music-backend ./backend'
                bat 'docker build -t music-frontend ./frontend'
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker containers...'
                bat 'docker run -d -p 8080:8080 --name music-backend music-backend'
                bat 'docker run -d -p 3000:3000 --name music-frontend music-frontend'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
