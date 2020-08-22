import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password < 6) {
    throw new Error("Password must be 6 characters or longer");
  }

  return bcrypt.hash(password, 10);
};

export default hashPassword;
