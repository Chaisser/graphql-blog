const category = {
  categories(parent, args, { prisma, request }, info) {
    const language = args.language;
    const categoryType = args.categoryType;

    return prisma.query.categories(
      {
        where: {
          AND: [
            {
              language,
            },
            {
              categoryType,
            },
          ],
        },
      },
      info
    );
  },
  category(parent, args, { prisma, request }, info) {
    return prisma.query.category(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default category;
