const argon2 = require("argon2");

const hashingPassword = (req, res, next) => {
    const password = req.body.password;

    argon2
        .hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 15,
            hashLength: 50,
            timeCost: 2, // nombre d'itérations de 2
            parallelism: 1 // 1 degré de parallélisme
        })
        .then((hashedPassword) => {
            req.body.hashedPassword = hashedPassword;
            delete password;
            next();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('The password could not be hashed');
        });
};

module.exports = {
    hashingPassword,
};