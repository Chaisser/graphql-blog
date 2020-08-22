import bcrypt from "bcryptjs";
import hashPassword from "./../../utils/hashPassword";
import generateToken from "./../../utils/generateToken";
import getUserData from "./../../utils/getUserData";
const user = {
  async createUser(parent, args, { request, prisma }, info) {
    args.data.password = await hashPassword(args.data.password);
    return prisma.mutation.createUser(
      {
        data: args.data,
      },
      info
    );
  },
  async updateUser(parent, args, { request, prisma }, info) {
    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  deleteUser(parent, args, { request, prisma }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async loginUser(parent, args, { request, prisma }, info) {
    const email = args.data.email;
    const password = args.data.password;

    const user = await prisma.query.user(
      {
        where: {
          email,
        },
      },
      null
    );

    if (!user) {
      throw new Error("Kullanıcı adı veya şifre hatalı");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Kullanıcı adı veya şifre hatalı");
    }

    const token = generateToken(user.id, user.userType);

    return {
      user,
      token,
    };
  },
};

export default user;
