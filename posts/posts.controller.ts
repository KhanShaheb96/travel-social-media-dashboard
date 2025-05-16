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
  async getMyPosts(@Request() req): Promise<PostEntity[]> {
    const userId = req.user.userId;
    return await this.postsService.findByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    const post = await this.postsService.findOne(+id);
    if (post.userId !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }
    return await this.postsService.deletePost(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('text') text: string,
    @Body('imageUrl') imageUrl: string,
    @Request() req,
  ): Promise<PostEntity> {
    const userId = req.user.userId;
    const post = await this.postsService.findOne(+id);
    if (post.userId !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }
    return await this.postsService.updatePost(+id, text, imageUrl);
  }
}