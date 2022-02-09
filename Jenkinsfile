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
            agent {
                docker {
                    image 'node:16.13.0'
                }
            }
            steps {
                sh 'yarn install --frozen-lockfile'
                sh 'yarn bootstrap'
            }
        }
        stage('Lint') {
            agent {
                docker {
                    image 'node:16.13.0'
                }
            }
            steps {
                sh 'yarn lint'
            }
        }
        parallel {
            stages {
                agent {
                    docker {
                        image 'node:16.13.0'
                    }
                }
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
                            sh 'yarn install --frozen-lockfile'
                        }
                    }
                }
            }
            stages {
                agent {
                    docker {
                        image 'node:16.13.0'
                    }
                }
                stage('Backend - Build') {
                    steps {
                        dir("packages/backend") {
                            sh 'yarn build'
                        }
                    }
                }
                stage('Backend - Test') {
                    steps {
                        dir("packages/backend") {
                            sh 'yarn test'
                        }
                    }
                }
            }
        }
    }
}
