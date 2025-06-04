import { Box, Text, Separator, VStack, HStack, Badge, Icon } from "@chakra-ui/react";
import { GoDatabase } from "react-icons/go";
import { Spinner } from "@chakra-ui/react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Teste({ tabelas }) {
  return (
    <HStack w="100%" h="100%">
      <Box w="40%" h="100%" p={6} boxShadow="lg" borderRadius="18px" bgColor="#202124" >
        <HStack mb={4} spacing={3} alignItems="center">
          <GoDatabase color="#E3510F" size={"1.5em"} />
          <Text fontFamily="Poppins" fontSize="2xl" fontWeight="bold" >
            Tabelas do Banco de Dados
          </Text>
        </HStack>
        <Box w="100%" maxH="65vh" overflowY="scroll" pr={2}>
          <VStack align="start" spacing={2} w="100%">
            {Array.isArray(tabelas) && tabelas.length > 0 ? (
              tabelas.map((tabela, idx) => (
                <Box
                  key={idx}
                  w="100%"
                  borderRadius="12px"
                  boxShadow="sm"
                  display="flex"

                  alignItems="center"
                  gap={2}
                  justifyContent="center"
                >
                  <Badge
                    colorScheme="orange"
                    fontSize="16px"
                    px={6}
                    py={2}
                    borderRadius="8px"
                    fontWeight="bold"
                    w="100%"
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {tabela.name}
                  </Badge>
                </Box>
              ))
            ) : (
              <VStack >
                <Spinner color="#202124" />
                <Text color="#202124">Loading...</Text>
              </VStack>
            )}
          </VStack>
        </Box>
      </Box>
      <VStack w="60%" h="100%"  >
        <Box maxW={"100%"} ml="5%" h="100%" >
          <Box p={6} boxShadow="lg" borderRadius="18px" bgColor="#202124">
            <HStack w="100%" justifyContent={"center"} alignItems="center">
              <Separator variant="dotted" size="lg" flex="1" />
              <Text flexShrink="0" fontFamily="Poppins" fontSize="2xl" fontWeight="bold">Tecnologias Utilizadas</Text>
              <Separator variant="dotted" size="lg" flex="1" />
            </HStack>
            <Box mt={6} overflowX="auto" whiteSpace="nowrap" w="100%">
              <HStack maxW={"50%"} w="10vh" spacing={6} minW="max-content">
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/fa').FaReact} boxSize={10} color="#61DAFB" />
                  <Text fontSize="sm" color="white">React</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiNextdotjs} boxSize={10} color="white" />
                  <Text fontSize="sm" color="white">Next.js</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiChakraui} boxSize={10} color="#61C3A8" />
                  <Text fontSize="sm" color="white">Chakra UI</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiJavascript} boxSize={10} color="#F7DF1E" />
                  <Text fontSize="sm" color="white">JavaScript</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiTypescript} boxSize={10} color="#3178C6" />
                  <Text fontSize="sm" color="white">TypeScript</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiVercel} boxSize={10} color="white" />
                  <Text fontSize="sm" color="white">Vercel</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiSqlite} boxSize={10} color="#003B57" />
                  <Text fontSize="sm" color="white">SQLite</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiTurso} boxSize={10} color="#00B4B6" />
                  <Text fontSize="sm" color="white">Turso</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/fa').FaNpm} boxSize={10} color="#CB3837" />
                  <Text fontSize="sm" color="white">npm</Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

        </Box>
        <Box maxW={"100%"} ml="5%" h="100%" >
          {/* <Box p={6} boxShadow="lg" borderRadius="18px" bgColor="#202124">
            <HStack w="100%" justifyContent={"center"} alignItems="center">
              <Separator variant="dotted" size="lg" flex="1" />
              <Text flexShrink="0" fontFamily="Poppins" fontSize="2xl" fontWeight="bold">Tecnologias Utilizadas</Text>
              <Separator variant="dotted" size="lg" flex="1" />
            </HStack>
            <HStack mt={6} overflowX="auto" whiteSpace="nowrap" w="100%">
              <HStack maxW={"50%"} w="10vh" spacing={6} minW="max-content">
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/fa').FaReact} boxSize={10} color="#61DAFB" />
                  <Text fontSize="sm" color="white">React</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiNextdotjs} boxSize={10} color="white" />
                  <Text fontSize="sm" color="white">Next.js</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiChakraui} boxSize={10} color="#61C3A8" />
                  <Text fontSize="sm" color="white">Chakra UI</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiJavascript} boxSize={10} color="#F7DF1E" />
                  <Text fontSize="sm" color="white">JavaScript</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiTypescript} boxSize={10} color="#3178C6" />
                  <Text fontSize="sm" color="white">TypeScript</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiVercel} boxSize={10} color="white" />
                  <Text fontSize="sm" color="white">Vercel</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiSqlite} boxSize={10} color="#003B57" />
                  <Text fontSize="sm" color="white">SQLite</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/si').SiTurso} boxSize={10} color="#00B4B6" />
                  <Text fontSize="sm" color="white">Turso</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/fa').FaNpm} boxSize={10} color="#CB3837" />
                  <Text fontSize="sm" color="white">npm</Text>
                </VStack>
              </HStack>
            </HStack>
          </Box> */}

        </Box>
      </VStack>
    </HStack>
  );
}