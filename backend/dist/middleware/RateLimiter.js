import { rateLimit } from 'express-rate-limit';
const rateLimits = {
    default: rateLimit({
        windowMs: 60 * 1000,
        max: 2
    }),
    autocomplete: rateLimit({
        windowMs: 1000,
        max: 2
    })
};
export default rateLimits;
//# sourceMappingURL=RateLimiter.js.map