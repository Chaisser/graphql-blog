import jwt from "jsonwebtoken";

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, "JWTSECRET");
};

export default generateToken;
