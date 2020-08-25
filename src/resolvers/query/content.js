import getUserData from "./../../utils/getUserData";
const content = {
  contents(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);
    const postId = args.postId;
    let roleCheck = {};

    if (userData === "USER") {
      roleCheck = {
        id: userData.id,
      };
    }
    return prisma.query.contents(
      {
        where: {
          AND: [
            {
              post: {
                id: postId,
              },
            },
            {
              post: {
                user: { ...roleCheck },
              },
            },
          ],
        },
      },
      info
    );
  },
  content(parent, args, { prisma, request }, info) {
    return prisma.query.content(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default content;
