import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideosByPlaylist } from '../store/videoSlice';

const PlaylistDisplay = () => {
  const playlists = useSelector((state) => state.playlists.data);
  const status = useSelector((state) => state.playlists.status);
  const dispatch = useDispatch();

  const handlePlaylistClick = (playlistId) => {
    dispatch(fetchVideosByPlaylist(playlistId));
  };

  if (status === 'loading') {
    return <Text>Loading playlists...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error loading playlists. Please try again later.</Text>;
  }

  if (!Array.isArray(playlists) || playlists.length === 0) {
    return <Text>No playlists available</Text>;
  }

  return (
    <Box p="10px" bg="#2A2D3E" color="white"> {/* Adjusted padding */}
      <Text fontSize="xl" mb="10px">Product Playlists</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="10px"> {/* Reduced gap */}
        {playlists.map((playlist) => (
          <Box
            key={playlist.postId}
            p="10px"
            bg="#3B3E5B"
            borderRadius="md"
            onClick={() => handlePlaylistClick(playlist.PlayListId)}
            cursor="pointer"
            _hover={{ bg: '#4A4E7B' }}
          >
            <Text fontWeight="bold">{playlist.Name}</Text>
            <Text>{playlist.Description}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default PlaylistDisplay;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaHome, FaVideo, FaListAlt, FaCalendarAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../store/playlistSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  
  // State to track active tab, "playlistManager" by default
  const [activeTab, setActiveTab] = useState('playlistManager');

  useEffect(() => {
    // Automatically fetch playlists when the component mounts
    if (activeTab === 'playlistManager') {
      dispatch(fetchPlaylists());
    }
  }, [dispatch, activeTab]);

  const handlePlaylistManagerClick = () => {
    setActiveTab('playlistManager');
    dispatch(fetchPlaylists());
  };

  return (
    <Box
    w="250px"
    h="100vh"
    bg="#2A2D3E"
    color="white"
    p="20px"
    boxShadow="2xl"
  >
  
      <Flex alignItems="center" justifyContent="center" mb="30px">
        <Text fontSize="2xl" fontWeight="bold">Bloash</Text>
      </Flex>
      <VStack align="stretch" spacing="5">
        <MenuItemButton 
          icon={<FaHome />} 
          label="Revenue" 
          isActive={activeTab === 'revenue'}
          onClick={() => setActiveTab('revenue')}
        />
        <Menu>
          <MenuButton
            as={Flex}
            justifyContent="space-between"
            alignItems="center"
            _hover={{ bg: '#3B3E5B' }}
            p="10px"
            borderRadius="md"
            cursor="pointer"
            transition="background-color 0.3s ease"
          >
            <Flex alignItems="center">
              <FaVideo />
              <Text ml="10px">Shoppable Video</Text>
            </Flex>
            <ChevronDownIcon />
          </MenuButton>
          <MenuList bg="#2A2D3E" border="none" mt="0" color="white">
            <MenuItem _hover={{ bg: '#3B3E5B' }} _focus={{ bg: '#3B3E5B' }} p="10px">
              Option 1
            </MenuItem>
            <MenuItem _hover={{ bg: '#3B3E5B' }} _focus={{ bg: '#3B3E5B' }} p="10px">
              Option 2
            </MenuItem>
          </MenuList>
        </Menu>
        <MenuItemButton 
          icon={<FaListAlt />} 
          label="Story" 
          isActive={activeTab === 'story'}
          onClick={() => setActiveTab('story')}
        />
        <MenuItemButton 
          icon={<FaVideo />} 
          label="Live Commerce" 
          isActive={activeTab === 'liveCommerce'}
          onClick={() => setActiveTab('liveCommerce')}
        />
        <Menu>
          <MenuButton
            as={Flex}
            justifyContent="space-between"
            alignItems="center"
            _hover={{ bg: '#3B3E5B' }}
            p="10px"
            borderRadius="md"
            cursor="pointer"
            transition="background-color 0.3s ease"
            onClick={handlePlaylistManagerClick}
            bg={activeTab === 'playlistManager' ? '#4A4E7B' : 'inherit'}
          >
            <Flex alignItems="center">
              <FaListAlt />
              <Text ml="10px">Playlist Manager</Text>
            </Flex>
            <ChevronDownIcon />
          </MenuButton>
          <MenuList bg="#2A2D3E" border="none" mt="0" color="white">
            <MenuItem _hover={{ bg: '#3B3E5B' }} _focus={{ bg: '#3B3E5B' }} p="10px">
              Product Playlist
            </MenuItem>
          </MenuList>
        </Menu>
        <MenuItemButton 
          icon={<FaCalendarAlt />} 
          label="One Click Post" 
          isActive={activeTab === 'oneClickPost'}
          onClick={() => setActiveTab('oneClickPost')}
        />
        <MenuItemButton 
          icon={<FaCalendarAlt />} 
          label="Calendar" 
          isActive={activeTab === 'calendar'}
          onClick={() => setActiveTab('calendar')}
        />
        <MenuItemButton 
          icon={<FaCalendarAlt />} 
          label="Hire Influencer" 
          isActive={activeTab === 'hireInfluencer'}
          onClick={() => setActiveTab('hireInfluencer')}
        />
      </VStack>
    </Box>
  );
};

const MenuItemButton = ({ icon, label, isActive, onClick }) => (
  <Flex
    alignItems="center"
    p="10px"
    borderRadius="md"
    _hover={{ bg: '#3B3E5B' }}
    cursor="pointer"
    transition="background-color 0.3s ease"
    bg={isActive ? '#4A4E7B' : 'inherit'}
    onClick={onClick}
  >
    {icon}
    <Text ml="10px">{label}</Text>
  </Flex>
);

export default Sidebar;
import { useState } from 'react';
import { Box, VStack, Text, Button, Image, Flex, IconButton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const VideoDetails = () => {
  const videos = useSelector((state) => state.videos.data);
  const status = useSelector((state) => state.videos.status);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Calculate the total number of pages
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  // Get the videos for the current page
  const currentVideos = videos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === 'loading') {
    return <Text>Loading videos...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error loading videos. Please try again later.</Text>;
  }

  return (
    <Box w="350px" p="20px" bg="#2A2D3E" color="white" borderRadius="md">
      <Button colorScheme="blue" mb="20px" w="100%">Generate Code</Button>
      <Box
        maxH="400px" // Fixed height for scrolling
        overflowY="auto"
      >
        <VStack spacing="15px" align="stretch">
          {currentVideos.map((video, index) => (
            <Box key={index} p="10px" bg="#3B3E5B" borderRadius="md">
              <Text fontSize="md" fontWeight="bold">{video.Thumbnail_Title}</Text>
              <Text>Products Attached: {video.AssociatedProductList ? video.AssociatedProductList.length : "0"}</Text>
              {video.Thumbnail_URL && <Image src={video.Thumbnail_URL} alt="Video Thumbnail" borderRadius="md" mt="10px" />}
              <Text mt="5px" fontSize="sm">Created On: {new Date(video.CreatedOn).toLocaleDateString()}</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Flex justify="space-between" mt="20px">
        <IconButton
          icon={<ArrowBackIcon />}
          isDisabled={currentPage === 1}
          onClick={handlePrevPage}
          aria-label="Previous Page"
        />
        <Text alignSelf="center">{`${currentPage} / ${totalPages}`}</Text>
        <IconButton
          icon={<ArrowForwardIcon />}
          isDisabled={currentPage === totalPages}
          onClick={handleNextPage}
          aria-label="Next Page"
        />
      </Flex>

      <Button colorScheme="blue" mt="20px" w="100%">Update Playlist</Button>
    </Box>
  );
};

export default VideoDetails;