import { useEffect } from "react";
import * as yup from 'yup';

import { 
  Button, 
  ButtonGroup, 
  Checkbox, 
  FormControl, 
  FormErrorIcon, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  useToast, 
  VStack 
} from "@chakra-ui/react";

import { FiUser, FiMail, FiCheck, FiX } from "react-icons/fi";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerProps, NewCustomerProps } from "../types";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import { queryClient } from "../services/queryClient";

const customerSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório')
    .min(2, 'O nome deve conter no mínimo 2 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  authorizeSendMail: yup.boolean(),
    email: yup.string().email('Você deve informar um formato de e-mail válido').when(
    'authorizeSendMail', {
      is: (authorizeSendMail: boolean) => authorizeSendMail === true,
      then: yup.string().required('O e-mail é obrigatório')        
    }
  ),  
  authorizeDisplayVideo: yup.boolean()
})

type CustomerFormProps = {
  customerToEdit?: CustomerProps | null;  
  handleCustomerToEdit: (customer: CustomerProps | null) => void;
  handleClose: () => void;  
}

export const CustomerForm = ({ customerToEdit, handleCustomerToEdit, handleClose }: CustomerFormProps) => {
  const toast = useToast()

  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()  

  const { 
    register, 
    reset, 
    handleSubmit,
    setError,    
    watch,
    setFocus,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting } 
  } = useForm<NewCustomerProps>({
    resolver: yupResolver(customerSchema)
  })

  const isAuthorizingSendMail = watch('authorizeSendMail', false)    
  const isAuthorizingSendVideo = watch('authorizeDisplayVideo', false)

  const handleSubmitUser: SubmitHandler<NewCustomerProps> = async values => {
    const { email, name, authorizeSendMail, authorizeDisplayVideo } = values

    try {
      if(customerToEdit) {
        await updateCustomer.mutateAsync({
          ...customerToEdit,
          name,
          email: authorizeSendMail ? email : '',
          authorizeSendMail,
          authorizeDisplayVideo
        })    
        handleCustomerToEdit(null)
        toast({
          status: 'success',                    
          title: 'Sucesso!',
          description: 'Cadastro atualizado com sucesso.',          
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        })
        handleClose()
        return
      }

      await createCustomer.mutateAsync({
        name,
        email: authorizeSendMail ? email : '',
        authorizeSendMail,
        authorizeDisplayVideo
      })

      toast({
        status: 'success',  
        title: 'Sucesso!',
        description: 'Visitante cadastrado com sucesso.',        
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      handleClose()
      return
      
    } catch (error: any) {

      switch (error.response.status) {
        case 400: 
          toast({
            status: 'warning',
            title: 'Atenção!',
            description: 'Não existe nenhum vídeo gravado.',            
            duration: 10000,
            isClosable: true,
            position: 'bottom'
          })
        break

        case 401: 
          toast({
            status: 'warning',
            title: 'Atenção!',            
            description: 'E-mail já cadastrado.',            
            duration: 10000,
            isClosable: true,
            position: 'bottom'
          })
          setError('email', { message: 'E-mail já cadastrado'})          
        break

        case 500: 
          toast({
            status: 'error',
            title: 'Ocorreu um erro...',            
            description: error.response.data.message ?? 'Ocorreu um erro desconhecido',            
            duration: 10000,
            isClosable: true,
            position: 'bottom'
          })          
        break
        
        default: 
          toast({
            status: 'error',
            title: 'Ocorreu um erro...',            
            description: error.response.data.message ?? 'Ocorreu um erro desconhecido',            
            duration: 10000,
            isClosable: true,
            position: 'bottom'
          })          
      }

    }
    return
  }

  const handleSubmitErrors: SubmitErrorHandler<NewCustomerProps> = (error) => {    
    console.log('Event handler de erro', error)
  }

  const handleCancelFormSubmit = async () => {
    reset({}, { keepValues: true })    
    await queryClient.cancelMutations()
    .then(() => {
      toast({
        status: 'warning',        
        title: 'Atenção!',
        description: 'Ação interrompida pelo usuário.',        
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
    })     
  }  
  
  useEffect(() => {
    if(!isAuthorizingSendMail) {       
      setValue('email', customerToEdit?.email ?? '') 
      clearErrors('email')
      return
    }

  }, [isAuthorizingSendMail, setValue, clearErrors, customerToEdit])

  useEffect(() => {
    if(customerToEdit) {
      reset({
        name: customerToEdit.name,
        email: customerToEdit.email,
        authorizeSendMail: customerToEdit.authorizeSendMail,
        authorizeDisplayVideo: customerToEdit.authorizeDisplayVideo,
      })      
    }
    
  }, [customerToEdit, reset])

  useEffect(() => {
    if(isAuthorizingSendMail) {
      setFocus('email', { shouldSelect: true })
      return
    }    

  }, [isAuthorizingSendMail, setFocus])

  return (
    <VStack as="form" spacing={8} align="flex-start" onSubmit={handleSubmit(handleSubmitUser, handleSubmitErrors)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nome completo</FormLabel>
        <InputGroup size="lg">
          <InputLeftElement>
            <FiUser fontSize="20"/>
          </InputLeftElement>
          <Input 
            type="text"
            id="name"
            placeholder="João da Silva"
            autoComplete="none"
            isDisabled={isSubmitting}            
            _placeholder={{ fontStyle: 'italic' }}
            {...register('name')}
          />
        </InputGroup>
        { !!errors.name && 
          <FormErrorMessage>
            <FormErrorIcon />
            { errors.name.message }
          </FormErrorMessage>
        }
      </FormControl>

      <VStack spacing={2} w="100%" align="flex-start">
        <Checkbox colorScheme="whatsapp" {...register('authorizeSendMail')}>
          {isAuthorizingSendMail 
            ? 'Estou autorizando me enviar o vídeo no e-mail' 
            : 'Autorizo me enviar o vídeo por e-mail'
          }          
        </Checkbox>
        <FormControl isInvalid={!!errors.email}>
          <InputGroup size="lg" display={isAuthorizingSendMail ? 'block' : 'none'}>
            <InputLeftElement>
              <FiMail fontSize="20"/>
            </InputLeftElement>
            <Input
              id="email"              
              placeholder="contato@email.com.br"
              autoComplete="none"
              isDisabled={isSubmitting}
              _placeholder={{ fontStyle: 'italic' }}
              {...register('email')}
              />
          </InputGroup>
          { errors.email && (
            <FormErrorMessage>
              <FormErrorIcon />
              { errors.email.message }
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>

      <Checkbox colorScheme="whatsapp" {...register('authorizeDisplayVideo')}>
        {isAuthorizingSendVideo
          ? 'Estou autorizando a exibição do meu vídeo'          
          : 'Autorizo exibir o meu vídeo no evento'
        }
      </Checkbox>
            
      <ButtonGroup alignSelf="flex-end">
        <Button           
          variant="ghost" 
          colorScheme="whatsapp"          
          leftIcon={<FiX />}
          borderRadius="sm"
          onClick={isSubmitting ? handleCancelFormSubmit : handleClose}
        >
          {isSubmitting ? 'Cancelar' : 'Fechar'}
        </Button>
        <Button 
          type="submit" 
          colorScheme="whatsapp"
          isLoading={isSubmitting}
          leftIcon={<FiCheck />}
          loadingText="Enviando"
          borderRadius="sm"
        >
          {customerToEdit ? 'Salvar' : 'Cadastrar'}
        </Button>
      </ButtonGroup>
    </VStack>
  )
}
