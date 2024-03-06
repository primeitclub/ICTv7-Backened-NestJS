pipeline {
    agent any

    stages {
        //  stage('Install Node.js and npm') {
        //     steps {
        //         script {
        //             // Install Node.js and npm
        //             sh 'sudo apt-get update && apt-get install -y nodejs npm'

        //             // Symlink nodejs to node (if needed)
        //             sh 'ln -s /usr/bin/nodejs /usr/bin/node'
        //         }
        //     }
        // }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('StartProd') {
            steps {
                sh 'npm run start:prod'
            }
        }


    }
}
