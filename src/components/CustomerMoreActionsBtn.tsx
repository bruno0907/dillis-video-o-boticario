import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, useDisclosure, ButtonGroup } from "@chakra-ui/react"
import { FiMoreVertical, FiEdit } from "react-icons/fi"
import { CustomerProps } from "../types"
import { DeleteCustomerBtn } from "./DeleteCustomerBtn"

type CustomerMoreActionsBtnProps = {
  customer: CustomerProps;  
  handleCustomerToEdit: (customer: CustomerProps) => void
  handleOpenModal: () => void;
}

export const CustomerMoreActionsBtn = ({ customer, handleOpenModal, handleCustomerToEdit }: CustomerMoreActionsBtnProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleEditCustomer = ({ id, name, email, authorizeSendMail, authorizeDisplayVideo }: CustomerProps) => {
    handleCustomerToEdit({ id, name, email, authorizeSendMail, authorizeDisplayVideo })
    handleOpenModal()
    onClose()
  }

  return (
    <Popover
      placement="left-end"      
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose} 
    >
      <PopoverTrigger>
        <Button variant="link" _hover={{ color: 'green.500' }}>
          <FiMoreVertical fontSize="20" />
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="gray.800">
        <PopoverArrow bg="gray.800"/>
        <PopoverCloseButton top="2"/>                    
        <PopoverHeader fontWeight="medium" textAlign="left">Mais ações</PopoverHeader>
        <PopoverBody>          
          <ButtonGroup>
            <Button
              colorScheme="whatsapp"
              borderRadius="sm"
              onClick={() => handleEditCustomer(customer)}
              leftIcon={<FiEdit />}                          
            >
              Editar cadastro
            </Button>
            <DeleteCustomerBtn userId={customer.id} />
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}