const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function authorization(req, res, next) {

  const failedResponse = { error: 'Wrong Token' };

  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    return res.status(403).json(failedResponse);
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(403).json(failedResponse);
  }

  const token = authorizationHeader.substring(7); // Remove 'Bearer ' from the token

  let decodedUser;

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json(failedResponse);
    } else {
      decodedUser = decoded;
    }
  });

  if (!decodedUser || !decodedUser.id) {
    return res.status(403).json(failedResponse);
  }

  req.authorization_id = decodedUser.id;

  next();
};

function generateJWT(user_id) {

  // Secret key for JWT encryption
  const secretKey = process.env.JWT_KEY;

  const payload = {
    id: user_id,
  };

  const accessToken = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

  return accessToken;
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('base64');
}

module.exports = {
  authorization,
  generateJWT,
  hashPassword
};

