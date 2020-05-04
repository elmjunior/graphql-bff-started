const { message, httpStatus } = require('../constants');

// eslint-disable-next-line consistent-return
const auth = ({ req, res, next }) => {
  try {
    const authToken = req.headers['x-auth-token'];

    req.user = {
      authToken,
    };
    return next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `${httpStatus.NOT_AUTHORIZED} - ${
        message.ERROR.INVALID_JWT_TOKEN
      } Error: ${JSON.stringify(e)}`,
    );
    res
      .status(httpStatus.NOT_AUTHORIZED)
      .send(`${message.ERROR.INVALID_JWT_TOKEN} Error: ${JSON.stringify(e)}`);
  }
};

module.exports = auth;
