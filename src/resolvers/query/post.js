const post = {
  posts(parent, args, { prisma, request }, info) {
    const language = args.language;

    return prisma.query.posts(
      {
        where: {
          language,
        },
      },
      info
    );
  },
  post(parent, args, { prisma, request }, info) {
    return prisma.query.post(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default post;
