import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,  
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  FormErrorMessage,
  FormErrorIcon,
  useToast,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../services/auth";
import { SignInProps } from "../types";

const signInSchema = yup.object().shape({
  username: yup.string().required('O nome do usuário é obrigatório').trim(),
  password: yup.string().required('A senha é obrigatória').trim()
})

export const SignIn = () => {
  const navigate = useNavigate()  
  const toast = useToast()
  
  const [isVisible, setIsVisible] = useState(false)
    
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setError,    
  } = useForm<SignInProps>({
    resolver: yupResolver(signInSchema)
  })

  const handleSignIn: SubmitHandler<SignInProps> = async ({ username, password }) => {
    try {
      await signIn({ username, password })
      toast({
        status: 'success',
        title: 'Login efetuado com sucesso!',
        description: 'Redirecionando, aguarde...',
        duration: 5000,     
        position: 'bottom',
        isClosable: true
      })
      navigate('/customers')

    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Um erro ocorreu...'        ,
        description: 'Não foi possível fazer sua autenticação.',
        duration: 10000,
        position: 'bottom',
        isClosable: true
      })
      setError('username', {
        message: 'Usuário ou senha inválidos'
      })      
    }
  }

  const handleSignInErrors: SubmitErrorHandler<SignInProps> = errors => console.log(errors)

  return (    
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">      
      <VStack as="form" w="md" spacing={4} p="8" bgColor="gray.800" borderRadius="lg" boxShadow="sm" onSubmit={handleSubmit(handleSignIn, handleSignInErrors)}>
        <Heading>Entrar</Heading>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Usuário</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <FiUser />
            </InputLeftElement>
            <Input 
              id="username"
              autoComplete="none"
              isDisabled={isSubmitting}
              {...register('username')}
            />
          </InputGroup>
          {errors.username && (
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.username.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <InputGroup mb="4">
            <InputLeftElement>
              <FiLock />
            </InputLeftElement>
            <Input 
              id="password"
              type={ !isVisible ? "password" : "text" }
              autoComplete="none"
              isDisabled={isSubmitting}
              {...register('password')}
            />
            <InputRightElement onClick={() => setIsVisible(!isVisible)}>
              { !isVisible ? <FiEye /> : <FiEyeOff /> }
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit" 
          colorScheme="blue"          
          w="100%"          
          isLoading={isSubmitting}
          loadingText="Entrando"
        >Entrar</Button>
      </VStack>      
    </Flex>    
  )
}
