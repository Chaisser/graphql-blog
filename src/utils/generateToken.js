import jwt from "jsonwebtoken";

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET_KEY);
};

export default generateToken;
