import { ChangeEvent } from "react";

import { 
  ButtonGroup, 
  Popover, 
  PopoverTrigger, 
  Button, 
  PopoverContent, 
  PopoverArrow, 
  PopoverHeader, 
  PopoverCloseButton, 
  PopoverBody, 
  VStack, 
  Select, 
  InputGroup, 
  InputLeftElement, 
  Input
} from "@chakra-ui/react"

import { FiFilter, FiSearch, FiX } from "react-icons/fi"

type CustomerFilterProps = {
  isSearching: boolean;
  searchBy: string;
  handleSearchBy: (value: string) => void;
  searchValue: string;
  handleSearchValue: (value: string) => void
  handleRefetching: () => void
}

export const CustomerFilter = ({
  isSearching,
  searchBy,
  handleSearchBy,
  searchValue,
  handleSearchValue,
  handleRefetching
}: CustomerFilterProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => handleSearchValue(event.target.value)

  const handleClearSearch = () => {
    handleSearchValue('')
    handleRefetching()
  }

  return (
    <ButtonGroup spacing={4} alignSelf="flex-end">
      <Popover placement="left-end">
        <PopoverTrigger>
          <Button colorScheme="whatsapp" leftIcon={<FiFilter />} variant="link">Procurar visitante</Button>
        </PopoverTrigger>
        <PopoverContent bg="gray.800" p="2" borderRadius="sm">
          <PopoverArrow bg="gray.800" />
          <PopoverHeader fontWeight="medium">Procurar visitante</PopoverHeader>
          <PopoverCloseButton top="2" />
          <PopoverBody display="flex" flexDir="column">
            <VStack spacing={4} alignItems="center" justifyContent="space-between" py="4">
              <Select
                name="searchBy"
                defaultValue="defaultValue"
                isDisabled={isSearching}
                size="lg"
                borderRadius="sm"
                onChange={e => handleSearchBy(e.target.value)}
              >
                <option value="defaultValue" style={{ color: '#0b0c11' }} hidden>Procurar por...</option>
                <option value="name" style={{ color: '#0b0c11' }}>Procurar por nome</option>
                <option value="email" style={{ color: '#0b0c11' }}>Procurar por e-mail</option>
              </Select>              
              <InputGroup>
                <InputLeftElement mt="1">
                  <FiSearch />
                </InputLeftElement>
                <Input
                  name="searchValue"
                  value={searchValue}                  
                  isDisabled={!searchBy || isSearching}
                  size="lg"        
                  borderRadius="sm"          
                  onChange={handleSearch}
                />
              </InputGroup>              
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button        
        colorScheme="whatsapp"        
        leftIcon={<FiX />}
        variant="link"
        onClick={handleClearSearch}
      >
        Limpar procura
      </Button>
    </ButtonGroup>
  )
}