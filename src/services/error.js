const { GraphQLError } = require('graphql/error');

exports.notAuthorized = () => new GraphQLError('not_authorized');

exports.customError = ({
  data: {
    response: { key, detail },
  },
}) => {
  return new GraphQLError({
    message: key || 'Error',
    detail: detail || 'Detail undefined from server',
    code: 400,
  });
};
