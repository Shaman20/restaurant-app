import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  content: string = ''; // Variable to hold the shared content

  constructor(
    private postService: PostService,
    private contentSharingService: ContentService
  ) {}

  ngOnInit() {
    this.getPosts();
    this.contentSharingService.content$.subscribe((content) => {
      this.content = content; // Update the content when shared content changes

      // Read liked post IDs from Local Storage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      this.posts.forEach((post) => {
        post.liked = likedPosts.includes(post.id);
      });
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data.posts.reverse(); // Update the posts array
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  toggleLike(post: any) {
    if (post.liked) {
      this.unlikePost(post);
    } else {
      this.likePost(post);
    }
  }

  likePost(post: any) {
    this.postService.likePost(post.id).subscribe(
      (data) => {
        post.likes++;
        post.liked = true;
        this.updateLocalStorage(post.id, true); // Save the like state to Local Storage
      },
      (error) => {}
    );
  }

  unlikePost(post: any) {
    this.postService.unlikePost(post.id).subscribe(
      (data) => {
        post.likes--;
        post.liked = false;
        this.updateLocalStorage(post.id, false); // Save the like state to Local Storage
      },
      (error) => {}
    );
  }

  private updateLocalStorage(postId: string, liked: boolean) {
    // Save the like state to Local Storage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (liked) {
      likedPosts.push(postId);
    } else {
      const index = likedPosts.indexOf(postId);
      if (index !== -1) {
        likedPosts.splice(index, 1);
      }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }
}
