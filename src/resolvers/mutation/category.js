import getSlug from "speakingurl";

const category = {
  createCategory(parent, args, { prisma, request }, info) {
    return prisma.mutation.createCategory(
      {
        data: {
          ...args.data,
          slug: getSlug(args.data.title),
        },
      },
      info
    );
  },
  updateCategory(parent, args, { prisma, request }, info) {
    let slug = undefined;

    if (typeof args.data.title === "string") {
      slug = getSlug(args.data.title);
    }

    return prisma.mutation.updateCategory(
      {
        where: {
          id: args.id,
        },
        data: {
          ...args.data,
          slug,
        },
      },
      info
    );
  },
  deleteCategory(parent, args, { prisma, request }, info) {
    return prisma.mutation.deleteCategory(
      {
        where: {
          id: args.id,
        },
      },
      null
    );
  },
};

export default category;
