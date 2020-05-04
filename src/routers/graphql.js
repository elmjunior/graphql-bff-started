const { Router } = require('express');
const authentication = require('../services/auth');
const verifyQueryType = require('../services/validator');

const router = Router({ mergeParams: true });

module.exports = router;

router.get('/health', (req, res) => res.json({ UP: true }));

router.use((req, res, next) => {
  if (verifyQueryType(req)) {
    return next();
  }
  return authentication({ req, res, next });
});
