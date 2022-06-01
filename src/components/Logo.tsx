import { Image, ImageProps } from "@chakra-ui/react";

import LogoImg from '../assets/logo.svg'

export const Logo  = ({ ...rest }: ImageProps) => <Image src={LogoImg} {...rest}/>