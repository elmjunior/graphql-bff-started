const { S3 } = require('aws-sdk');
const { aws } = require('../config');
const { invalidate } = require('./cloudfront');

const s3 = new S3({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.s3.region,
});

exports.uploadAvatar = async function uploadAvatar({ path, avatar, mimetype }) {
  const [uploaded, invalidated] = await Promise.all([
    s3
      .upload({
        Key: path,
        Body: avatar,
        ContentType: mimetype,
        Bucket: aws.s3.bucket,
        ACL: 'public-read',
      })
      .promise(),
    invalidate(`/${encodeURIComponent(path)}`).catch(e => e),
  ]);

  return uploaded;
};

exports.upload = async ({ path, file, mimetype, bucket = 'kiper-app' }) => {
  const res = await s3
    .upload({
      Key: path,
      Body: file,
      ContentType: mimetype,
      Bucket: bucket,
      ACL: 'public-read',
    })
    .promise();

  return res;
};

exports.removeObjects = async ({ paths, bucket = 'kiper-app' }) => {
  const res = await s3
    .deleteObjects({
      Bucket: bucket,
      Delete: {
        Objects: paths.map(x => ({ Key: x.replace(`https://${bucket}.s3.amazonaws.com/`, '') })),
      },
    })
    .promise();
  return res;
};
