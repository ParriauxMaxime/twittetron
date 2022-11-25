export interface Tweet {
  id: number;
  createdAt: string;
  text: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  user?: {
    name: string;
    screen_name: string;
    profile_image_url: string;
  };
}
