/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: [
        "release",
        {
            name: 'devel',
            prerelease: true
        },
        {
            name: 'next/+([0-9]).+([0-9]).+([0-9])',
            prerelease: '${name.replace(/[\\/\\.]/g, "-")}'
        }
    ],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "conventionalcommits"
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits"
            }
        ],
        '@semantic-release/npm',
        '@semantic-release/github'
    ]
};