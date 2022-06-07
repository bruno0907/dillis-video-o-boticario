import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  VStack,
  Heading,     
  Button,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  Spinner,  
  TableContainer,    
  ButtonGroup,
} from "@chakra-ui/react"

import {  
  FiArrowLeft,  
  FiRotateCcw,
  FiPlus,    
} from "react-icons/fi"

import { Modal } from "../components/Modal"
import { CustomerForm } from "../components/CustomerForm"
import { useCustomers } from "../hooks/useCustomers"
import { CustomerProps } from "../types"
import { Pagination } from "../components/Pagination"
import { useCustomersFilter } from "../hooks/useCustomersFilter"
import { CustomerFilter } from "../components/CustomerFilter"
import { CustomersList } from "../components/CustomersList"
import { Logo } from "../components/Logo"

export const Customers = () => {
  const navigate = useNavigate()  
  const { isOpen, onOpen, onClose } = useDisclosure()  

  const [customer, setCustomer] = useState<CustomerProps | null>(null)
  const [page, setPage] = useState(1)
  const [searchBy, setSearchBy] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const perPage = Number(process.env.REACT_APP_PER_PAGE) || null

  const costumersFilter = useCustomersFilter({ searchBy, searchValue }, 500)

  const { data, isLoading, isError, isFetching, refetch } = useCustomers(
    page,
    perPage,
    costumersFilter?.searchBy,
    costumersFilter?.searchValue
  )

  const handleClose = () => {
    setCustomer(null)
    onClose()
  }

  if(isLoading) {
    return (
      <VStack spacing={24} w="100%" maxW="7xl" align="center">                
        <Logo />
        <HStack spacing={4} align="center">
          <Spinner size="lg" />
          <Text>carregando...</Text>
        </HStack>
      </VStack>
    )
  }

  if(isError) {
    return (
      <VStack spacing={24} w="100%" maxW="7xl" align="center">                
        <Logo />        
        <Heading size="lg">Ocorreu um erro ao carregar a lista de visitantes</Heading>
        <ButtonGroup spacing={4}>
          <Button 
            colorScheme="whatsapp"             
            onClick={() => navigate('/')}
            leftIcon={<FiArrowLeft />}
            borderRadius="sm"
          >Voltar</Button>
          <Button 
            colorScheme="whatsapp" 
            onClick={() => navigate(0)}
            leftIcon={<FiRotateCcw />}
            borderRadius="sm"
          >Recarregar</Button>
        </ButtonGroup>
      </VStack>
    )
  }

  return (
    <VStack spacing={8} w="100%" maxW="7xl">
      <HStack w="100%" spacing={8} align="center" justify="space-between">
        <IconButton
          aria-label="voltar"
          variant="ghost"
          onClick={() => navigate('/')}
          borderRadius="sm"
          _hover={{ bg: 'green.500' }}
        >
          <FiArrowLeft fontSize="24" />
        </IconButton>        
        <Logo />
        <Button 
          colorScheme="whatsapp" 
          onClick={onOpen} 
          leftIcon={<FiPlus />}
          borderRadius="sm"
        >Novo visitante</Button>
      </HStack>
      <>        
        <TableContainer display="flex" bgColor="#000a1f96" flexDir="column" width="100%" p="8" gap="8" borderRadius="md" boxShadow="sm">
          <CustomerFilter 
            isSearching={isFetching}
            searchBy={searchBy}
            handleSearchBy={setSearchBy}
            searchValue={searchValue}
            handleSearchValue={setSearchValue}
            handleRefetching={refetch}
          />
          
          <CustomersList 
            customers={data?.customers}
            handleCustomerToEdit={setCustomer}
            handleOpenModal={onOpen}
            isFetching={isFetching}
          >
            <Pagination
              page={page}                  
              setPage={setPage}
              perPage={perPage}
              totalCount={data!.totalCount}
            />
          </CustomersList>
          
        </TableContainer>        
      </>      
      <Modal label={!customer ? 'Novo visitante' : 'Editar visitante'} isOpen={isOpen} onClose={handleClose}>
        <CustomerForm customerToEdit={customer ?? null} handleCustomerToEdit={setCustomer} handleClose={handleClose} />
      </Modal>
    </VStack>
  )
}
