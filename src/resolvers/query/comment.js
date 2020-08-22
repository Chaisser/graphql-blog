const comment = {
  comments(parent, args, { request, prisma }, info) {
    const opArgs = {};
    const status = args.status;
    if (status) {
      opArgs.where = {
        status,
      };
    }
    return prisma.query.comments(opArgs, info);
  },
  comment(parent, args, { request, prisma }, info) {
    return prisma.query.comment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default comment;
