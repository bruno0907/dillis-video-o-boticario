import { Tbody, Tr, Td, Button, useToast } from "@chakra-ui/react"
import { FiEdit, FiSend } from "react-icons/fi"
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
        title: 'E-mail enviado!',
        description: 'O e-mail foi enviado com sucesso.',
        duration: 3000,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Um erro ocorreu...',
        description: 'Não foi possível enviar o e-mail',
        duration: 5000,
        position: 'top-right'
      })
    }
  }
  
  return (
    <Tbody>
      {customers!.map(customer => (
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