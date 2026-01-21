properties([
    parameters([
        [$class: 'ChoiceParameter',
            choiceType: 'PT_CHECKBOX', description: 'Seleccion Test List',
            filterLength: 1, name: 'TestScope', randomName: 'choice-parameter-test',
            script: [$class: 'GroovyScript',
                fallbackScript: [classpath: [], sandbox: false, script: 'return[\'Could not get Test List\']' ],
                script: [classpath: [], sandbox: false,
                    script: '''
                        return [
                            "all", "unit", "integration", "e2e"
                        ]
                    '''
                ]
            ]
        ],
        // String para elegir el numero de repeticiones.
        string(name: 'Rep0', defaultValue: '1', description: 'Introduce el numero de repeticiones del test'),
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
                    if (params.TestScope == 'unit') {
                        sh 'npm test -- --testPathPattern=unit'
                    } else if (params.TestScope == 'integration') {
                        sh 'npm test -- --testPathPattern=integration'
                    } else if (params.TestScope == 'e2e') {
                        sh 'npm test -- --testPathPattern=e2e'
                    } else {
                        sh 'npm test --'
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