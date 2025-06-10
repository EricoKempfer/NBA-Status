import { Box, Text, Separator, VStack, HStack, Badge, Icon, Portal } from "@chakra-ui/react";
import { GoDatabase } from "react-icons/go";
import { Spinner } from "@chakra-ui/react"
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button, CloseButton, Dialog } from "@chakra-ui/react"

export default function Teste({ tabelas, colunas, players }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (tableName) => {
    setSelectedTable(tableName);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedTable(null);
  };
  return (
    <HStack w="100%" h="100%" spacing={4} maxW="100%" overflow="hidden">
      <Box w="38%" minW="350px" maxW="38%" h="100%" p={6} boxShadow="sm" borderRadius="18px" bgColor="#202124" overflow="hidden">
        <HStack mb={4} spacing={3} alignItems="center">
          <GoDatabase color="#E3510F" size={"1.5em"} />
          <Text fontFamily="Poppins" fontSize="2xl" lineClamp={1} fontWeight="bold" >
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
                  cursor="pointer"
                  onClick={() => handleTableClick(tabela.name)}
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
                    transition="all 0.2s"
                    _hover={{ backgroundColor: "#E3510F", color: "white", transition: "all 0.2s" }}
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
      <VStack flex="1" maxW="62%" h="100%" overflow="hidden">
        <Box w="100%" h="auto" minH="0">
          <Box p={6} boxShadow="sm" borderRadius="18px" bgColor="#202124">
            <HStack w="100%" justifyContent={"center"} alignItems="center">
              <Separator variant="dotted" size="lg" flex="1" />
              <Text flexShrink="0" fontFamily="Poppins" fontSize="2xl" fontWeight="bold">Tecnologias Utilizadas</Text>
              <Separator variant="dotted" size="lg" flex="1" />
            </HStack>
            <Box mt={6} overflowX="auto" whiteSpace="nowrap" w="100%">
              <HStack spacing={6} mb="3" minW="max-content">
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
                  <Text fontSize="sm" color="white">Npm</Text>
                </VStack>
                <VStack as="span" minW="80px">
                  <Icon as={require('react-icons/fa').FaGithub} boxSize={10} color="white" />
                  <Text fontSize="sm" color="white">GitHub</Text>
                </VStack>
                
              </HStack>
            </Box>
          </Box>

        </Box>
        <Box w="100%" h="auto" minH="0">
          <Box p={6} boxShadow="sm" borderRadius="18px" bgColor="#202124" mt={4}>
            <HStack w="100%" justifyContent={"center"} alignItems="center">
              <Separator variant="dotted" size="lg" flex="1" />
              <Text flexShrink="0" fontFamily="Poppins" fontSize="2xl" fontWeight="bold">Estatísticas do Banco</Text>
              <Separator variant="dotted" size="lg" flex="1" />
            </HStack>
            <HStack mt={6} spacing={6} justifyContent="space-around" w="100%">
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="#E3510F">
                  {Array.isArray(tabelas) ? tabelas.length : 0}
                </Text>
                <Text fontSize="md" color="gray.300">
                  Tabelas
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="#E3510F">
                  {colunas ? Object.values(colunas).reduce((total, cols) => total + cols.length, 0) : 0}
                </Text>
                <Text fontSize="md" color="gray.300">
                  Colunas Totais
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="#E3510F">
                  NBA
                </Text>
                <Text fontSize="md" color="gray.300">
                  Dataset
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="#E3510F">
                  1946-2023
                </Text>
                <Text fontSize="md" color="gray.300">
                  Temporadas
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="#E3510F">
                  2.35GB
                </Text>
                <Text fontSize="md" color="gray.300">
                  Armazenamento
                </Text>
              </VStack>
            </HStack>
            <Box w="100%" mt={4} p={2} borderRadius="12px" bgColor="#151516" border="1px solid #4A90E2">
              <HStack spacing={3} justify="center">
                <Text fontSize="lg">🚀</Text>
                <Text color="white" fontWeight="bold" fontSize="md">
                  Status: Sistema Online
                </Text>
                <Text color="green.400" fontSize="sm">
                  ● Conectado ao banco Turso
                </Text>
              </HStack>
            </Box>
            <Box mt={4} p={4} borderRadius="12px" bgColor="#151516" border="1px solid #E3510F">
              <Text fontSize="sm" color="gray.400" textAlign="center">
                <Text as="span" color="white" fontWeight="bold">Dica:</Text> Clique em qualquer tabela à esquerda para visualizar suas colunas e dados de exemplo
              </Text>
            </Box>
          </Box>
        </Box>
      </VStack>


      {/* Dialog para mostrar colunas da tabela */}
      <Dialog.Root placement={"center"} open={isOpen} onOpenChange={(details) => details.open ? null : onClose()} size="lg">
        <Portal >
          <Dialog.Backdrop />
          <Dialog.Positioner >
            <Dialog.Content bgColor="#202124" borderColor="#E3510F">
              <Dialog.Header>
                <Dialog.Title color="white" fontFamily="Poppins">
                  Colunas da Tabela: {selectedTable}
                </Dialog.Title>
                <Dialog.CloseTrigger color="white" />
              </Dialog.Header>
              <Dialog.Body>
                {selectedTable && colunas && colunas[selectedTable] ? (
                  <VStack align="start" spacing={3} w="100%">
                    {colunas[selectedTable].map((column, idx) => (
                      <Box
                        key={idx}
                        w="100%"
                        p={3}
                        borderRadius="8px"
                        bgColor="#151516"
                        border="1px solid #E3510F"
                      >
                        <HStack justify="space-between" w="100%">
                          <Text color="white" fontWeight="bold" fontSize="lg">
                            {column.name}
                          </Text>
                          <Badge colorScheme="blue" fontSize="sm">
                            {column.type}
                          </Badge>
                        </HStack>
                        {column.sampleData && column.sampleData.length > 0 && (
                          <Box mt={2}>
                            <Text color="gray.400" fontSize="sm" mb={1}>
                              Dados de exemplo:
                            </Text>
                            {column.sampleData.map((sample, sampleIdx) => (
                              <Text key={sampleIdx} color="gray.300" fontSize="sm">
                                • {sample !== null ? String(sample) : 'null'}
                              </Text>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text color="white">Nenhuma coluna encontrada para esta tabela.</Text>
                )}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>


    </HStack>
  );
}