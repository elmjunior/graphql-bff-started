const path = require('path');
require('dotenv').config();

const config = {
  commons: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 3000,

    jwtSecret: 'somma@biorc',
    PLAYGROUND: process.env.PLAYGROUND,
    APOLLO_ENGINE_KEY: 'service:vcrzy:nLh0HDK4L62klIn9sqCaRg',
    aws: {
      accessKeyId: 'AKIAIA3XHMLPC4WIWE7A',
      secretAccessKey: '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',
      s3: {
        bucket: 'kiper-avatar',
        region: 'us-east-2',
      },
      cloudfront: {
        distributionId: 'E2JAVIN2VA7YVM',
      },
    },
  },

};

module.exports = Object.freeze(
  { ...config.commons, ...config[config.commons.env] },
);
