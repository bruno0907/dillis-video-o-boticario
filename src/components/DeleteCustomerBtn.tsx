import { useRef } from "react";

import {
  Button,  
  ButtonGroup,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,   
} from "@chakra-ui/react"

import { FiCheck, FiX } from "react-icons/fi"

import { useDeleteCustomer } from "../hooks/useDeleteCustomer"

type DeleteCustomerBtnProps = {
  userId: string;
}

export const DeleteCustomerBtn = ({ userId }: DeleteCustomerBtnProps) => {
  const alert = useDisclosure()
  const toast = useToast()

  const cancelRef = useRef<HTMLButtonElement>(null)

  const { isLoading, mutateAsync } = useDeleteCustomer()

  const handleDeleteUser = async (userId: string) => {
    try {
      await mutateAsync(userId)
      toast({
        status: 'success',
        title: 'Sucesso!',        
        description: 'Cadastro excluído com sucesso.',
        duration: 5000,
        position: 'bottom',
        isClosable: true     
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro...',        
        description: 'Não foi possível excluir o cadastro.',
        duration: 10000,
        position: 'bottom', 
        isClosable: true       
      })
    }
  }

  return (    
    <>
      <Button
        variant="ghost"   
        colorScheme="whatsapp"       
        isDisabled={isLoading}
        borderRadius="sm"
        leftIcon={<FiX/>}
        onClick={alert.onOpen}          
      >          
        Excluir
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={alert.onClose}
        isOpen={alert.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bgColor="gray.800">
          <AlertDialogHeader>Excluir visitante?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Você tem certeza de que deseja excluir o cadastro deste visitante.
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button 
                ref={cancelRef} 
                onClick={alert.onClose} 
                colorScheme="whatsapp"
                leftIcon={<FiX />}
                borderRadius="sm"
              >
                Cancelar
              </Button>
              <Button 
                colorScheme='whatsapp' 
                variant="ghost" 
                onClick={() => handleDeleteUser(userId)} 
                isLoading={isLoading}
                leftIcon={<FiCheck />}
                borderRadius="sm"
              >
                Excluir cadastro
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}