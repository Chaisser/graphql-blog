import getUserData from "./../../utils/getUserData";

const comment = {
  createComment(parent, args, { prisma, request }, info) {
    const postId = args.postId;
    const userData = getUserData(request);

    return prisma.mutation.updatePost(
      {
        where: {
          id: postId,
        },
        data: {
          comments: {
            create: {
              text: args.text,
              user: {
                connect: {
                  id: userData.id,
                },
              },
            },
          },
        },
      },
      info
    );
  },
  updateComment(parent, args, { prisma, request }, info) {
    const userData = getUserData(request);
    if (userData.userType === "USER") {
      throw new Error("Kullanıcılar yorumlarını güncelleyemez. Sadece silebilirler");
    }

    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: {
          text: args.text,
          status: args.status,
        },
      },
      null
    );
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const commentId = args.id;
    const userData = getUserData(request);
    const comment = await prisma.query.comments({
      where: {
        id: commentId,
        OR: [
          {
            user: {
              id: userData.id,
            },
          },
          {
            user: {
              OR: [
                {
                  userType: "ADMIN",
                },
                {
                  userType: "MODERATOR",
                },
              ],
            },
          },
        ],
      },
    });
    if (!comment[0]) {
      throw new Error("Bu yorumu silmeye yetkiniz bulunmamaktadır.");
    }

    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      null
    );
  },
};

export default comment;
