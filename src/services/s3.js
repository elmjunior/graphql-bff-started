const { S3 } = require('aws-sdk');
const { aws } = require('../config');

const s3 = new S3({
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.s3.region,
});

exports.uploadAvatar = async function uploadAvatar({ path, avatar, mimetype }) {
  const [uploaded] = await Promise.all([
    s3
      .upload({
        Key: path,
        Body: avatar,
        ContentType: mimetype,
        Bucket: aws.s3.bucket,
        ACL: 'public-read',
      })
      .promise(),
  ]);

  return uploaded;
};

exports.upload = async ({
  path,
  file,
  mimetype,
  bucket = process.env.AWS_BUCKET,
}) => {
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

exports.removeObjects = async ({ paths, bucket = process.env.AWS_BUCKET }) => {
  const res = await s3
    .deleteObjects({
      Bucket: bucket,
      Delete: {
        Objects: paths.map((x) => ({
          Key: x.replace(`https://${bucket}.s3.amazonaws.com/`, ''),
        })),
      },
    })
    .promise();
  return res;
};
