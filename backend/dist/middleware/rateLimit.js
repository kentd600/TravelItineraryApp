import rateLimit from "express-rate-limit";
const setRateLimit = () => {
    rateLimit({
        windowMs: 10000,
        max: 2
    });
};
export default setRateLimit;
//# sourceMappingURL=rateLimit.js.map