const path = require('path');
require('dotenv').config();

const config = {
  commons: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 3000,

    jwtSecret: 'app@graphql',
    PLAYGROUND: process.env.PLAYGROUND,
    APOLLO_ENGINE_KEY: 'service:vcrzy:nLh0HDK4L62klIn9sqCaRg',
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      s3: {
        bucket: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION,
      },
    },
  },
};

module.exports = Object.freeze({
  ...config.commons,
  ...config[config.commons.env],
});
