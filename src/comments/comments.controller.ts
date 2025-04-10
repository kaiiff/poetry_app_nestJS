// Comments Controller
import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('add')
  addComment(
    @Body() body: { postId: string; userId: string; content: string },
  ) {
    return this.commentsService.addComment(
      body.postId,
      body.userId,
      body.content,
    );
  }



  @Get(':postId')
  getCommentsForPost(@Param('postId') postId: string) {
    return this.commentsService.getCommentsForPost(postId);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
