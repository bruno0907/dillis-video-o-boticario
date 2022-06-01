
import { QueryClientProvider } from "react-query";
import { Routes } from "../Routes";
import { startMirage } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Box, Flex, Image } from "@chakra-ui/react";

import bg from '../assets/background.png'
import bonfire from '../assets/fogueira.png'

process.env.NODE_ENV === 'development' && startMirage()

export const App = () => {    
  return (   
    <QueryClientProvider client={queryClient}>
      <Box bgImage={bg} bgPos="top" bgAttachment="fixed" bgSize="cover" position="relative">                
        <Flex flexDir="column" w="100%" h="100vh" align="center" overflowY="auto" p="8">
          <Routes />
          <ReactQueryDevtools />
        </Flex>
        <Image src={bonfire} position="absolute" bottom="0" left="0" />
      </Box>
    </QueryClientProvider> 
  )
}
