import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#193157',
        color: '#F7F7F8',
        fontSize: '16px',        
      },      
    },      
  },
  fonts: {
    heading: 'Libre Franklin',
    body: 'Libre Franklin'
  }
})