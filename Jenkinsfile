/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
@Library('zextras-library@0.7.3') _

def nodeCmd(String cmd) {
    sh '. load_nvm && nvm install && nvm use && npm ci && ' + cmd
}

def getPackageName() {
    return sh(script: 'grep \'"name":\' package.json | sed -n --regexp-extended \'s/.*"name": "([^"]+).*/\\1/p\' ', returnStdout: true).trim()
}

def getRepositoryName() {
    return sh(script: '''#!/bin/bash
        git remote -v | head -n1 | cut -d$'\t' -f2 | cut -d' ' -f1 | sed -e 's!https://github.com/!!g' -e 's!git@github.com:!!g' -e 's!.git!!g'
    ''', returnStdout: true).trim()
}

def getLastTag() {
    return sh(script: '''#!/bin/bash
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

def getCommitVersion() {
    return sh(script: 'git log -1 | grep \'version:\' | sed -n \'s/.*version:\\s*//p\' ', returnStdout: true).trim()
}

Boolean lcovIsPresent
Boolean isReleaseBranch
Boolean isDevelBranch
Boolean isPullRequest
Boolean isSonarQubeEnabled
Boolean isDeployDocPlaygroundEnabled

pipeline {
    agent {
        node {
            label 'nodejs-agent-v4'
        }
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '50'))
    }
    parameters {
        booleanParam defaultValue: true, description: 'Enable SonarQube Stage', name: 'RUN_SONARQUBE'
        booleanParam defaultValue: false, description: 'Deploy to dev doc playground', name: 'DEPLOY_DOC_PLAYGROUND'
    }
    stages {
        stage("Read settings") {
            steps {
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
                }
            }
        }

        stage('Tests') {
            when {
                beforeAgent true
                anyOf {
                    expression { isSonarQubeEnabled == true }
                    expression { isPullRequest == true }
                    expression { isDevelBranch == true }
                }
            }
            parallel {
                stage('Linting') {
                    agent {
                        node {
                            label 'nodejs-agent-v4'
                        }
                    }
                    steps {
                        executeNpmLogin()
                        nodeCmd('npm run lint')
                    }
                }
                stage('TypeCheck') {
                    agent {
                        node {
                            label "nodejs-agent-v4"
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd('npm run type-check')
                        }
                    }
                }
                stage('Unit Tests') {
                    agent {
                        node {
                            label 'nodejs-agent-v4'
                        }
                    }
                    steps {
                        executeNpmLogin()
                        nodeCmd('npm run test')
                        script {
                            if (fileExists('coverage/lcov.info')) {
                                lcovIsPresent = true
                                stash(
                                    includes: 'coverage/lcov.info',
                                    name: 'lcov.info'
                                )
                            }
                        }
                    }
                    post {
                        always {
                            junit 'junit.xml'
                            recordCoverage(tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']])
                        }
                    }
                }
            }
        }

        stage('SonarQube analysis') {
            agent {
                node {
                    label 'nodejs-agent-v4'
                }
            }
            when {
                beforeAgent(true)
                allOf {
                    expression { isSonarQubeEnabled == true }
                }
            }
            steps {
                script {
                    if (lcovIsPresent) {
                        unstash(name: 'lcov.info')
                    }
                    nodeCmd('npm i -D sonarqube-scanner')
                }
                withSonarQubeEnv(credentialsId: 'sonarqube-user-token', installationName: 'SonarQube instance') {
                    nodeCmd("npx sonar-scanner -Dsonar.projectKey=${getPackageName().replaceAll("@zextras/", "")} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info")
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build package') {
                    agent {
                        node {
                            label 'nodejs-agent-v4'
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd('npm run build')
                        }
                    }
                }
                stage('Build documentation') {
                    when {
                        beforeAgent true
                        anyOf {
                            expression { isPullRequest == true }
                            expression { isReleaseBranch == true }
                            expression { isDevelBranch == true }
                            expression { isDeployDocPlaygroundEnabled == true }
                        }
                    }
                    agent {
                        node {
                            label 'nodejs-agent-v4'
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd('npm run build:docs')
                            stash includes: 'storybook-static/', name: 'storybook-doc'
                        }
                    }
                }
            }
        }

        stage('Release') {
            when {
                beforeAgent true
                allOf {
                    expression { isPullRequest == false }
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'npm-zextras-bot-auth-token', usernameVariable: 'AUTH_USERNAME', passwordVariable: 'NPM_TOKEN')]) {
                        withCredentials([usernamePassword(credentialsId: 'tarsier-bot-pr-token-github', usernameVariable: 'GH_USERNAME', passwordVariable: 'GH_TOKEN')]) {
                            nodeCmd("npx semantic-release")
                        }
                    }
                }
            }
        }

        stage('Open release to devel pull request') {
            when {
                beforeAgent true
                allOf {
                    expression { isReleaseBranch == true }
                }
            }
            steps {
                script {
                    String versionBumperBranchName = "version-bumper/${getLastTag()}"
                    sh(script: """#!/bin/bash
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

        stage('Deploy documentation') {
            when {
                beforeAgent true
                anyOf {
                    expression { isReleaseBranch == true }
                    expression { isDevelBranch == true }
                    expression { isDeployDocPlaygroundEnabled == true }
                }
            }
            steps {
                script {
                    unstash 'storybook-doc'
                    def outDir = isDeployDocPlaygroundEnabled == true ? "playground" : BRANCH_NAME
                    doc.rm file: "iris/zapp-ui/${outDir}/storybook-static"
                    doc.upload file: 'storybook-static', destination: "iris/zapp-ui/${outDir}"
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
