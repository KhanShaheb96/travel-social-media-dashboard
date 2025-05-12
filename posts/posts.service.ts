import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(text: string, imageUrl: string, userId: number) {
    const post = this.postsRepository.create({ text, imageUrl, userId });
    return await this.postsRepository.save(post);
  }

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async deletePost(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new Error('Post not found');
    await this.postsRepository.delete(id);
    return { message: `Post is deleted successfully` };
  }

  async updatePost(id: number, text: string, imageUrl: string) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new Error('Post not found');
    post.text = text;
    post.imageUrl = imageUrl;
    return await this.postsRepository.save(post);
  }
}