import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            },
            post: {
              id: id
            }
          }
        ]
      });
    },
    likeCount: async parent => {
      const { id } = parent;
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      return likeCount;
    },
    commentCount: async parent => {
      const { id } = parent;
      const commentCount = await prisma
        .commentsConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      return commentCount;
    },
    user: parent => prisma.post({ id: parent.id }).user(),
    files: parent => prisma.post({ id: parent.id }).files(),
    likes: parent => prisma.post({ id: parent.id }).likes(),
    comments: parent => prisma.post({ id: parent.id }).comments()
  }
};
