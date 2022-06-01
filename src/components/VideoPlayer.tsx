import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react"

type VideoPlayerProps = {  
  isFullScreen: () => void;
  children?: ReactNode;
  src: string;
}

const Component: ForwardRefRenderFunction<HTMLVideoElement, VideoPlayerProps> = ({ 
  children, 
  isFullScreen, 
  src,
  ...rest 
}, ref) => {
  return (
    <video
      src={src}
      muted
      autoPlay      
      ref={ref}      
      loop
      onPlay={isFullScreen}
      controls={true}      
      {...rest}
    >
      {children}
    </video>
  )
}

export const VideoPlayer = forwardRef(Component)
