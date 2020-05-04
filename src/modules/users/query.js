const axios = require('axios');
const { urls } = require('../../constants');
const { buildHeaders } = require('../../utils');

exports.listUsers = async function listUsers({
  authToken,
}) {
  try {
    const res = await axios.get(
      `${urls.API_URL}/users`,
      {
        headers: buildHeaders(authToken),
      },
    );

    return res.data;
  } catch (e) {
    return e;
  }
};
