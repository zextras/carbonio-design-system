/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
@Library('zextras-library@0.5.0') _

def nodeCmd(String cmd) {
    sh '. load_nvm && nvm install && nvm use && npm ci && ' + cmd
}

int getCommitParentsCount() {
    return Integer.parseInt(
        sh(
            script: """#!/usr/bin/env bash
                git cat-file -p HEAD | grep -w "parent" | wc -l
            """,
            returnStdout: true
        ).trim()
    )
}

boolean gitIsMergeCommit() {
    return 2 <= getCommitParentsCount()
}

def getPackageName() {
    return sh(script: 'grep \'"name":\' package.json | sed -n --regexp-extended \'s/.*"name": "([^"]+).*/\\1/p\' ', returnStdout: true).trim()
}

def getCurrentVersion() {
    return sh(script: 'grep \'"version":\' package.json | sed -n --regexp-extended \'s/.*"version": "([^"]+).*/\\1/p\' ', returnStdout: true).trim()
}

def getRepositoryName() {
    return sh(script: '''#!/bin/bash
        git remote -v | head -n1 | cut -d$'\t' -f2 | cut -d' ' -f1 | sed -e 's!https://github.com/!!g' -e 's!git@github.com:!!g' -e 's!.git!!g'
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
Boolean isMergeCommit
Boolean isSonarQubeEnabled

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
    }
    environment {
        REPOSITORY_NAME = getRepositoryName()
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
                   isMergeCommit = gitIsMergeCommit()
                   echo "isMergeCommit: ${isMergeCommit}"
                   isSonarQubeEnabled = params.RUN_SONARQUBE == true && (isPullRequest || isDevelBranch || isReleaseBranch)
                   echo "isSonarQubeEnabled: ${isSonarQubeEnabled}"
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

        stage('Bump Version') {
            when {
                beforeAgent true
                allOf {
                    expression { isReleaseBranch == true }
                    expression { isMergeCommit == true }
                }
            }
            agent {
                node {
                    label 'nodejs-agent-v4'
                }
            }
            steps {
                script {
                    sh(script: """#!/bin/bash
                        git config user.email \"bot@zextras.com\"
                        git config user.name \"Tarsier Bot\"
                        git remote set-url origin \$(git remote -v | head -n1 | cut -d\$'\t' -f2 | cut -d\" \" -f1 | sed 's!https://github.com/zextras!git@github.com:zextras!g')
                        git fetch --unshallow
                    """)
                }
                executeNpmLogin()
                script {
                    def commitVersion = getCommitVersion();
                    if (commitVersion) {
                        echo "Force bump to version ${commitVersion}"
                        nodeCmd("npm run release -- --no-verify --release-as ${commitVersion}")
                    } else {
                        nodeCmd 'npm run release -- --no-verify'
                    }
                }
                script {
                    sh(script: """#!/bin/bash
                        git push --follow-tags origin HEAD:$BRANCH_NAME
                        git push origin HEAD:refs/heads/version-bumper/v${getCurrentVersion()}
                    """)
                    withCredentials([usernameColonPassword(credentialsId: 'tarsier-bot-pr-token-github', variable: 'ZXBOT_TOKEN')]) {
                        sh(script: """
                            curl https://api.github.com/repos/$REPOSITORY_NAME/pulls \
                            -X POST \
                            -H 'Accept: application/vnd.github.v3+json' \
                            -H 'Authorization: token ${ZXBOT_TOKEN}' \
                            -d '{
                                    \"title\": \"Bumped version ${getCurrentVersion()}\",
                                    \"head\": \"version-bumper/v${getCurrentVersion()}\",
                                    \"base\": \"devel\",
                                    \"maintainer_can_modify\": true,
                                    \"close_source_branch\": true
                                }'
                            """)
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build package') {
                    when {
                        beforeAgent true
                        not {
                            allOf {
                                expression { isReleaseBranch == true }
                                expression { isMergeCommit == true }
                            }
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
                            nodeCmd('npm run build')
                        }
                    }
                }
                stage('Build documentation') {
                    when {
                        beforeAgent true
                        anyOf {
                            allOf {
                                expression { isReleaseBranch == true }
                                expression { isMergeCommit == false }
                            }
                            expression { isDevelBranch == true }
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
                            stash includes: 'styleguide/', name: 'doc'
                            stash includes: 'storybook-static/', name: 'storybook-doc'
                        }
                    }
                }
            }
        }

        stage('Deploy to NPM') {
            parallel {
                stage('Release') {
                    when {
                        beforeAgent true
                        allOf {
                            expression { isReleaseBranch == true }
                            expression { isMergeCommit == false }
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd("NODE_ENV=\"production\" npm publish")
                        }
                    }
                }
                stage('Devel') {
                    when {
                        beforeAgent true
                        allOf {
                            expression { isDevelBranch == true }
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd("npm run release -- --no-verify --release-as ${getCurrentVersion()}-devel.${currentBuild.startTimeInMillis} --skip.commit --skip.tag --skip.changelog")
                            nodeCmd("NODE_ENV=\"production\" npm publish --tag devel")
                        }
                    }
                }
            }
        }
        stage('Deploy documentation') {
            when {
                beforeAgent true
                anyOf {
                    allOf {
                        expression { isReleaseBranch == true }
                        expression { isMergeCommit == false }
                    }
                    expression { isDevelBranch == true }
                }
            }
            steps {
                script {
                    unstash 'doc'
                    unstash 'storybook-doc'
                    doc.rm file: "iris/zapp-ui/${BRANCH_NAME}"
                    doc.mkdir folder: "iris/zapp-ui/${BRANCH_NAME}"
                    doc.upload file: 'storybook-static', destination: "iris/zapp-ui/${BRANCH_NAME}"
                    doc.upload file: 'styleguide/**', destination: "iris/zapp-ui/${BRANCH_NAME}"
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
