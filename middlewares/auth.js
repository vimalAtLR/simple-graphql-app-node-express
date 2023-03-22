const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let authHeader = req.get("Authorization");
        if (!authHeader) {
            req.isAuth = false;
            next();
            return;
        }

        let token = authHeader.split(" ")[1];
        if (!token || token === "") {
            req.isAuth = false;
            next();
            return;
        }

        let decodedToken = await jwt.verify(token, "seckretofuser");
        if (!decodedToken) {
            req.isAuth = false;
            next();
            return;
        }
        console.log("decoded :: ", decodedToken);

        req.isAuth = true;
        req.user = decodedToken;
        next();
    } catch(err) {
        console.log('err : ', err);
        req.isAuth = false;
        next();
    }
}