import { HStack, Button, Text, TableCaption } from "@chakra-ui/react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

type PaginationProps = {
  page?: number | null;
  setPage: (page: number) => void
  perPage?: number | null;
  totalCount: number
}

export const Pagination = ({ page, setPage, totalCount, perPage }: PaginationProps) => {

  if(!page || !perPage) return null

  const handleNextPage = () => {    
    if(page < totalCount) {      
      setPage(page + 1)
    }    
  }
  
  const handlePreviousPage = () => {
    if(page !== 1) {
      setPage(page - 1)
    }
  }  

  return !perPage ? null : (
    <TableCaption>
      <HStack w="100%" justify="space-between" align="center">
        <Button
          onClick={handlePreviousPage}
          isDisabled={page === 1}
          colorScheme="whatsapp"
          variant="link"
          leftIcon={<FiArrowLeft fontSize="20" />}
        >Página anterior</Button>
        <Text>
          Página <strong>{page}</strong>  de <strong>{Math.ceil(totalCount / perPage)}</strong>
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page === Math.ceil(totalCount / perPage)}
          colorScheme="whatsapp"
          variant="link"
          rightIcon={<FiArrowRight fontSize="20" />}
        >Próxima página</Button>
      </HStack>      
    </TableCaption>
  )  
}