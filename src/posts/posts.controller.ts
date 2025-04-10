import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Pagination,
  PaginationParams,
} from '../common/decorators/pagination.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody,ApiQuery } from '@nestjs/swagger';
import { CreatePostDto,PaginationQueryDto } from './dto/create-post.dto';

@ApiTags('Posts')
@ApiBearerAuth('access-token') // 👈 Add this for token support
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new post (requires auth)' })
  @ApiBody({ type: CreatePostDto })
  createPost(@Body() body: { content: string }, @Request() req) {
    const authorId = req.user.userId;
    return this.postsService.createPost(body.content, authorId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts with pagination' })
  @ApiQuery({type:PaginationQueryDto})
  getAllPosts(@Pagination() { page, limit }: PaginationParams) {
    return this.postsService.getAllPosts(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  getPostById(@Param('id') id: string, @Request() req) {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  updatePost(@Param('id') id: string, @Body() body: { content: string }) {
    return this.postsService.updatePost(id, body.content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
