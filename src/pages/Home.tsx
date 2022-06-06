import { useNavigate } from "react-router-dom";

import { Button, Heading, HStack, VStack } from "@chakra-ui/react"

import { Logo } from '../components/Logo'
import { FiUsers } from "react-icons/fi";
import { BiCameraMovie } from 'react-icons/bi'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Logo mt="48" mb="16"/>
      <VStack w="md" spacing={16} p="8"  bgColor="#000a1f96" borderRadius="md" boxShadow="sm">
        <Heading size="lg">Bem-vindo</Heading>
        <HStack spacing={4}>
          <Button
            colorScheme="green"
            onClick={() => navigate('/customers')}
            leftIcon={<FiUsers />}
            borderRadius="sm"
          >Visitantes</Button>
          <Button
            colorScheme="green"
            onClick={() => navigate('/player')}
            leftIcon={<BiCameraMovie fontSize={19} />}
            borderRadius="sm"
          >Video</Button>
        </HStack>
      </VStack>
    </>
  )
}