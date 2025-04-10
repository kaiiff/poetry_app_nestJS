import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(content: string, authorId: string) {
    return this.prisma.post.create({
      data: { content, authorId },
      include: {
        author: {
          select: { id: true, name: true }, // 👈 Add any fields you want to emit
        },
      },
    });
  }

  // async getAllPosts() {
  //   return this.prisma.post.findMany({
  //     include: { author: { select: { name: true } } },
  //   });
  // }

  async getAllPosts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async updatePost(id: string, content: string) {
    return this.prisma.post.update({
      where: { id },
      data: { content },
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
