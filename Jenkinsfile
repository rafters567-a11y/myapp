def notify(String status) {
    try {
        withCredentials([string(credentialsId: 'slack-webhook', variable: 'HOOK')]) {
            sh """
                curl -s -X POST -H 'Content-type: application/json' \
                  --data '{"text":"${status}: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}"}' \
                  "\$HOOK"
            """
        }
    } catch (err) {
        echo "Notification skipped (webhook credential missing or call failed)"
    }
}

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        COMPOSE_PROJECT_NAME = 'myappci'
        WEB_PORT             = '3100'
        POSTGRES_PASSWORD    = 'cipassword123'
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Build images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Smoke test') {
            steps {
                sh '''
                    docker compose up -d
                    for i in $(seq 1 30); do
                      if curl -fs http://localhost:${WEB_PORT}/api/health; then
                        echo
                        echo "Smoke test passed"
                        exit 0
                      fi
                      sleep 2
                    done
                    echo "Smoke test failed"
                    docker compose logs --tail=50
                    exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose down -v --remove-orphans || true'
            sh 'docker image prune -f || true'
        }
        success { script { notify('SUCCESS') } }
        failure { script { notify('FAILED') } }
    }
}
