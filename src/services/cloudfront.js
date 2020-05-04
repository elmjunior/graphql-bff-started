const { CloudFront } = require('aws-sdk');
const { aws } = require('../config');

const cloudfront = new CloudFront({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
});

exports.invalidate = async (paths = []) => {
  const pathList = [];

  if (typeof paths === 'string') pathList.push(paths);
  else pathList.push(...paths);

  const promise = cloudfront
    .createInvalidation({
      DistributionId: aws.cloudfront.distributionId,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: pathList.length,
          Items: pathList,
        },
      },
    })
    .promise();

  return promise;
};
