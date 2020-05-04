const express = require('express');
const { ApolloServer } = require('apollo-server-express');


const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const bodyParser = require('body-parser');
const schema = require('./graphql/schema');
const getContext = require('./services/context');
const welcomeMessage = require('./utils/welcomeMessage');

const { PLAYGROUND, APOLLO_ENGINE_KEY } = require('./config');
const { GRAPHQL_PORT } = require('./constants');
const routers = require('./routers');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb' }));

Object.keys(routers).forEach((route) => app.use(`/${route}`, routers[route]));

const server = new ApolloServer({
  schema,
  context: getContext,
  tracing: true,
  cacheControl: true,
  engine: { apiKey: APOLLO_ENGINE_KEY },
  plugins: [
    {
      requestDidStart({ request }) {
        return {
          willSendResponse({ response }) {
            if (!response.errors) return;
            // eslint-disable-next-line no-console
            console.log(request.variables);
          },
        };
      },
    },
  ],
});

server.applyMiddleware({ app });

if (PLAYGROUND === 'true') {
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
}

app.listen(GRAPHQL_PORT, welcomeMessage).setTimeout(60000);
