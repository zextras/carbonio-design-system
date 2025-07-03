/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
@Library('zextras-library@0.7.3') _

def getPackageName() {
    return sh(script: 'grep \'"name":\' package.json | sed -n --regexp-extended \'s/.*"name": "([^"]+).*/\\1/p\' ', returnStdout: true).trim()
}

def getRepositoryName() {
    return sh(script: '''
        git remote -v | head -n1 | cut -d$'\t' -f2 | cut -d' ' -f1 | sed -e 's!https://github.com/!!g' -e 's!git@github.com:!!g' -e 's!.git!!g'
    ''', returnStdout: true).trim()
}

def getLastTag() {
    return sh(script: '''
        git describe --tags --abbrev=0
    ''', returnStdout: true).trim()
}

def executeNpmLogin() {
    withCredentials([usernamePassword(credentialsId: 'npm-zextras-bot-auth-token', usernameVariable: 'AUTH_USERNAME', passwordVariable: 'AUTH_PASSWORD')]) {
        sh(
            script: """
                touch .npmrc;
                echo "//registry.npmjs.org/:_authToken=${AUTH_PASSWORD}" > .npmrc
            """,
            returnStdout: true
        ).trim()
    }
}

def getNodeVersion() {
    return sh(
        script: 'sed "s/^[vV]//" .nvmrc | cut -d. -f1',
        returnStdout: true
    ).trim()
}

Boolean isReleaseBranch
Boolean isDevelBranch
Boolean isPullRequest
Boolean isSonarQubeEnabled
Boolean isDeployDocPlaygroundEnabled
Boolean isUpdateImages
String branchName
String nodeVersion

