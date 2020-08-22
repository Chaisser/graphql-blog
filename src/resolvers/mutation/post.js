import getUserData from "./../../utils/getUserData";

import getSlug from "speakingurl";

const post = {
  createPost(parent, args, { request, prisma }, info) {
    const userData = getUserData(request);

    const categoryId = args.category;
    return prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          slug: getSlug(args.data.title),
          category: {
            connect: {
              id: categoryId,
            },
          },
          user: {
            connect: {
              id: userData.id,
            },
          },
        },
      },
      info
    );
  },
  async updatePost(parent, args, { request, prisma }, info) {
    const userData = getUserData(request);

    const post = await prisma.query.posts(
      {
        where: {
          AND: [
            {
              user: {
                id: userData.id,
              },
            },
            {
              id: args.id,
            },
          ],
        },
      },
      null
    );

    if (!post[0]) {
      throw new Error("Bu yazıyı düzenlemek için yetkiniz bulunmamaktadır.");
    }

    let slug = undefined;
    const category = {};

    if (typeof args.data.title === "string") {
      slug = getSlug(args.data.title);
    }

    if (args.category) {
      category.connect = {
        id: args.category,
      };
    }

    return prisma.mutation.updatePost({
      where: {
        id: args.id,
      },
      data: {
        ...args.data,
        slug,
        category,
      },
    });
  },
  async deletePost(parent, args, { request, prisma }, info) {
    const userData = getUserData(request);

    const post = await prisma.query.posts(
      {
        where: {
          AND: [
            {
              id: args.id,
            },
            {
              user: {
                id: userData.id,
              },
            },
          ],
        },
      },
      null
    );
    console.log(post);

    if (!post[0]) {
      throw new Error("Bu yazıyı silme yetkiniz bulunamamaktadır");
    }
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    });
  },
};

export default post;
