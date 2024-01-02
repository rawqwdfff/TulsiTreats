"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var jwt = require("jsonwebtoken");
var authenticateJwt = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = authenticateJwt;
