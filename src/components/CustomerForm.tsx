import { useEffect } from "react";
import * as yup from 'yup';

import { 
  Button, 
  ButtonGroup, 
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

import { FiUser, FiMail, FiPhone, FiCheck, FiX } from "react-icons/fi";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { masked } from "../utils/masked";
import { CustomerProps, NewCustomerProps } from "../types";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";

const customerSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório')
    .min(5, 'O nome deve conter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  email: yup.string().email('Você deve informar um formato de e-mail válido').required('O e-mail é obrigatório'),  
  phone: yup.string().trim(),
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
    formState: { errors, isSubmitting } 
  } = useForm<NewCustomerProps>({
    resolver: yupResolver(customerSchema)
  })  
  
  const sanitizePhone = (str: string) => str.replace(/[^0-9]/g, '')

  const handleSubmitUser: SubmitHandler<NewCustomerProps> = async values => {
    const { email, name, phone } = values

    try {
      if(customerToEdit) {
        await updateCustomer.mutateAsync({
          ...customerToEdit,
          name,
          email,
          phone: sanitizePhone(phone)
        })    
        handleCustomerToEdit(null)
        toast({
          status: 'success',          
          title: 'Sucesso!',
          description: 'Usuário atualizado com sucesso',
          position: 'top-right',
          duration: 3000
        })
        handleClose()
        return
      }

      await createCustomer.mutateAsync({
        name,
        email,
        phone: sanitizePhone(phone)
      })
      toast({
        status: 'success',
        title: 'Sucesso!',
        description: 'Usuário cadastrado com sucesso',
        position: 'top-right',
        duration: 3000
      })
      handleClose()
      return
      
    } catch (error) {      
      toast({
        status: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro com a sua solicitação',
        position: 'top-right',
        duration: 5000
      })
      handleClose()
    }
    return

  }

  const handleSubmitErrors: SubmitErrorHandler<NewCustomerProps> = (error) => {    
    console.log('Event handler de erro', error)
  }

  useEffect(() => {
    if(customerToEdit) {
      reset({
        name: customerToEdit.name,
        email: customerToEdit.email,
        phone: customerToEdit.phone
      })
    }
    
  }, [customerToEdit, reset])    

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit(handleSubmitUser, handleSubmitErrors)}>
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
      <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">E-mail</FormLabel>
        <InputGroup size="lg">
          <InputLeftElement>
            <FiMail fontSize="20"/>
          </InputLeftElement>
          <Input
            id="email"
            type="email"
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
      <FormControl isInvalid={!!errors.phone}>
      <FormLabel htmlFor="phone">Whatsappp</FormLabel>
        <InputGroup mb="4" size="lg">
          <InputLeftElement>
            <FiPhone fontSize="20"/>
          </InputLeftElement>
          <Input
            id="phone"
            type="tel"
            placeholder="99 9999-9999"
            autoComplete="none"            
            isDisabled={isSubmitting}
            _placeholder={{ fontStyle: 'italic' }}
            {...register('phone')}
            onChange={e => e.target.value = masked(e.target.value, 'mobile')}
          />
        </InputGroup>
        { !!errors.phone && (
          <FormErrorMessage>
            <FormErrorIcon />
            { errors.phone.message }
          </FormErrorMessage>
        ) }
      </FormControl>
      <ButtonGroup alignSelf="flex-end">
        <Button 
          type="reset" 
          variant="ghost" 
          colorScheme="whatsapp"
          isDisabled={isSubmitting} 
          leftIcon={<FiX />}
          onClick={handleClose}
        >Cancelar</Button>
        <Button 
          type="submit" 
          colorScheme="whatsapp"
          isLoading={isSubmitting}
          leftIcon={<FiCheck />}
          loadingText="Enviando"
        >
          {customerToEdit ? 'Salvar' : 'Cadastrar'}
        </Button>
      </ButtonGroup>
    </VStack>
  )
}
