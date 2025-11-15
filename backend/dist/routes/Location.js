import express from 'express';
import rateLimits from '../middleware/RateLimiter.js';
const locationRouter = express.Router();
locationRouter.get('/autocomp', rateLimits.autocomplete, (req, res) => {
});
locationRouter.use(rateLimits.default);
//# sourceMappingURL=Location.js.map