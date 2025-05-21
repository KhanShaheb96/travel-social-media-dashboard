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

  async createPost(text: string, imageUrl: string, userId: number): Promise<Post> {
    const post = this.postsRepository.create({ text, imageUrl, userId });
    return await this.postsRepository.save(post);
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new Error('Post not found');
    return post;
  }

  async findByUserId(userId: number): Promise<Post[] | { message: string }> {
    const posts = await this.postsRepository.find({ where: { userId } });
    if (posts.length === 0) {
      return { message: "You haven't posted anything yet" }; 
    }
    return posts; 
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async deletePost(id: number) {
    const post = await this.findOne(id);
    await this.postsRepository.delete(id);
    return { message: `Post is deleted successfully` };
  }

  async updatePost(id: number, text: string, imageUrl: string): Promise<Post> {
    const post = await this.findOne(id);
    post.text = text;
    post.imageUrl = imageUrl;
    return await this.postsRepository.save(post);
  }
}