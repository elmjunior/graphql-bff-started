
const types = () => false;

const verifyQueryType = (req) => {
  const { body: { query } } = req;
  if (query && types(query)) {
    return true;
  }
  return false;
};


module.exports = verifyQueryType;