pipeline {
    agent {
        node {
            label 'nodejs-v1'
        }
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '50'))
    }
    parameters {
        booleanParam defaultValue: true, description: 'Enable SonarQube Stage', name: 'RUN_SONARQUBE'
        booleanParam defaultValue: false, description: 'Deploy to dev doc playground', name: 'DEPLOY_DOC_PLAYGROUND'
        booleanParam defaultValue: false, description: 'Update Images for Visual Tests', name: 'UPDATE_IMAGES_TESTS'
    }
    stages {
        stage("Read settings") {
            steps {
                container('base') {
                    script {
                        isReleaseBranch = "${BRANCH_NAME}" ==~ /release/
                        echo "isReleaseBranch: ${isReleaseBranch}"
                        isDevelBranch = "${BRANCH_NAME}" ==~ /devel/
                        echo "isDevelBranch: ${isDevelBranch}"
                        isPullRequest = "${BRANCH_NAME}" ==~ /PR-\d+/
                        echo "isPullRequest: ${isPullRequest}"
                        isSonarQubeEnabled = params.RUN_SONARQUBE == true && (isPullRequest || isDevelBranch || isReleaseBranch)
                        echo "isSonarQubeEnabled: ${isSonarQubeEnabled}"
                        isDeployDocPlaygroundEnabled = params.DEPLOY_DOC_PLAYGROUND == true
                        echo "isDeployDocPlaygroundEnabled: ${isDeployDocPlaygroundEnabled}"
                        isUpdateImages = params.UPDATE_IMAGES_TESTS == true
                        echo "isUpdateImages: ${isUpdateImages}"
                        branchName = env.CHANGE_BRANCH
                        echo "branchName: ${branchName}"
                        nodeVersion = getNodeVersion()
                        echo "NodeJS Major Version: $nodeVersion"
                    }
                }
            }
        }
        stage('Install dependencies') {
            steps {
                container('nodejs-' + nodeVersion) {
                    script {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Update Visual Test Images') {
            when {
                allOf {
                    expression { isUpdateImages == true }
                }
            }
            steps {
                container('playwright') {
                    executeNpmLogin()
                    sh 'npm run test-storybook:update-images'
                    sh(script: """
                        git config --add remote.origin.fetch +refs/heads/${branchName}:refs/remotes/origin/${branchName}
                        git fetch
                        git checkout ${branchName}
                        git add -A .storybook-images
                        git commit -m "test: update images"
                        git lfs push origin ${branchName}
                        git push
                    """)
                }
            }
        }

        stage('Tests') {
            when {
                allOf {
                    expression { isUpdateImages == false }
                    anyOf {
                        expression { isSonarQubeEnabled == true }
                        expression { isPullRequest == true }
                        expression { isDevelBranch == true }
                    }
                }
            }
            parallel {
                stage('Linting') {
                    steps {
                        container('nodejs-' + nodeVersion) {
                            executeNpmLogin()
                            sh 'npm run lint'
                        }
                    }
                }
                stage('TypeCheck') {
                    steps {
                        container('nodejs-' + nodeVersion) {
                            executeNpmLogin()
                            sh 'npm run type-check'
                        }
                    }
                }
                stage('Unit Tests') {
                    steps {
                        container('nodejs-' + nodeVersion) {
                            executeNpmLogin()
                            sh 'npm run test'
                        }
                    }
                    post {
                        always {
                            junit 'junit.xml'
                            recordCoverage(tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']])
                        }
                    }
                }
                stage('Visual Test') {
                    steps {
                        container('playwright') {
                            executeNpmLogin()
                            sh 'npm run test-storybook'
                        }
                    }
                    post {
                        failure {
                            archiveArtifacts artifacts: '.storybook-images/__diff_output__/*'
                        }
                    }
                }
            }
        }

        stage('SonarQube analysis') {
            when {
                allOf {
                    expression { isSonarQubeEnabled == true }
                    expression { isUpdateImages == false }
                }
            }
            steps {
                container('nodejs-' + nodeVersion) {
                    script {
                        sh 'npm i -D sonarqube-scanner'
                    }
                    withSonarQubeEnv(credentialsId: 'sonarqube-user-token', installationName: 'SonarQube instance') {
                        sh "npx sonar-scanner -Dsonar.projectKey=${getPackageName().replaceAll("@zextras/", "")} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build package') {
                    when {
                        allOf {
                            expression { isUpdateImages == false }
                        }
                    }
                    steps {
                        container('nodejs-' + nodeVersion) {
                            script {
                                executeNpmLogin()
                                sh 'npm run build'
                            }
                        }
                    }
                }
                stage('Build documentation') {
                    when {
                        allOf {
                            expression { isUpdateImages == false }
                            anyOf {
                                expression { isPullRequest == true }
                                expression { isReleaseBranch == true }
                                expression { isDevelBranch == true }
                                expression { isDeployDocPlaygroundEnabled == true }
                            }
                        }
                    }
                    steps {
                        container('nodejs-' + nodeVersion) {
                            script {
                                executeNpmLogin()
                                sh 'npm run build:docs'
                            }
                        }
                    }
                }
            }
        }

        stage('Release') {
            when {
                allOf {
                    expression { isPullRequest == false }
                    expression { isUpdateImages == false }
                }
            }
            steps {
                container('nodejs-' + nodeVersion) {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'npm-zextras-bot-auth-token', usernameVariable: 'AUTH_USERNAME', passwordVariable: 'NPM_TOKEN')]) {
                            withCredentials([usernamePassword(credentialsId: 'tarsier-bot-pr-token-github', usernameVariable: 'GH_USERNAME', passwordVariable: 'GH_TOKEN')]) {
                                sh 'npx semantic-release'
                            }
                        }
                    }
                }
            }
        }

        stage('Open release to devel pull request') {
            when {
                allOf {
                    expression { isReleaseBranch == true }
                    expression { isUpdateImages == false }
                }
            }
            steps {
                script {
                    container('nodejs-' + nodeVersion) {
                        sh 'apt update && apt install -y openssh-client'
                        String versionBumperBranchName = "version-bumper/${getLastTag()}"
                        sh(script: """
                            git push origin HEAD:refs/heads/${versionBumperBranchName}
                        """)
                        withCredentials([usernamePassword(credentialsId: 'tarsier-bot-pr-token-github', usernameVariable: 'GH_USERNAME', passwordVariable: 'GH_TOKEN')]) {
                            sh(script: """
                                curl https://api.github.com/repos/${getRepositoryName()}/pulls \
                                -X POST \
                                -H 'Accept: application/vnd.github.v3+json' \
                                -H 'Authorization: token ${GH_TOKEN}' \
                                -d '{
                                    \"title\": \"chore(release): ${getLastTag()}\",
                                    \"head\": \"${versionBumperBranchName}\",
                                    \"base\": \"devel\",
                                    \"maintainer_can_modify\": true
                                }'
                            """)
                        }
                    }
                }
            }
        }

        stage('Deploy documentation') {
            when {
                allOf {
                    expression { isUpdateImages == false }
                    anyOf {
                        expression { isReleaseBranch == true }
                        expression { isDevelBranch == true }
                        expression { isDeployDocPlaygroundEnabled == true }
                    }
                }
            }
            steps {
                script {
                    container('nodejs-' + nodeVersion) {
                        sh 'apt update && apt install -y openssh-client'
                        def outDir = isDeployDocPlaygroundEnabled == true ? "playground" : BRANCH_NAME
                        doc.rm file: "iris/zapp-ui/${outDir}/storybook-static"
                        doc.upload file: 'storybook-static', destination: "iris/zapp-ui/${outDir}"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                GIT_COMMIT_EMAIL = sh(
                    script: 'git --no-pager show -s --format=\'%ae\'',
                    returnStdout: true
                ).trim()
            }
            emailext attachLog: true, body: '$DEFAULT_CONTENT', recipientProviders: [requestor()], subject: '$DEFAULT_SUBJECT', to: "${GIT_COMMIT_EMAIL}"
        }
    }
}
