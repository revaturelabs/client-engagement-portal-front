pipeline {
  agent none
  environment {
    CI = ''
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('build') {
      agent {
        docker { image 'node:lts-alpine3.10'}
      }
      steps {
        sh 'npm i'
        sh 'npm run build'
      }
    }

    stage ('image') {
      agent any
      steps {
        sh 'docker build . -t cep-front-image'
      }
    }

    stage('Clean') {
      agent any
      steps {
        script {
          try {
            sh 'docker stop cep-front'
            sh 'docker rm cep-front'
            sh 'docker system prune -f'
          } catch (all) {
            echo 'No previous containers/images'
          }
        }
      }
    }

    stage('Deploy') {
      agent any
      steps {
        sh 'docker run -d -p 80:80 --name cep-front cep-front-image'
        sh 'docker ps'
      }
    }
   }
}