import getUserData from "./../../utils/getUserData";

const content = {
  async createContent(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);

    const postId = args.postId;

    const photos = args.data.photos;
    delete args.data.photos;

    const post = await prisma.query.posts(
      {
        where: {
          AND: [
            {
              id: postId,
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

    if (!post[0]) {
      throw new Error("Bu yazıya içerik ekleye yetkiniz bulunmamaktadır");
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: postId,
        },
        data: {
          contents: {
            create: {
              ...args.data,
              photos: {
                set: photos,
              },
            },
          },
        },
      },
      info
    );
  },
  async updateContent(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);
    const content = await prisma.query.contents(
      {
        where: {
          AND: [
            {
              id: args.id,
            },
            {
              post: {
                user: {
                  id: userData.id,
                },
              },
            },
          ],
        },
      },
      null
    );
    if (!content[0]) {
      throw new Error("Bu içeriği silme yetkiniz bulunmamaktadır.");
    }

    const photos = args.data.photos;
    delete args.data.photos;

    return prisma.mutation.updateContent({
      where: {
        id: args.id,
      },
      data: {
        ...args.data,
        photos: {
          set: photos,
        },
      },
    });
  },
  async deleteContent(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);
    const content = await prisma.query.contents(
      {
        where: {
          AND: [
            {
              id: args.id,
            },
            {
              post: {
                user: {
                  id: userData.id,
                },
              },
            },
          ],
        },
      },
      null
    );
    if (!content[0]) {
      throw new Error("Bu içeriği silme yetkiniz bulunmamaktadır.");
    }

    return prisma.mutation.deleteContent(
      {
        where: {
          id: args.id,
        },
      },
      null
    );
  },
};

export default content;
