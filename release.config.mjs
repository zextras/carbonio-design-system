/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["release", "devel", {name: 'next/+([0-9]).+([0-9]).+([0-9])', prerelease: true}]
};