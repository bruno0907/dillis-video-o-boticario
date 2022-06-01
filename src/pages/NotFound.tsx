import { Button, Heading, VStack } from "@chakra-ui/react"
import { FiRotateCcw } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <VStack spacing={8} w="100%" h="100vh" align="center" justify="center">
      <Heading>A página que você procura talvez não exista.</Heading>
      <Button 
        colorScheme="whatsapp" 
        leftIcon={<FiRotateCcw />}
        onClick={() => navigate('/')}
      >Voltar ao início</Button>
    </VStack>
  )
}