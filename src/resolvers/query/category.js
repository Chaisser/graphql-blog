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
};

export default category;
