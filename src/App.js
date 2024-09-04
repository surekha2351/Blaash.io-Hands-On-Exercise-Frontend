

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import PlaylistDisplay from './components/PlaylistDisplay';
import VideoDetails from './components/VideoDetails';

function App() {
  return (
    <Box h="100vh" bg="#1A202C">
      <Flex direction={{ base: 'column', md: 'row' }} h="100%">
        <Sidebar />
        <Box w={{ base: '100%', md: '50%' }} h="100%" bg={{ base: '#171923', md: '#2A2D3E' }}>
          <PlaylistDisplay />
        </Box>
        <Box w={{ base: '100%', md: '30%' }} h="100%" bg={{ base: '#171923', md: '#2A2D3E' }}>
          <VideoDetails />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
