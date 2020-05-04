const getContext = ({ req }) => {
  const { isAuthenticate } = req;

  if (!isAuthenticate) {
    return {
      authToken: req.user && req.user.authToken || undefined,
      timeZone: req.headers.timezone,
    };
  }

  return {
    authToken: req.user.authToken,
    email: req.user.email,
    accessId: req.user.accessId,
    timeZone: req.headers.timezone,
    accountLocalId: req.headers.accountlocalid,
    loggedUser: req.user,
  };
};

module.exports = getContext;
