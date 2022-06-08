import { 
  Tbody, 
  Tr, 
  Td, 
  Button, 
  useToast, 
  Text, 
  HStack, 
  Tooltip, 
  Center, 
  Spinner, 
  Table, 
  Th, 
  Thead, 
  TableContainer, 
  Badge 
} from "@chakra-ui/react"

import { FiAlertTriangle, FiEdit2, FiMail, FiSend, FiSlash, FiUser, } from "react-icons/fi"
import { BiCameraMovie } from "react-icons/bi"

import { CustomerProps } from '../types'
import { sendMail } from "../services/email/sendMail"
import { ReactNode } from "react"
import { CustomerMoreActionsBtn } from "./CustomerMoreActionsBtn"

type CustomersListProps = {
  customers: CustomerProps[] | undefined;
  handleCustomerToEdit: (customer: CustomerProps) => void
  handleOpenModal: () => void;
  isFetching: boolean,
  children: ReactNode;
}

export const CustomersList = ({ customers, handleCustomerToEdit, handleOpenModal, isFetching, children }: CustomersListProps) => {
  const toast = useToast()

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
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th w="50%">
              <HStack align="center">
                <FiUser fontSize="20" />
                <Text>Nome completo</Text>
                {isFetching && <Spinner size="xs" ml="2" />}
              </HStack>
            </Th>
            <Th w="50%">
              <HStack>
                <FiMail fontSize="20" />
                <Text>E-mail</Text>
              </HStack>
            </Th>
            <Th textAlign="center">
              <HStack>
                <BiCameraMovie fontSize="20" />
                <Text>Em exibição</Text>
              </HStack>              
            </Th>
            <Th textAlign="center">
              <HStack>
                <FiSend fontSize="20" />
                <Text>Enviar E-mail</Text>
              </HStack>              
            </Th>
            <Th textAlign="center">
              <HStack>
                <FiEdit2 fontSize="20" />
                <Text>Ações</Text>
              </HStack>
              
            </Th>            
          </Tr>
        </Thead>
        <Tbody>
          {!customers?.length ? (
            <Tr>
              <Td colSpan={5}>
                <HStack spacing={3} p="3">
                  <FiAlertTriangle />
                  <Text color="gray.400" display="flex">Nenhum visitante encontrado</Text>
                </HStack>
              </Td>
            </Tr>
          ) : customers!.map(customer => (
            <Tr key={customer.id}>
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>

              <Td textAlign="center">
                {customer.authorizeDisplayVideo ? (
                  <Badge variant="solid" colorScheme="whatsapp" py="1" px="3">Sim</Badge>                
                ) : (
                  <Badge variant="solid" colorScheme="red" py="1" px="3">Não</Badge>
                )}
              </Td>

              <Td textAlign="center">
                {customer.authorizeSendMail ? (
                  <Button
                    variant="link"                
                    onClick={() => handleSendMail(customer.id)}              
                    _hover={{ color: 'green.500' }}
                  >
                    <FiSend fontSize="20" />
                  </Button>
                ) : (
                  <Tooltip label='Envio de e-mail não autorizado'>
                    <Center _hover={{ cursor: 'not-allowed' }}>
                      <FiSlash fontSize="20" color="#979a9c"/>
                    </Center>
                  </Tooltip>
                )}
              </Td>

              <Td textAlign="center">
                <CustomerMoreActionsBtn 
                  customer={customer}
                  handleCustomerToEdit={handleCustomerToEdit}
                  handleOpenModal={handleOpenModal}
                />
              </Td>              
            </Tr>
          ))}
        </Tbody>
        {children}
      </Table>
    </TableContainer>
  )
}