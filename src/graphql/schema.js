const { makeExecutableSchema } = require('apollo-server-express');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const resolvers = require('./resolvers');

const types = fileLoader(`${path.join(__dirname, '../')}/modules/**/*.graphql`);
types.push(...fileLoader(`${path.join(__dirname)}/*.graphql`));

const typeDefs = mergeTypes(types);

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
