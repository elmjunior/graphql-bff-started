exports.message = {
  ERROR: {
    INVALID_JWT_TOKEN: 'Not Authorized - Invalid jwt token',
    USER_NOT_FOUND: 'User not found',
  },
};

exports.httpStatus = {
  NOT_AUTHORIZED: 401,
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

exports.urls = {
  API_URL: process.env.API_URL || 'http://localhost:21011/api',
};


/* GraphQL Variables */
exports.GRAPHQL_PORT = process.env.PORT || 3000;

exports.MY_SQL_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
