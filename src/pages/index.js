import { Box, HStack, Text, Image, Separator, VStack, Dialog, Badge, Grid, GridItem } from '@chakra-ui/react';
import { useState } from "react";
import "@fontsource/poppins/700.css";
import { PiCourtBasketball } from "react-icons/pi";
import { TbPlayBasketball } from "react-icons/tb";
import { Input, InputGroup } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { GoDatabase } from "react-icons/go";
import { FaLaptopCode } from "react-icons/fa";
import { GiBasketballJersey } from "react-icons/gi";
import { GiBasketballBasket } from "react-icons/gi";
import { MdDataObject } from "react-icons/md";
import Teste from "../components/Teste";
import PlayerAnalytics from "../components/PlayerAnalytics";
import { useEffect } from "react";
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useRef } from "react"
import { fetchStaticData } from '../lib/data';

export async function getStaticProps() {
  const data = await fetchStaticData();
  
  return {
    props: data
  };
}

export default function Home({ staticTables, staticColumns, staticPlayers }) {
  const [step, setStep] = useState(0);
  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    console.log("Dados atualizados TABELA 2222222222:", staticTables);
    console.log("COLUNAS 1232:", staticColumns);
    console.log("PLAYERS:", staticPlayers);
  }, [staticTables, staticColumns, staticPlayers]);

  const contentRef = useRef(null);

  const { startsWith } = useFilter({ sensitivity: "base" });

  const { collection, filter, reset } = useListCollection({
    initialItems: staticPlayers,
    filter: startsWith,
    limit: 8,
  });

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setIsPlayerDialogOpen(true);
  };


  const closePlayerDialog = () => {
    setIsPlayerDialogOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <Box w="100%" h="100vh" bgColor={"#151516"}  pl="5%" pr="5%" >
      <HStack w="100%" h="6vh" pt="1%"  justifyContent={"space-between"} >
        <HStack >
          <Image src="/1.png" alt="Logo" h="30px" />
          <Text fontFamily={"Poppins"} fontSize={"20px"} fontWeight={"bold"} >
            NBA Status
          </Text>
        </HStack>

        <Combobox.Root
          collection={collection}
          onInputValueChange={(e) => filter(e.inputValue)}
          openOnClick
          width="70%"
        >
          <Combobox.Control >
            <InputGroup startElement={<FaSearch />}>
          <Combobox.Input placeholder="Pesquise jogadores..." />
        </InputGroup>
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger color="#E3510F" />
              <Combobox.Trigger onClick={reset} />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content ref={contentRef}>
                {collection.items.map((item) => (
                  <Combobox.Item key={item.value} item={item} onClick={() => handlePlayerSelect(item)}>
                    <Combobox.ItemText truncate>
                      {item.label}
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>

        <HStack
          cursor={"pointer"}
          pl="4" pt="2" pb="2" pr="4" borderRadius={"50px"} bgColor={"#202124"} >
          Login
          <FaRegUserCircle size="1.1em" />
        </HStack>
      </HStack>
      <HStack w="100%" h="94vh" pb="2%" alignItems={"center"} justify={"start"} >
        <VStack>
          <Box boxShadow={"sm"} w="auto" display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="4" pb="4" bgColor={"#202124"} >
            <HStack gap="4" onClick={() => setStep(0)} cursor="pointer">
              <FaHome size={"1.5em"} color={step === 0 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 0 ? "#E3510F" : undefined}>
                Home
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" onClick={() => setStep(1)} cursor="pointer">
              <PiCourtBasketball size={"1.5em"} color={step === 1 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 1 ? "#E3510F" : undefined}>
                Quadra
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" onClick={() => setStep(2)} cursor="pointer">
              <TbPlayBasketball size={"1.5em"} color={step === 2 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 2 ? "#E3510F" : undefined}>
                Jogadores
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" onClick={() => setStep(3)} cursor="pointer">
              <GiBasketballJersey size={"1.5em"} color={step === 3 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 3 ? "#E3510F" : undefined}>
                Draft
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" onClick={() => setStep(4)} cursor="pointer">
              <RiTeamLine size={"1.5em"} color={step === 4 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 4 ? "#E3510F" : undefined}>
                Equipes
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" onClick={() => setStep(5)} cursor="pointer">
              <GiBasketballBasket size={"1.5em"} color={step === 5 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 5 ? "#E3510F" : undefined}>
                Jogos
              </Text>
            </HStack>
          </Box>
          <Box w="auto" boxShadow={"sm"} display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="4" pb="4" bgColor={"#202124"} mt={"2"}>
            <HStack gap="4" cursor="pointer" onClick={() => window.open('https://github.com/EricoKempfer/NBA-Status', '_blank')}>
              <FaLaptopCode size={"1.5em"} color={step === 6 ? "#E3510F" : undefined} />
              <Text lineClamp={1} fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 6 ? "#E3510F" : undefined}>
                Front-End
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" cursor="pointer" onClick={() => window.open('https://github.com/EricoKempfer/NBA-Status/blob/main/src/lib/data.js', '_blank')}>
              <FaCode size={"1.5em"} color={step === 7 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 7 ? "#E3510F" : undefined}>
                API
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" cursor="pointer" onClick={() => window.open('https://turso.tech/', '_blank')}>
              <GoDatabase size={"1.5em"} color={step === 8 ? "#E3510F" : undefined} />
              <Text lineClamp={1} fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 8 ? "#E3510F" : undefined}>
                Banco de Dados
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4" cursor="pointer" onClick={() => window.open('https://www.kaggle.com/datasets/wyattowalsh/basketball', '_blank')}>
              <MdDataObject size={"1.5em"} color={step === 9 ? "#E3510F" : undefined} />
              <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 9 ? "#E3510F" : undefined}>
                Dataset
              </Text>
            </HStack>
          </Box>
        </VStack>
        <Box w="full" h="full" display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="2" pb="0" overflow="hidden" minW="0">
          {step === 0 && (
            <Teste tabelas={staticTables} colunas={staticColumns} players={staticPlayers} />
          )}
          {step === 1 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Quadra - Em desenvolvimento...
            </Text>
          )}
          {step === 2 && (
            <PlayerAnalytics players={staticPlayers} />
          )}
          {step === 3 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Draft - Em desenvolvimento...
            </Text>
          )}
          {step === 4 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Equipes - Em desenvolvimento...
            </Text>
          )}
          {step === 5 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Jogos - Em desenvolvimento...
            </Text>
          )}
        </Box>
      </HStack>

      {/* Player Dialog */}
      <Dialog.Root placement={"center"} open={isPlayerDialogOpen} onOpenChange={(details) => details.open ? null : closePlayerDialog()} size="xl">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bgColor="#202124" borderColor="#E3510F" maxW="90vw" maxH="90vh">
              <Dialog.Header>
                <Dialog.Title color="white" fontFamily="Poppins" fontSize="2xl">
                  🏀 Informações do Jogador
                </Dialog.Title>
                <Dialog.CloseTrigger color="white" />
              </Dialog.Header>
              <Dialog.Body overflowY="auto">
                {selectedPlayer && selectedPlayer.playerData ? (
                  <VStack align="start" spacing={6} w="100%">
                    {/* Player Name and Basic Info */}
                    <Box w="100%" p={4} borderRadius="12px" bgColor="#151516" border="2px solid #E3510F">
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="100%">
                          <Text color="white" fontWeight="bold" fontSize="3xl">
                            {selectedPlayer.playerData.display_first_last}
                          </Text>
                          <Badge colorScheme="orange" fontSize="lg" px={3} py={1}>
                            #{selectedPlayer.playerData.jersey_number || 'N/A'}
                          </Badge>
                        </HStack>
                        <HStack spacing={4} wrap="wrap">
                          <Badge colorScheme="blue" fontSize="md">
                            ID: {selectedPlayer.playerData.person_id}
                          </Badge>
                          <Badge colorScheme="green" fontSize="md">
                            {selectedPlayer.playerData.birthdate ? new Date(selectedPlayer.playerData.birthdate).toLocaleDateString() : 'Data não disponível'}
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>

                    {/* Player Details Grid */}
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} w="100%">
                      {/* Physical Information */}
                      <GridItem>
                        <Box p={4} borderRadius="12px" bgColor="#151516" border="1px solid #4A90E2" h="100%">
                          <Text color="#4A90E2" fontWeight="bold" fontSize="lg" mb={3}>
                            📏 Informações Físicas
                          </Text>
                          <VStack align="start" spacing={2}>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Altura:</Text> {selectedPlayer.playerData.height || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Peso:</Text> {selectedPlayer.playerData.weight || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Posição:</Text> {selectedPlayer.playerData.position || 'N/A'}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>

                      {/* Career Information */}
                      <GridItem>
                        <Box p={4} borderRadius="12px" bgColor="#151516" border="1px solid #10B981" h="100%">
                          <Text color="#10B981" fontWeight="bold" fontSize="lg" mb={3}>
                            🏆 Informações da Carreira
                          </Text>
                          <VStack align="start" spacing={2}>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Escola:</Text> {selectedPlayer.playerData.school || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">País:</Text> {selectedPlayer.playerData.country || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Draft:</Text> {selectedPlayer.playerData.draft_year ? `${selectedPlayer.playerData.draft_year} - Round ${selectedPlayer.playerData.draft_round || 'N/A'}, Pick ${selectedPlayer.playerData.draft_number || 'N/A'}` : 'N/A'}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>

                      {/* Team Information */}
                      <GridItem>
                        <Box p={4} borderRadius="12px" bgColor="#151516" border="1px solid #F59E0B" h="100%">
                          <Text color="#F59E0B" fontWeight="bold" fontSize="lg" mb={3}>
                            🏀 Informações do Time
                          </Text>
                          <VStack align="start" spacing={2}>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Time:</Text> {selectedPlayer.playerData.team_name || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Cidade:</Text> {selectedPlayer.playerData.team_city || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Abreviação:</Text> {selectedPlayer.playerData.team_abbreviation || 'N/A'}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>

                      {/* Experience Information */}
                      <GridItem>
                        <Box p={4} borderRadius="12px" bgColor="#151516" border="1px solid #8B5CF6" h="100%">
                          <Text color="#8B5CF6" fontWeight="bold" fontSize="lg" mb={3}>
                            ⭐ Experiência
                          </Text>
                          <VStack align="start" spacing={2}>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Anos na NBA:</Text> {selectedPlayer.playerData.season_exp || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Primeira Temporada:</Text> {selectedPlayer.playerData.from_year || 'N/A'}
                            </Text>
                            <Text color="gray.300">
                              <Text as="span" color="white" fontWeight="bold">Última Temporada:</Text> {selectedPlayer.playerData.to_year || 'N/A'}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>
                    </Grid>

                    {/* Additional Information */}
                    <Box w="100%" p={4} borderRadius="12px" bgColor="#151516" border="1px solid #6B7280">
                      <Text color="white" fontWeight="bold" fontSize="lg" mb={3}>
                        📊 Dados Completos do Jogador
                      </Text>
                      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
                        {Object.entries(selectedPlayer.playerData).map(([key, value]) => (
                          <Text key={key} color="gray.300" fontSize="sm">
                            <Text as="span" color="gray.400" fontWeight="bold">{key}:</Text> {value !== null ? String(value) : 'N/A'}
                          </Text>
                        ))}
                      </Grid>
                    </Box>
                  </VStack>
                ) : (
                  <VStack spacing={4}>
                    <Text color="white" fontSize="xl">Nenhum jogador selecionado</Text>
                    <Text color="gray.400">Selecione um jogador da lista para ver suas informações</Text>
                  </VStack>
                )}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
