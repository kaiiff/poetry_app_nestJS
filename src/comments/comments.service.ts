// Comments Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(postId: string, userId: string, content: string) {
  return this.prisma.comment.create({
    data: {
      content,
      post: {
        connect: { id: postId }, // ✅ Connect to the Post
      },
      author: {
        connect: { id: userId }, // ✅ Connect to the User (not `userId` directly)
      },
    },
  });
}

  async getCommentsForPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { name: true } } },
    });
  }

  async deleteComment(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
