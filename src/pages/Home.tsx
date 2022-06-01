import { useNavigate } from "react-router-dom";

import { Button, Heading, HStack, VStack } from "@chakra-ui/react"

import { Logo } from '../components/Logo'
import { FiCamera, FiList } from "react-icons/fi";

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Logo mt="48" mb="16"/>
      <VStack w="md" spacing={16} p="8"  bgColor="#000a1f96" borderRadius="lg" boxShadow="sm">
        <Heading size="lg">Bem-vindo</Heading>
        <HStack spacing={4}>
          <Button
            colorScheme="green"
            onClick={() => navigate('/customers')}
            leftIcon={<FiList />}
          >Cadastro</Button>
          <Button
            colorScheme="green"
            onClick={() => navigate('/player')}
            leftIcon={<FiCamera />}
          >Video</Button>
        </HStack>
      </VStack>
    </>
  )
}