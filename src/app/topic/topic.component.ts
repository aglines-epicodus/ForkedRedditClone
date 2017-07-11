import { Component, OnInit } from '@angular/core';
import { UserPost } from './../user-post.model';
import { SubredditService } from './../subreddit.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [SubredditService]
})

export class TopicComponent implements OnInit {
  subredditId: number = null;
  subredditTitle: string = null;
  posts: UserPost[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subredditService: SubredditService
  ) { }

  ngOnInit(): void {
    this.route.params.forEach(urlParam => {
      this.subredditId = Number(urlParam['id']);
    });

    this.posts = this.subredditService.getSubredditPosts(this.subredditId);

    this.subredditTitle = this.subredditService.getSubredditTitle(this.subredditId);
  }

  formPostSubmit(postTitle: string, postContent: string): void {
    this.subredditService.addPost(postTitle, postContent, this.subredditId);
  }
}
