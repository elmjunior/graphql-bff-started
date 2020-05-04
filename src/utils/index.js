exports.buildHeaders = (authToken) => ({
  Authorization: process.env.BASIC_ACCESS_CLOUD,
  'X-Auth-Token': authToken || '',

});
