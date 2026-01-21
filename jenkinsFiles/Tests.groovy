properties([
    parameters([
        [$class: 'ChoiceParameter',
            choiceType: 'PT_CHECKBOX', description: 'Seleccion Test List',
            name: 'TestScope', script: [$class: 'GroovyScript',
                fallbackScript: [classpath: [], sandbox: false, script: 'return ["all"]' ],
                script: [classpath: [], sandbox: false,
                    script: '''
                        return [
                            "all", "unit", "integration", "e2e"
                        ]
                    '''
                ]
            ]
        ],
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