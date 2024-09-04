import React from 'react';
import  { useState } from 'react';
import { Box, VStack, Text, Button, Image, Flex, IconButton, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const VideoDetails = () => {
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const videos = useSelector((state) => state.videos.data);
  const status = useSelector((state) => state.videos.status);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
    <Box 
      w="100%" 
      h="100%" 
      p="20px" 
      bg="#2A2D3E" 
      color="white" 
      display="flex" 
      flexDirection="column"
      fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Button colorScheme="blue" mb="10px" w="100%"
      size={{ base: 'sm', md: 'md', lg: 'lg' }}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
      >
        Generate Code
      </Button>

      <VStack spacing="10px" align="stretch" overflowY="auto" flex="1">
        {currentVideos.map((video, index) => (
          <Box
            key={index}
            p="10px"
            bg="#3B3E5B"
            borderRadius="md"
            display="flex"
            // alignItems="center"
          >
            {video.Thumbnail_URL && (
              <Image 
                src={video.Thumbnail_URL} 
                alt="Video Thumbnail" 
                borderRadius="md" 
                mr="10px"
                w={{ base: '100%', md: '50%', lg: '25%' }}
                maxH="50px" 
                h="auto"
              />
            )}
            <VStack align="flex-start" spacing="2px">
              <Text fontSize={fontSize} fontWeight="bold">
                {video.Thumbnail_Title}
              </Text>
              <Text fontSize={fontSize}>
                Products Attached: {video.AssociatedProductList ? video.AssociatedProductList.length : "0"}
              </Text>
              <Text fontSize={fontSize}>
                Created On: {new Date(video.CreatedOn).toLocaleDateString()}
              </Text>
            </VStack>
          </Box>
        ))}
      </VStack>

      <Flex justify="space-between" mt="10px">
        <IconButton
          icon={<ArrowBackIcon />}
          isDisabled={currentPage === 1}
          onClick={handlePrevPage}
          aria-label="Previous Page"
        />
        <Text alignSelf="center">
          {currentPage} / {totalPages}
        </Text>
        <IconButton
          icon={<ArrowForwardIcon />}
          isDisabled={currentPage === totalPages}
          onClick={handleNextPage}
          aria-label="Next Page"
        />
      </Flex>

      <Button colorScheme="blue" mt="10px" w="100%" 
      size={{ base: 'sm', md: 'md', lg: 'lg' }}
     display={{ base: 'none', md: 'inline-flex' }}
     fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
     >
        Update Playlist
      </Button>
    </Box>
  );
};

export default VideoDetails;
