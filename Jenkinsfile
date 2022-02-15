def PROJECT_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
def envFileName = UUID.randomUUID().toString()
def envFileDestination = "/tmp/${envFileName}"

pipeline {
    agent any
    environment {
        HOME = '.'
        CYPRESS_CACHE_FOLDER = '/tmp/cy'
        DOCKERHUB_REPOSITORY = 'peersyst/global'
        DOCKERHUB_CREDENTIALS = credentials('peersyst-dockerhub')
        DOCKERHUB_TAG_NAME = "${DOCKERHUB_REPOSITORY}:${PROJECT_NAME}-backend-${GIT_BRANCH}-${GIT_COMMIT}"
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
            when {
                anyOf { branch 'dev'; branch 'main'; branch 'feature/*'; }
            }
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
                sh 'docker run -v ${PWD}/test/:/test -e CYPRESS_BASE_URL=http://http --network=e2e-network cypress-e2e cypress run'
            }
        }
        stage("Deploy to dev server") {
            when {
                anyOf { branch 'dev'; branch 'main'; }
            }
            parallel {
                stage("Frontend") {
                    stages {
                        stage("Frontend - Build") {
                            agent {
                                docker {
                                    image 'node:16.13.0'
                                    reuseNode true
                                }
                            }
                            steps {
                                configFileProvider([configFile(fileId: "${PROJECT_NAME}-dev-frontend-env", variable: 'ENV_FILE')]) {
                                    sh "cp ${ENV_FILE} ./packages/frontend/.env"
                                }
                                dir("packages/frontend") {
                                    sh 'yarn build'
                                }
                            }
                        }
                        stage("Frontend - Deploy") {
                            steps {
                                dir("packages/frontend") {
                                    sshagent(credentials : ['jenkins-ssh']) {
                                        sh "scp -rp ./build/* ubuntu@dev.peersyst.com:/home/ubuntu/${PROJECT_NAME}"
                                        sh "ssh ubuntu@dev.peersyst.com sudo rm -rf /var/www/${PROJECT_NAME}/*"
                                        sh "ssh ubuntu@dev.peersyst.com sudo sudo mv /home/ubuntu/${PROJECT_NAME}/* /var/www/${PROJECT_NAME}/"
                                    }
                                }
                            }
                        }
                    }
                }
                stage("Backend") {
                    stages {
                        stage("Backend - Build dev") {
                            steps {
                                dir("packages/backend") {
                                    sh "docker build -t ${DOCKERHUB_TAG_NAME} ."
                                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                                    sh "docker push ${DOCKERHUB_TAG_NAME}"
                                }
                            }
                        }
                        stage("Backend - Deploy") {
                            steps {
                                dir("packages/backend") {
                                    sshagent(credentials : ['jenkins-ssh']) {
                                        configFileProvider(
                                            [configFile(fileId: "${PROJECT_NAME}-dev-backend-env", variable: 'ENV_FILE')]) {
                                            sh "scp ${ENV_FILE} ubuntu@dev.peersyst.com:${envFileDestination}"
                                        }
                                        sh "ssh ubuntu@dev.peersyst.com sudo docker kill ${PROJECT_NAME}-backend || true"
                                        sh "ssh ubuntu@dev.peersyst.com sudo docker rm ${PROJECT_NAME}-backend || true"
                                        sh "ssh ubuntu@dev.peersyst.com sudo docker pull ${DOCKERHUB_TAG_NAME}"
                                        sh "ssh ubuntu@dev.peersyst.com sudo docker run --name=${PROJECT_NAME}-backend --env-file=${envFileDestination} --network=host -d ${DOCKERHUB_TAG_NAME}"
                                        sh "ssh ubuntu@dev.peersyst.com sudo docker run --rm --env-file=${envFileDestination} --network=host ${DOCKERHUB_TAG_NAME} npm run db:seed"
                                        sh "ssh ubuntu@dev.peersyst.com sudo rm ${envFileDestination}"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f ./docker/config/docker-compose-e2e.yml down || true'
            sh 'docker logout'
            cleanWs()
        }
    }
}
