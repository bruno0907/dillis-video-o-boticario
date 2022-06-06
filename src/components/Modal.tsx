import { ReactNode } from "react";

import { 
  Modal as ChakraModal, 
  ModalProps as ChakraModalProps,
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody  
} from "@chakra-ui/react";

type ModalProps = ChakraModalProps & {
  children: ReactNode;
  label: string;
}

export const Modal = ({ isOpen, onClose, label, children, ...modal}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false} { ...modal }>
      <ModalOverlay />
      <ModalContent bgColor="gray.800" borderRadius="md" boxShadow="sm">
        <ModalHeader>{label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px="8" pb="8">
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}