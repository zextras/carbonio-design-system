/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
@Library("zextras-library@0.5.0") _

def nodeCmd(String cmd) {
	sh '. load_nvm && nvm install && nvm use && npm ci && ' + cmd
}

def getCommitParentsCount() {
    return sh(script: '''
    COMMIT_ID=$(git log -1 --oneline | sed 's/ .*//')
    (git cat-file -p $COMMIT_ID | grep -w "parent" | wc -l)
  ''', returnStdout: true).trim()
}

def getCurrentVersion() {
    return sh(script: 'grep \'"version":\' package.json | sed -n --regexp-extended \'s/.*"version": "([^"]+).*/\\1/p\' ', returnStdout: true).trim()
}

def getVersioningParams(branchName) {
    if (branchName ==~ /(beta)/) {
        return '--no-verify --prerelease beta'
    }
    return '--no-verify'
}

def getRepositoryName() {
    return sh(script: '''#!/bin/bash
      git remote -v | head -n1 | cut -d$'\t' -f2 | cut -d' ' -f1 | sed -e 's!https://bitbucket.org/!!g' -e 's!git@bitbucket.org:!!g' -e 's!.git!!g'
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

pipeline {
    agent {
        node {
            label 'nodejs-agent-v2'
        }
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '50'))
    }
    environment {
        BUCKET_NAME = "zextras-artifacts"
        PUPPETEER_DOWNLOAD_HOST = "https://chromirror.zextras.com"
        LOCAL_REGISTRY = "https://npm.zextras.com"
        COMMIT_PARENTS_COUNT = getCommitParentsCount()
        REPOSITORY_NAME = getRepositoryName()
    }
    stages {

        //============================================ Release Automation ======================================================

        stage('Bump Version') {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME ==~ /(release|beta)/ }
                    environment name: 'COMMIT_PARENTS_COUNT', value: '2'
                }
            }
            agent {
                node {
                    label 'nodejs-agent-v2'
                }
            }
            steps {
                script {
                    sh(script: """#!/bin/bash
                        git config user.email \"bot@zextras.com\"
                        git config user.name \"Tarsier Bot\"
                        git remote set-url origin \$(git remote -v | head -n1 | cut -d\$'\t' -f2 | cut -d\" \" -f1 | sed 's!https://bitbucket.org/zextras!git@bitbucket.org:zextras!g')
                        git fetch --unshallow
                    """)
                }
                executeNpmLogin()
                nodeCmd 'npm ci'
                nodeCmd 'npx pinst --enable'
                script {
                    env.VERSIONING_PARAMS = getVersioningParams("$BRANCH_NAME")
                }
                nodeCmd "npm run release -- $VERSIONING_PARAMS"
                script {
                    sh(script: """#!/bin/bash
                      git push --follow-tags origin HEAD:$BRANCH_NAME
                      git push origin HEAD:refs/heads/version-bumper/v${getCurrentVersion()}
                    """)
                    withCredentials([usernameColonPassword(credentialsId: 'tarsier-bot-pr-token', variable: 'PR_ACCESS')]) {
                        def defaultReviewers = sh(script: """
                            curl https://api.bitbucket.org/2.0/repositories/$REPOSITORY_NAME/default-reviewers \
                            -u '$PR_ACCESS' \
                            --request GET \
                            | \
                            jq '.values | map_values({ uuid: .uuid })'
                        """, returnStdout: true).trim()
                        sh(script: """
                            curl https://api.bitbucket.org/2.0/repositories/$REPOSITORY_NAME/pullrequests \
                            -u '$PR_ACCESS' \
                            --request POST \
                            --header 'Content-Type: application/json' \
                            --data '{
                                    \"title\": \"Bumped version ${getCurrentVersion()}\",
                                    \"source\": {
                                        \"branch\": {
                                            \"name\": \"version-bumper/v${getCurrentVersion()}\"
                                        }
                                    },
                                    \"destination\": {
                                        \"branch\": {
                                            \"name\": \"devel\"
                                        }
                                    },
                                    \"reviewers\": $defaultReviewers,
                                    \"close_source_branch\": true
                                }'
                            """)
                    }
                }
            }
        }

        stage('Tests') {
            when {
                beforeAgent true
                allOf{
                    expression { BRANCH_NAME ==~ /PR-\d+/ }
                }
            }
            parallel {
                stage('Linting') {
                    agent {
                        node {
                            label 'nodejs-agent-v2'
                        }
                    }
                    steps {
                        executeNpmLogin()
                        nodeCmd("npm run lint")
                    }
                }
                stage('Unit Tests') {
                    agent {
                        node {
                            label 'nodejs-agent-v2'
                        }
                    }
                    steps {
                        executeNpmLogin()
                        nodeCmd("npm run test")
                    }
                    post {
                        always {
                            junit 'junit.xml'
                            publishCoverage adapters: [istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')], calculateDiffForChangeRequests: true, failNoReports: false
                        }
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
                                expression { BRANCH_NAME ==~ /(release|beta)/ }
                                environment name: 'COMMIT_PARENTS_COUNT', value: '2'
                            }
                        }
                    }
                    agent {
                        node {
                            label 'nodejs-agent-v2'
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd("npm run build")
                            // archiveArtifacts artifacts: 'dist/zapp-ui.js', fingerprint: true
                        }
                    }
                }
                stage('Build documentation') {
                    when {
                        beforeAgent true
                        anyOf {
                            allOf {
                                expression { BRANCH_NAME ==~ /(release|beta)/ }
                                environment name: 'COMMIT_PARENTS_COUNT', value: '1'
                            }
                            expression { BRANCH_NAME ==~ /(devel)/ }
                        }
                    }
                    agent {
                        node {
                            label 'nodejs-agent-v2'
                        }
                    }
                    steps {
                        script {
                            executeNpmLogin()
														// TODO: [IRIS-2131] remove the '|| true' bypass once the issue is solvable or the components are all converted to typescript
                            nodeCmd("npm run styleguide:build || true")
                            stash includes: 'styleguide/', name: 'doc'
                        }
                    }
                }
            }
        }

        //============================================ Deploy ==================================================================

        stage('Release') {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME ==~ /(release)/ }
                    environment name: 'COMMIT_PARENTS_COUNT', value: '1'
                }
            }
            parallel {
                stage('Publish on NPM') {
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd("NODE_ENV=\"production\" npm publish")
                        }
                    }
                }
            }
        }

        stage('Release Beta') {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME ==~ /(beta)/ }
                    environment name: 'COMMIT_PARENTS_COUNT', value: '1'
                }
            }
            parallel {
                stage('Publish on NPM') {
                    steps {
                        script {
                            executeNpmLogin()
                            nodeCmd("NODE_ENV=\"production\" npm publish --tag beta")
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
                        expression { BRANCH_NAME ==~ /(release|beta)/ }
                        environment name: 'COMMIT_PARENTS_COUNT', value: '1'
                    }
                    expression { BRANCH_NAME ==~ /(devel)/ }
                }
            }
            steps {
                script {
                    unstash 'doc'
                    doc.rm file: "iris/zapp-ui/${BRANCH_NAME}"
                    doc.mkdir folder: "iris/zapp-ui/${BRANCH_NAME}"
                    doc.upload file: "styleguide/**", destination: "iris/zapp-ui/${BRANCH_NAME}"
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