import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('text') text: string,
    @Body('imageUrl') imageUrl: string,
    @Body('userId') userId: number,
  ) {
    return await this.postsService.createPost(text, imageUrl, userId);
  }

  @Get()
  async getAll() {
    return await this.postsService.getAllPosts();
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postsService.deletePost(+id);
  }

 // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('text') text: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    return await this.postsService.updatePost(+id, text, imageUrl);
  }
}