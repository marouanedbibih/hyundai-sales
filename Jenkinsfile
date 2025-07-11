pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: helm
spec:
  containers:
    - name: jnlp
      image: jenkins/inbound-agent:latest
      args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
    - name: docker
      image: docker:24.0.2-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
      ports:
        - containerPort: 2375
          name: docker
      volumeMounts:
        - name: docker-graph-storage
          mountPath: /var/lib/docker
    - name: helm
      image: alpine/helm:3.14.0
      command: ["/bin/sh", "-c", "cat"]
      tty: true
  volumes:
    - name: docker-graph-storage
      emptyDir: {}
"""
      defaultContainer 'jnlp'
    }
  }

  tools {
    maven 'maven-3.8.7'
    jdk 'jdk-21.0.7'
    nodejs 'nodejs-20.18.3'
  }

  environment {
    BACKEND_FOLDER = 'backend'
    FRONTEND_FOLDER = 'frontend'
    SCANNER_HOME = tool 'sonar-scanner-6.2.1'

    BACKEND_TAG = 'v2.0.1'
    FRONTEND_TAG = 'prod-v2.0.0'

    NEXT_PUBLIC_API_URL = 'https://api.hyundai-sales.marouanedbibih.studio'
    DOCKER_REGISTRY = 'docker.io/marouanedbibih'
    K8S_API_URL = 'https://49.12.200.243:6443'
  }

  stages {

    stage('Code Checkout') {
      steps {
        git branch: 'main', credentialsId: 'github', url: 'https://github.com/marouanedbibih/hyundai-sales'
      }
    }

    stage('Build Applications') {
      parallel {
        stage('Build Backend') {
          steps {
            dir("${BACKEND_FOLDER}") {
              sh 'mvn clean package'
            }
          }
        }
        stage('Build Frontend') {
          steps {
            dir("${FRONTEND_FOLDER}") {
              sh 'npm install'
            }
          }
        }
      }
    }

    stage('Run Unit Tests') {
      parallel {
        stage('Test Backend') {
          steps {
            dir("${BACKEND_FOLDER}") {
              sh '''
                mvn test
                mvn clean verify jacoco:report
              '''
            }
          }
        }
        stage('Test Frontend') {
          steps {
            dir("${FRONTEND_FOLDER}") {
              sh 'npm run test -- --coverage --testResultsProcessor=jest-sonar-reporter'
            }
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      parallel {
        stage('Sonar Backend') {
          steps {
            dir("${BACKEND_FOLDER}") {
              withSonarQubeEnv('sonarqube-server') {
                sh "${SCANNER_HOME}/bin/sonar-scanner"
              }
            }
          }
        }
        stage('Sonar Frontend') {
          steps {
            dir("${FRONTEND_FOLDER}") {
              withSonarQubeEnv('sonarqube-server') {
                sh "${SCANNER_HOME}/bin/sonar-scanner"
              }
            }
          }
        }
      }
    }

    stage('Docker Build & Push') {
      parallel {
        stage('Docker Backend') {
          steps {
            container('docker') {
              withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                sh '''
                  export DOCKER_HOST=tcp://localhost:2375
                  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                  docker buildx create --use --driver=docker-container || true
                  docker buildx build \
                    --platform linux/amd64,linux/arm64 \
                    -t $DOCKER_REGISTRY/hyundai-sales-backend:$BACKEND_TAG \
                    -f docker/Dockerfile.backend \
                    --push .
                '''
              }
            }
          }
        }

        stage('Docker Frontend') {
          steps {
            container('docker') {
              withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                sh '''
                  export DOCKER_HOST=tcp://localhost:2375
                  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                  docker buildx create --use --driver=docker-container || true
                  docker buildx build \
                    --platform linux/amd64,linux/arm64 \
                    --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
                    -t $DOCKER_REGISTRY/hyundai-sales-frontend:$FRONTEND_TAG \
                    -f docker/Dockerfile.frontend \
                    --push .
                '''
              }
            }
          }
        }
      }
    }

    stage('Helm Deploy') {
      steps {
        container('helm') {
          withCredentials([string(credentialsId: 'k8s-token', variable: 'K8S_TOKEN')]) {
            sh '''
              echo "[INFO] Installing kubectl..."
              apk add --no-cache curl bash coreutils kubectl

              echo "[INFO] Preparing kubeconfig..."
              export KUBECONFIG=$(mktemp)

              kubectl config set-cluster k8s \
                --server=$K8S_API_URL \
                --insecure-skip-tls-verify=true

              kubectl config set-credentials jenkins \
                --token=$K8S_TOKEN

              kubectl config set-context jenkins-context \
                --cluster=k8s \
                --user=jenkins \
                --namespace=hyundai-sales

              kubectl config use-context jenkins-context

              echo "[INFO] Deploying with Helm..."
              helm upgrade --install hyundai-sales helm/ -n hyundai-sales
            '''
          }
        }
      }
    }

  }
}
