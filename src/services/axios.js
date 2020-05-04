const axios = require('axios');
const { notAuthorized, customError } = require('./error');

exports.setupErrorInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        return Promise.reject(notAuthorized());
      }
      if (response && response.status === 400) {
        return Promise.reject(customError({ data: response.data }));
      }
      return Promise.reject(error);
    },
  );
};
