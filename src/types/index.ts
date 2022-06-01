export type SignInProps = {
  username: string;
  password: string;
}

export type NewCustomerProps = {
  name: string;
  email: string;
  phone: string;
}

export type CustomerProps = {  
  id: string;
  name: string;
  email: string;
  phone: string;
  video_url?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export type VideosProps = {
  id: string;
  user_id: string;
  url: string;
}
