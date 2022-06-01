import { useRef } from "react"
import { useNavigate } from "react-router-dom"

import { 
  Button, 
  ButtonGroup, 
  Center, 
  Flex, 
  Heading, 
  HStack, 
  IconButton, 
  Spinner, 
  Text, 
  VStack 
} from "@chakra-ui/react"

import { FiArrowLeft, FiRotateCcw } from "react-icons/fi"

import { useVideos } from "../hooks/useVideos"
import { VideoPlayer } from "../components/VideoPlayer"
import { Logo } from "../components/Logo"

export const Player = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useVideos()

  const playerRef = useRef<HTMLVideoElement>(null)
  
  const fullScreen = () => {
    if(playerRef.current?.requestFullscreen) {
      playerRef.current.requestFullscreen()    
    } 
  }  

  if(isLoading) {
    return (      
      <Center h="100vh">
        <Spinner size="lg" mr="4" />
        <Text>carregando...</Text>
      </Center>      
    )
  }
  
  if(isError) {
    return (
      <VStack spacing={24} w="100%" maxW="7xl" align="center">                
        <Logo />        
        <Heading size="lg">Ocorreu um erro ao carregar o vídeo</Heading>
        <ButtonGroup spacing={4}>
          <Button 
            colorScheme="whatsapp"             
            onClick={() => navigate('/')}
            leftIcon={<FiArrowLeft />}
          >Voltar</Button>
          <Button 
            colorScheme="whatsapp" 
            onClick={() => navigate(0)}
            leftIcon={<FiRotateCcw />}
          >Recarregar</Button>
        </ButtonGroup>
      </VStack>
    )
  }

  if(!data) return null

  return (
    <>      
      <Flex m="auto" flexDir="column" w="100%" h="100vh" maxW="5xl" align="center">
        <HStack mb="8" w="100%" align="center" justify="space-between">  
          <IconButton 
            aria-label="voltar" 
            variant="ghost" 
            onClick={() => navigate('/')}
            _hover={{ bg: 'green.500' }}
          >
            <FiArrowLeft fontSize="24"/>
          </IconButton>          
          <Logo />
          <Button colorScheme="whatsapp" onClick={fullScreen}>Tela cheia</Button>
        </HStack>
        
        <VideoPlayer
          src={data[0]!}
          isFullScreen={fullScreen}
          ref={playerRef}
        />   
      </Flex>
    </>    
  )
}