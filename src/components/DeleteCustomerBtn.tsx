import { 
  Popover,  
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  useDisclosure,
  useToast,   
} from "@chakra-ui/react"
import { truncate } from "fs";

import { FiX } from "react-icons/fi"

import { useDeleteCustomer } from "../hooks/useDeleteCustomer"

type DeleteCustomerBtnProps = {
  userId: string;
}

export const DeleteCustomerBtn = ({ userId }: DeleteCustomerBtnProps) => {
  const popOver = useDisclosure()
  const toast = useToast()

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
    <Popover
      placement="bottom-end"
      isOpen={popOver.isOpen}
      onOpen={popOver.onOpen}
      onClose={popOver.onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          variant="link"          
          isDisabled={isLoading}
          _hover={{ color: 'green.500' }}
        >
          <FiX fontSize="20" />
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="gray.800" p="2">
        <PopoverArrow bg="gray.800"/>
        <PopoverCloseButton isDisabled={isLoading} top="2"/>
        <PopoverHeader fontWeight="medium" textAlign="left">Confirmação!</PopoverHeader>
        <PopoverBody textAlign="start">
          Você tem certeza que deseja 
          <br/>
          excluir esse registro?          
        </PopoverBody>
        <ButtonGroup spacing="2" display="flex" justifyContent="flex-end" p="4">
          <Button 
            colorScheme="whatsapp"
            isDisabled={isLoading}             
            onClick={popOver.onClose}
          >
            Não
          </Button>
          <Button 
            colorScheme="whatsapp" 
            variant="ghost"
            isLoading={isLoading}             
            onClick={() => handleDeleteUser(userId)}
            >
              Sim
            </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  )
}