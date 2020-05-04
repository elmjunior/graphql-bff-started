/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('path');
const glob = require('glob');

const paths = glob.sync(path.join(__dirname, '../modules/**/index.js'));

const resolvers = paths.reduce(
  (acc, filePath) => {
    const connector = require(filePath);

    return {
      ...acc,
      Query: {
        ...acc.Query,
        ...(connector.Query || {}),
      },
      Mutation: {
        ...acc.Mutation,
        ...(connector.Mutation || {}),
      },
    };
  },
  { Query: {}, Mutation: {} },
);

function decorator(obj) {
  const decorated = {};

  const decorate = (fn) => (
    o,
    args = {},
    {
      accessId, accountLocalId, authToken, timeZone, url, email, loggedUser,
    } = {},
  ) => fn({
    email, ...args, accessId, accountLocalId, authToken, timeZone, url, loggedUser,
  });

  Object.keys(obj).forEach((key) => {
    const fn = obj[key];

    decorated[key] = decorate(fn);
  });
  return decorated;
}

resolvers.Query = decorator(resolvers.Query);
resolvers.Mutation = decorator(resolvers.Mutation);

module.exports = resolvers;
