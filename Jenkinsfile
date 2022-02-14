def PROJECT_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
def envFileName = UUID.randomUUID().toString()

pipeline {
    agent any
    environment {
        HOME = '.'
        CYPRESS_CACHE_FOLDER = '/tmp/cy'
    }
    stages {
        stage('Install and bootstrap') {
            agent {
                docker {
                    image 'node:16.13.0'
                    reuseNode true
                }
            }
            steps {
                sh 'yarn'
                sh 'yarn bootstrap'
            }
        }
        stage('Lint') {
            agent {
                docker {
                    image 'node:16.13.0'
                    reuseNode true
                }
            }
            steps {
                sh 'yarn lint'
            }
        }
        stage("Packages") {
            parallel {
                stage("Frontend") {
                    agent {
                        docker {
                            image 'node:16.13.0'
                            reuseNode true
                        }
                    }
                    stages {
                        stage('Frontend - Style lint') {
                            steps {
                                dir("packages/frontend") {
                                    sh 'yarn lint:style'
                                }
                            }
                        }
                        stage('Frontend - Test') {
                            steps {
                                dir("packages/frontend") {
                                    sh 'yarn test'
                                }
                            }
                        }
                        stage('Frontend - Build') {
                            steps {
                                dir("packages/frontend") {
                                    sh 'cp .env.example .env'
                                    sh 'yarn build'
                                }
                            }
                        }
                    }
                }
                stage("Backend") {
                    agent {
                        docker {
                            image 'node:16.13.0'
                            reuseNode true
                        }
                    }
                    stages {
                        stage('Backend - Test') {
                            steps {
                                dir("packages/backend") {
                                    sh 'yarn test'
                                }
                            }
                        }
                        stage('Backend - Build') {
                            steps {
                                dir("packages/backend") {
                                    sh 'yarn build'
                                }
                            }
                        }
                    }
                }
            }
        }
        stage("Test e2e") {
            steps {
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-e2e-env", variable: 'ENV_FILE')]) {
                    sh "cp ${ENV_FILE} .env"
                }
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-e2e-backend-env", variable: 'ENV_FILE')]) {
                    sh "cp ${ENV_FILE} ./packages/backend/.env"
                }
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-e2e-frontend-env", variable: 'ENV_FILE')]) {
                    sh "cp ${ENV_FILE} ./packages/frontend/.env"
                }
                sh 'docker-compose -f ./docker/config/docker-compose-e2e.yml --env-file .env up -d'
                script {
                    docker.build("cypress-e2e", "-f ./docker/config/e2e.Dockerfile .")
                }
                sh 'ls -la . || true'
                sh 'ls -la ./packages/frontend || true'
                sh 'ls -la ./packages/frontend/build || true'
                sh 'docker run -v ${PWD}/test/:/test -e CYPRESS_BASE_URL=http://http --network=e2e-network cypress-e2e cypress run'
            }
        }
    }
    post {
        always {
            // sh 'docker-compose -f ./docker/config/docker-compose-e2e.yml down || true'
            sh 'docker logout'
            cleanWs()
        }
    }
}
