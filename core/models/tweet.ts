export interface Tweet {
  id: number;
  createdAt: string,
  text: string;
  user?: {
    name: string,
    screen_name: string,
    profile_image_url: string,
  }
}
