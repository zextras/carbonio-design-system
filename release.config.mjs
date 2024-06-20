/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ["release", "devel", {name: 'next/+([0-9]).+([0-9]).+([0-9])', prerelease: true}]
};