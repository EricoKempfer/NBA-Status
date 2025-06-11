import {
  Box,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { TbPlayBasketball } from "react-icons/tb";
import { FaChartBar, FaChartPie, FaChartLine, FaUsers, FaBasketballBall, FaTrophy, FaGlobeAmericas, FaRuler } from "react-icons/fa";
import { IoStatsChart, IoTrendingUp } from "react-icons/io5";

export default function PlayerAnalytics({ players }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  // Color palette for charts
  const COLORS = ['#E3510F', '#4A90E2', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];  // Process player data for multiple charts
  useEffect(() => {
    if (!players || !Array.isArray(players) || players.length === 0) {
      console.log("No players data available");
      setIsLoading(false);
      return;
    }

    console.log("Raw players array:", players.slice(0, 2));
    
    // Try multiple ways to access player data
    let playersData = [];
    
    // Method 1: Check if players array contains objects with playerData property
    if (players[0] && players[0].playerData) {
      playersData = players.map(p => p.playerData).filter(Boolean);
    } 
    // Method 2: Check if players array contains direct player objects
    else if (players[0] && (players[0].country || players[0].position)) {
      playersData = players;
    }
    // Method 3: Check if it's nested differently
    else if (players[0] && typeof players[0] === 'object') {
      console.log("Checking player structure:", Object.keys(players[0]));
      playersData = players;
    }

    console.log("Processed players data:", playersData.slice(0, 3));
    console.log("Total processed players:", playersData.length);

    if (playersData.length === 0) {
      console.log("No valid player data found");
      setIsLoading(false);
      return;
    }

    const experienceDistribution = {};
    const positionDistribution = {};
    const countryDistribution = {};

    console.log("Total players data:", playersData.length);
    console.log("Sample player data:", playersData.slice(0, 3));

    playersData.forEach((player, index) => {
      if (index < 5) {
        console.log(`Player ${index}:`, {
          country: player.country,
          position: player.position,
          season_exp: player.season_exp
        });
      }

      // Experience analysis
      if (player.season_exp !== null && player.season_exp !== undefined) {
        const expRange = player.season_exp < 2 ? 'Rookie (0-1 anos)' :
                        player.season_exp < 5 ? 'Jovem (2-4 anos)' :
                        player.season_exp < 10 ? 'Veterano (5-9 anos)' :
                        'Lenda (10+ anos)';
        experienceDistribution[expRange] = (experienceDistribution[expRange] || 0) + 1;
      }

      // Position analysis
      if (player.position) {
        positionDistribution[player.position] = (positionDistribution[player.position] || 0) + 1;
      }

      // Country analysis - with better validation
      if (player.country && typeof player.country === 'string' && player.country.trim() !== '') {
        const country = player.country.trim();
        countryDistribution[country] = (countryDistribution[country] || 0) + 1;
      }
    });

    console.log("Country distribution raw:", countryDistribution);

    // Calculate height statistics
    const heightDistribution = {};
    const validHeights = [];
    
    playersData.forEach(player => {
      if (player.height && typeof player.height === 'string') {
        // Parse height format like "6-10" to inches
        const heightParts = player.height.split('-');
        if (heightParts.length === 2) {
          const feet = parseInt(heightParts[0]);
          const inches = parseInt(heightParts[1]);
          const totalInches = feet * 12 + inches;
          validHeights.push(totalInches);
          
          // Create height ranges for distribution
          const heightRange = totalInches < 72 ? 'Baixo (< 6\'0")' :
                             totalInches < 78 ? 'Médio (6\'0" - 6\'5")' :
                             totalInches < 84 ? 'Alto (6\'6" - 6\'11")' :
                             'Muito Alto (7\'0"+)';
          heightDistribution[heightRange] = (heightDistribution[heightRange] || 0) + 1;
        }
      }
    });

    // Calculate average height by position
    const positionHeights = {};
    Object.keys(positionDistribution).forEach(position => {
      const positionPlayers = playersData.filter(p => p.position === position && p.height);
      const heights = positionPlayers.map(p => {
        if (p.height && typeof p.height === 'string') {
          const heightParts = p.height.split('-');
          if (heightParts.length === 2) {
            const feet = parseInt(heightParts[0]);
            const inches = parseInt(heightParts[1]);
            return feet * 12 + inches;
          }
        }
        return null;
      }).filter(h => h !== null);
      
      if (heights.length > 0) {
        const avgHeight = heights.reduce((sum, h) => sum + h, 0) / heights.length;
        const avgFeet = Math.floor(avgHeight / 12);
        const avgInches = Math.round(avgHeight % 12);
        positionHeights[position] = {
          inches: avgHeight,
          display: `${avgFeet}'${avgInches}"`,
          count: heights.length
        };
      }
    });
    
    // Convert to chart formats
    const experienceData = Object.entries(experienceDistribution)
      .map(([exp, count]) => ({ name: exp, jogadores: count }));

    const positionData = Object.entries(positionDistribution)
      .sort(([, a], [, b]) => b - a)
      .map(([position, count]) => ({ name: position, value: count }));

    const countryData = Object.entries(countryDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([country, count]) => ({ 
        name: country, 
        jogadores: count 
      }))
      .filter(item => item.name && item.jogadores > 0); // Filter out invalid entries

    // Create height data for chart (average height by position)
    const heightByPositionData = Object.entries(positionHeights)
      .sort(([, a], [, b]) => b.inches - a.inches)
      .slice(0, 5) // Top 5 positions
      .map(([position, data]) => ({
        name: position,
        altura: Math.round(data.inches),
        display: data.display,
        jogadores: data.count
      }));

    console.log("Country data for chart:", countryData);
    console.log("Experience data for chart:", experienceData);
    console.log("Position data for chart:", positionData);
    console.log("Height by position data:", heightByPositionData);

    setChartData({
      experience: experienceData,
      position: positionData,
      country: countryData,
      totalPlayers: playersData.length,
      heightByPosition: heightByPositionData
    });
    setIsLoading(false);
  }, [players]);

  if (isLoading) {
    return (
      <VStack spacing={4} h="100%" justify="center" align="center">
        <Spinner size="xl" color="#E3510F" thickness="4px" />
        <Text color="white" fontSize="xl">
          Carregando Analytics dos Jogadores...
        </Text>
      </VStack>
    );
  }

  return (
    <Box w="100%" h="100%" overflow="auto" p={4}>
      <HStack mb={6} spacing={3} alignItems="center">
        <IoStatsChart color="#E3510F" size="2em" />
        <Text fontFamily="Poppins" fontSize="3xl" fontWeight="bold" color="white">
          Analytics dos Jogadores NBA
        </Text>
      </HStack>

      {/* Enhanced Statistics Section */}
      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={6} mb={8}>
        
        {/* Total Players - Enhanced Design */}
        <GridItem>
          <Card.Root bg="linear-gradient(135deg, #202124 0%, #2A2D30 100%)" border="2px solid #E3510F" borderRadius="xl" h="320px" position="relative" overflow="hidden">
            {/* Background decoration */}
            <Box position="absolute" top="-50px" right="-50px" w="150px" h="150px" borderRadius="full" bg="rgba(227, 81, 15, 0.1)" />
            <Box position="absolute" bottom="-30px" left="-30px" w="100px" h="100px" borderRadius="full" bg="rgba(227, 81, 15, 0.05)" />
            
            <Card.Body p={6} position="relative" zIndex={1}>
              <VStack spacing={6} align="stretch" h="100%">
                {/* Header */}
                <HStack spacing={3} justify="space-between">
                  <HStack spacing={3}>
                    <Box bg="rgba(227, 81, 15, 0.2)" p={3} borderRadius="lg">
                      <FaBasketballBall color="#E3510F" size="24px" />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color="white" fontSize="lg" fontWeight="bold">📊 Total de Jogadores</Text>
                      <Text color="gray.400" fontSize="sm">NBA Database</Text>
                    </VStack>
                  </HStack>
                  <IoTrendingUp color="#10B981" size="20px" />
                </HStack>

                {/* Main Number */}
                <VStack spacing={2} flex={1} justify="center">
                  <Text color="#E3510F" fontSize="6xl" fontWeight="black" lineHeight="1">
                    {chartData.totalPlayers?.toLocaleString() || 0}
                  </Text>
                  <Text color="gray.300" fontSize="lg" textAlign="center">
                    Jogadores Registrados
                  </Text>
                </VStack>

                {/* Mini Stats */}
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <VStack spacing={1}>
                    <Text color="#10B981" fontSize="xl" fontWeight="bold">
                      {(chartData.country || []).length}
                    </Text>
                    <Text color="gray.400" fontSize="xs" textAlign="center">
                      Países
                    </Text>
                  </VStack>
                  <VStack spacing={1}>
                    <Text color="#4A90E2" fontSize="xl" fontWeight="bold">
                      {(chartData.position || []).length}
                    </Text>
                    <Text color="gray.400" fontSize="xs" textAlign="center">
                      Posições
                    </Text>
                  </VStack>
                </Grid>
              </VStack>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Average Height by Position Chart */}
        <GridItem>
          <Card.Root bg="#202124" border="1px solid #F59E0B" borderRadius="xl" h="320px">
            <Card.Header pb={2}>
              <HStack spacing={3} justify="space-between">
                <HStack spacing={2}>
                  <Box bg="rgba(245, 158, 11, 0.2)" p={2} borderRadius="lg">
                    <FaRuler color="#F59E0B" size="20px" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text color="white" fontSize="lg" fontWeight="bold">
                      📏 Altura Média por Posição
                    </Text>
                    <Text color="gray.400" fontSize="sm">Medidas em pés e polegadas</Text>
                  </VStack>
                </HStack>
              </HStack>
            </Card.Header>
            <Card.Body pt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.heightByPosition || []} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', fontSize: 10 }}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    tick={{ fill: 'white', fontSize: 11 }}
                    domain={[65, 90]}
                    label={{ value: 'Altura (polegadas)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'white' } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#202124',
                      border: '1px solid #F59E0B',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value, name) => {
                      const feet = Math.floor(value / 12);
                      const inches = Math.round(value % 12);
                      return [`${feet}'${inches}"`, 'Altura Média'];
                    }}
                    labelFormatter={(label) => `Posição: ${label}`}
                  />
                  <Bar 
                    dataKey="altura" 
                    radius={[4, 4, 0, 0]}
                    fill="#F59E0B"
                    stroke="#FFB84D"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card.Root>
        </GridItem>
        
      </Grid>

      {/* Main Analytics Charts */}
      <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} mb={6}>
        
        {/* Experience Distribution - Bar Chart */}
        <GridItem>
          <Card.Root bg="#202124" border="1px solid #10B981" h="400px">
            <Card.Header>
              <HStack spacing={2}>
                <FaChartBar color="#10B981" />
                <Text color="white" fontSize="lg" fontWeight="bold">
                  Distribuição por Experiência
                </Text>
              </HStack>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.experience || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'white', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: 'white', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#202124',
                      border: '1px solid #10B981',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="jogadores" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Position Distribution - Pie Chart */}
        <GridItem>
          <Card.Root bg="#202124" border="1px solid #4A90E2" h="400px">
            <Card.Header>
              <HStack spacing={2}>
                <FaChartPie color="#4A90E2" />
                <Text color="white" fontSize="lg" fontWeight="bold">
                  Distribuição por Posição
                </Text>
              </HStack>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.position || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(chartData.position || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#202124',
                      border: '1px solid #4A90E2',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card.Root>
        </GridItem>

        {/* Top Countries - Horizontal Bar Chart */}
        <GridItem colSpan={2}>
          <Card.Root bg="#202124" border="1px solid #F59E0B" h="400px">
            <Card.Header>
              <HStack spacing={2}>
                <FaChartBar color="#F59E0B" />
                <Text color="white" fontSize="lg" fontWeight="bold">
                  Top 6 Países com Mais Jogadores
                </Text>
              </HStack>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height="100%">
                {chartData.country && chartData.country.length > 0 ? (
                  <BarChart 
                    data={chartData.country} 
                    layout="vertical" 
                    margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      type="number" 
                      tick={{ fill: 'white', fontSize: 12 }}
                      domain={[0, 'dataMax + 10']}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: 'white', fontSize: 12 }} 
                      width={70}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#202124',
                        border: '1px solid #F59E0B',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      formatter={(value, name) => [value, 'Jogadores']}
                      labelFormatter={(label) => `País: ${label}`}
                    />
                    <Bar 
                      dataKey="jogadores" 
                      fill="#F59E0B" 
                      radius={[0, 4, 4, 0]}
                      minPointSize={2}
                    />
                  </BarChart>
                ) : (
                  <VStack justify="center" align="center" h="100%" spacing={4}>
                    <Text color="white" fontSize="lg">
                      Nenhum dado de país disponível
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Dados: {JSON.stringify(chartData.country)}
                    </Text>
                  </VStack>
                )}
              </ResponsiveContainer>
            </Card.Body>
          </Card.Root>
        </GridItem>

      </Grid>
      
    </Box>
  );
}
