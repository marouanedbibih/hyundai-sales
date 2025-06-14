pipeline {
    agent any

    tools {
        maven 'maven-3.8.7'
        jdk 'jdk-21.0.7'
        nodejs 'nodejs-20.18.3'
    }

    environment {
        BACKEND_FOLDER = 'backend'
        FRONTEND_FOLDER = 'frontend'
        SCANNER_HOME = tool 'sonar-scanner-6.2.1'
    }

    stages {
        stage('Code Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/marouanedbibih/hyundai-sales'
            }
        }

        stage('Build Applications') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir("${BACKEND_FOLDER}") {
                            sh 'mvn clean package'
                        }
                    }
                }

                stage('Build Frontend') {
                    steps {
                        dir("${FRONTEND_FOLDER}") {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Run Unit Tests') {
            parallel {
                stage('Test Backend') {
                    steps {
                        dir("${BACKEND_FOLDER}") {
                            sh """
                                mvn test
                                mvn clean verify jacoco:report
                                
                            """
                        }
                    }
                }

                stage('Test Frontend') {
                    steps {
                        dir("${FRONTEND_FOLDER}") {
                            sh """
                                npm run test -- --coverage --testResultsProcessor=jest-sonar-reporter
                            """
                        }
                    }
                }
            }
        }
    
        stage('SonarQube Analysis') {
            parallel {
            stage('Sonar Backend') {
            steps {
                dir("${BACKEND_FOLDER}") {
                    withSonarQubeEnv('sonarqube-server') {
                        sh """
                            ${SCANNER_HOME}/bin/sonar-scanner
                        """
                    }
                }
            }
            }

            stage('Sonar Frontend') {
                steps {
                dir("${FRONTEND_FOLDER}") {
                    withSonarQubeEnv('sonarqube-server') {
                        sh """
                            ${SCANNER_HOME}/bin/sonar-scanner 
                        """
                    }
                }
                }
            }
            }
}

    }
}
