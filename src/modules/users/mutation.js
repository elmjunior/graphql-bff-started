const axios = require('axios');
const { urls } = require('../../constants');
const { buildHeaders } = require('../../utils');


exports.addUser = async function addUser({
  authToken,
  dwellers,
}) {
  try {
    await axios.post(
      `${urls.API_URL}/users`,
      dwellers,
      {
        headers: buildHeaders(authToken),
      },
    );
    return 'SUCCESS';
  } catch (e) {
    return e;
  }
};
