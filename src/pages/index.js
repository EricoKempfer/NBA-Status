import { Box, HStack, Text, Image, Separator, VStack } from '@chakra-ui/react';
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
    limit: 10,
  });

  return (
    <Box w="100%" h="100vh" bgColor={"#151516"} pt="1%" pb="1%" pl="5%" pr="5%" >
      <HStack w="100%" h="6vh" justifyContent={"space-between"} >
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
          borderRadius="50%"
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Type to search" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger onClick={reset} />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content ref={contentRef}>
                {collection.items.map((item) => (
                  <Combobox.Item key={item.value} item={item}>
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
      <HStack w="100%" h="90vh" pb="2%" alignItems={"center"} justify={"start"} pt="2%">
        {/* Primeira Box: Itens até Jogos */}
        <VStack>
          <Box w="auto" display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="4" pb="4" bgColor={"#202124"} >
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
          {/* Segunda Box: Front-End para baixo */}
          <Box w="auto" display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="4" pb="4" bgColor={"#202124"} mt={"2"}>
            <HStack gap="4" cursor="pointer" onClick={() => window.open('https://github.com/EricoKempfer/NBA-Status', '_blank')}>
              <FaLaptopCode size={"1.5em"} color={step === 6 ? "#E3510F" : undefined} />
              <Text lineClamp={1} fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} color={step === 6 ? "#E3510F" : undefined}>
                Front-End
              </Text>
            </HStack>
            <Separator borderRadius={"10px"} size="md" orientation='horizontal' mt="2" mb="2" />
            <HStack gap="4">
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
        <Box w="full" h="full" display="inline-flex" flexDirection="column" pr="6" borderRadius={"18px"} pl="6" pt="4" pb="4" >
          {step === 0 && (
            <Teste tabelas={staticTables} colunas={staticColumns} players={staticPlayers} />
          )}
          {step === 1 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Quadra - Em desenvolvimento...
            </Text>
          )}
          {step === 2 && (
            <Text fontFamily={"Roboto"} fontSize={"18px"} fontWeight={"500"} >
              Jogadores - Em desenvolvimento...
            </Text>
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
    </Box>
  );
}
