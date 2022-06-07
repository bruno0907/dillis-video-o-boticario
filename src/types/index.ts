export type SignInProps = {
  username: string;
  password: string;
}

export type NewCustomerProps = {
  name: string;
  email: string;
  authorizeSendMail: boolean;
  authorizeDisplayVideo: boolean;
}

export type CustomerProps = {  
  id: string;
  name: string;
  email: string;
  authorizeSendMail: boolean;
  authorizeDisplayVideo: boolean;
  videoUrl?: string | undefined;
  createAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export type CustomerResponseProps = {  
  id: string;
  name: string;
  email: string;
  authorize_send_mail: boolean;
  authorize_display_video: boolean;
  video_url?: string | undefined;
  created_at?: Date | undefined;
  updated_at?: Date | undefined;
}

export type VideosProps = {
  id: string;
  user_id: string;
  url: string;
}
