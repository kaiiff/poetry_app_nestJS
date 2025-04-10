import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma.service';
import { PostsGateway } from './posts.gateway';

@Module({
  providers: [PostsService, PrismaService,PostsGateway],
  controllers: [PostsController],
})
export class PostsModule {}
