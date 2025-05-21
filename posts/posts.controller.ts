import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body('text') text: string,
    @Body('imageUrl') imageUrl: string,
    @Request() req,
  ): Promise<PostEntity> {
    const userId = req.user.userId; 
    return await this.postsService.createPost(text, imageUrl, userId);
  }

  @Get()
  async getAll(): Promise<PostEntity[]> {
    return await this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-posts')
  async getMyPosts(@Request() req): Promise<PostEntity[] | { message: string }> {
    const userId = req.user.userId;
    return await this.postsService.findByUserId(userId); 
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@Request() req, @Body('postId') postId: string) {
    const userId = req.user.userId;
    const post = await this.postsService.findOne(+postId);
    if (post.userId !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }
    return await this.postsService.deletePost(+postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(
    @Request() req,
    @Body('postId') postId: string,
    @Body('text') text: string,
    @Body('imageUrl') imageUrl: string,
  ): Promise<PostEntity> {
    const userId = req.user.userId;
    const post = await this.postsService.findOne(+postId);
    if (post.userId !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }
    return await this.postsService.updatePost(+postId, text, imageUrl);
  }
}