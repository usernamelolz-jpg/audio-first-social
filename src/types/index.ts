export interface AudioPost {
  id: string;
  userId: string;
  username: string;
  audioUri: string;
  duration: number; // in seconds
  caption?: string;
  createdAt: Date;
  likes: number;
  comments: AudioComment[];
}

export interface AudioComment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  audioUri: string;
  duration: number;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUri?: string;
  followers: number;
  following: number;
}
