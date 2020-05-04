/* eslint-disable no-console */
const { GRAPHQL_PORT } = require('../../constants');

module.exports = () => {
  console.log('***************************************************************************************************************');
  console.log(` PORT: ${GRAPHQL_PORT}`);
  console.log('***************************************************************************************************************');
  console.log('\n');
};
