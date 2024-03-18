import { Button, Center, ChakraProvider, Code, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export const ErrorScreen: React.FC<TObject> = ({ error, resetError  }) => (
  <ChakraProvider>
    <Center height='100vh'>
      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        p={ 8 }
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
        bg='white'
        maxW='600px'
        mx='auto'
        w='full'
      >
        <Heading color='red.500'>Error</Heading>
        <Text mt={ 2 } color='gray.600'>
          Page Not Found
        </Text>
        <Code mt={ 2 } color='red.500' fontSize='sm'>
          { error?.toString() }
        </Code>
        <Button
          mt={ 4 }
          colorScheme='blue'
          onClick={ resetError }
          _hover={ { bg: 'blue.600' } }
        >
          Try Again
        </Button>
      </Flex>
    </Center>
  </ChakraProvider>
);
