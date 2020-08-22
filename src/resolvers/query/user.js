import getUserData from "./../../utils/getUserData";

const user = {
  users(parent, args, { prisma, request }, info) {
    return prisma.query.users({}, info);
  },
  user(parent, args, { prisma, request }, info) {
    return prisma.query.user(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  me(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);
    const userId = userData.id;

    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
};

export default user;
