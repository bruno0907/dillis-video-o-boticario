import { Tbody, Tr, Td, Button, useToast, Text, HStack } from "@chakra-ui/react"
import { FiAlertTriangle, FiEdit, FiSend } from "react-icons/fi"
import { DeleteCustomerBtn } from "./DeleteCustomerBtn"
import { CustomerProps } from '../types'
import { sendMail } from "../services/email/sendMail"

type CustomersListProps = {
  customers: CustomerProps[] | undefined;
  handleCustomerToEdit: (customer: CustomerProps) => void
  handleOpenModal: () => void;
}

export const CustomersList = ({ customers, handleCustomerToEdit, handleOpenModal }: CustomersListProps) => {
  const toast = useToast()

  const handleEditCustomer = ({ id, name, email, phone }: CustomerProps) => {
    handleCustomerToEdit({ id, name, email, phone })
    handleOpenModal()
  }

  const handleSendMail = async (id: string) => {
    try {
      await sendMail(id)
      toast({
        status: 'success',
        title: 'Sucesso!',        
        description: 'O e-mail foi enviado com sucesso.',
        duration: 5000,        
        isClosable: true,
        position: 'bottom'
      })
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro...',        
        description: 'Não foi possível enviar o e-mail',
        duration: 10000,        
        isClosable: true,
        position: 'bottom'
      })      
    }
  }
  
  return (
    <Tbody>
      {!customers?.length ? (
        <Tr>
          <HStack spacing={3} p="3">
            <FiAlertTriangle />
            <Text color="gray.400" display="flex">Nenhum visitante encontrado</Text>
          </HStack>
        </Tr>
      ) : customers!.map(customer => (
        <Tr key={customer.id}>
          <Td>{customer.name}</Td>
          <Td>{customer.email}</Td>
          <Td>{customer.phone}</Td>
          <Td textAlign="center">
            <Button
              variant="link"
              onClick={() => handleEditCustomer(customer)}
              _hover={{ color: 'green.500' }}
            >
              <FiEdit fontSize="20" />
            </Button>
          </Td>
          <Td textAlign="center">
            <Button
              variant="link"
              onClick={() => handleSendMail(customer.id)}
              _hover={{ color: 'green.500' }}
            >
              <FiSend fontSize="20" />
            </Button>
          </Td>
          <Td textAlign="center">
            <DeleteCustomerBtn userId={customer.id} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  )
}