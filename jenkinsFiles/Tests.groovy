properties([
    parameters([
        choice(
            name: 'TestScope',
            choices: ['all', 'unit', 'integration', 'e2e'],
            description: 'Seleccion Test List'
        ),
        // Boleano para elegir si se quiere subir a Kibana.
        booleanParam(name: 'Kibana', defaultValue: false, description: '¿Quieres subir los resultados a Kibana?'),
    ])
])
pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    environment {
        SONAR_TOKEN = credentials('SonarQubeAccessToken')
    }
    stages {
        stage('Setup Env') {
            steps {
                // Copiamos el .env secreto al workspace
                withCredentials([file(credentialsId: 'TaskManagerEnviromentCredentials', variable: 'DOTENV')]) {
                    sh 'cp $DOTENV .env'
                }
            }
        }
        stage('Install dependencies') {
            steps {
                /* Aceleramos los builds utilizando cache al tener package-lock.json */
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def scopes = params.TestScope?.split(',') ?: []
                    if (scopes.contains('unit')) {
                        sh 'npm test -- --testPathPattern=unit'
                    }
                    if (scopes.contains('integration')) {
                        sh 'npm test -- --testPathPattern=integration'
                    }
                    if (scopes.contains('e2e')) {
                        sh 'npm test -- --testPathPattern=e2e'
                    }
                    if (scopes.contains('all') || scopes.isEmpty()) {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                sh '''
                    npx sonar-scanner \
                    -Dsonar.projectKey=JuanGilabert_UTAD-TFG \
                    -Dsonar.organization=juangilabert2002 \
                    -Dsonar.sources=. \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.host.url=https://sonarcloud.io \
                    -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }
    }
}