def PROJECT_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
def envFileName = UUID.randomUUID().toString()
def envFileDestination = "/tmp/${envFileName}"

pipeline {
    agent any
    environment {
        HOME = '.'
    }
    stages {
        stage('Install and bootstrap') {
            agent { docker { image 'node:16.13.0' } }
            steps {
                sh 'yarn'
                sh 'yarn bootstrap'
            }
        }
        /*stage('Lint') {
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
        stage("Test end-to-end") {
            steps {
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-e2e-env", variable: 'E2E_ENV_FILE')]) {
                    sh "cp ${E2E_ENV_FILE} .env"
                }
                configFileProvider([configFile(fileId: "${PROJECT_NAME}-backend-env", variable: 'BACKEND_ENV_FILE')]) {
                    sh "cp ${BACKEND_ENV_FILE} ./packages/backend/.env"
                }
                sh 'docker-compose -f ./docker/config/docker-compose-e2e-ci.yml --env-file .env up backend http db -d'
                sh 'docker-compose -f ./docker/config/docker-compose-e2e-ci.yml --env-file .env run e2e run'
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f ./docker/config/docker-compose-e2e-ci.yml down'
            sh 'docker logout'
            cleanWs()
        }
    }
}
