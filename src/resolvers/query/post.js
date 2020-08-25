const post = {
  posts(parent, args, { prisma, request }, info) {
    const language = args.language;
    const categoryType = args.categoryType;

    return prisma.query.posts(
      {
        where: {
          AND: [
            {
              language,
            },
            {
              category: {
                categoryType,
              },
            },
          ],
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
