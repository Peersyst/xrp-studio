def PROJECT_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
def envFileName = UUID.randomUUID().toString()

pipeline {
    agent any
    environment {
        HOME = '.'
        CYPRESS_CACHE_FOLDER = '/tmp/cy'
    }
    stages {
        /*stage('Install and bootstrap') {
            agent { docker { image 'node:16.13.0' } }
            steps {
                sh 'yarn'
                sh 'yarn bootstrap'
            }
        }
        stage('Lint') {
            agent { docker { image 'node:16.13.0' } }
            steps {
                sh 'yarn lint'
            }
        }
        stage("Packages") {
            parallel {
                stage("Frontend") {
                    agent { docker { image 'node:16.13.0' } }
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
                                    sh 'yarn build'
                                }
                            }
                        }
                    }
                }
                stage("Backend") {
                    agent { docker { image 'node:16.13.0' } }
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
        }*/
        stage("Prepare test e2e") {
            steps {
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-e2e-env", variable: 'E2E_ENV_FILE')]) {
                    sh "cp ${E2E_ENV_FILE} .env"
                }
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-backend-env", variable: 'BACKEND_ENV_FILE')]) {
                    sh "cp ${BACKEND_ENV_FILE} ./packages/backend/.env"
                }
                sh 'docker-compose -f ./docker/config/docker-compose-e2e.yml --env-file .env up -d'
                script {
                    docker.build("cypress-e2e", "-f ./docker/config/e2e.Dockerfile .")
                }
                sh 'docker run -v ${PWD}/test/:/test -e CYPRESS_BASE_URL=http://http --network=e2e-network e2e-custom cypress'
            }
        }
        stage("Run test e2e") {
            agent {
                docker {
                    image 'cypress-e2e'
                    args '-e CYPRESS_BASE_URL=http://http --network=e2e-network'
                }
            }
            steps {
                sh 'ls -la'
                sh 'cypress run'
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f ./docker/config/docker-compose-e2e.yml down'
            sh 'docker logout'
            cleanWs()
        }
    }
}
