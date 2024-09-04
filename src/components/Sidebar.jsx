
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
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaHome, FaVideo, FaListAlt, FaCalendarAlt, FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../store/playlistSlice';
import {  Image } from '@chakra-ui/react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });

  const [activeTab, setActiveTab] = useState('playlistManager');

  useEffect(() => {
    if (activeTab === 'playlistManager') {
      dispatch(fetchPlaylists());
    }
  }, [dispatch, activeTab]);

  const handlePlaylistManagerClick = () => {
    setActiveTab('playlistManager');
    dispatch(fetchPlaylists());
  };

  const SidebarContent = (
    <VStack align="stretch"
    bg="#2A2D3E"
    color="white"
    fontSize={fontSize}
    boxShadow="2xl"
    p="20px"
    w="100%"
    h="100vh"
     spacing="4">
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
            <Text ml="8px">Playlist Manager</Text>
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
  );

  return (
    <>
      <Box
        // w="100%"
        h="100vh"
        bg="#2A2D3E"
        color="white"
        p="20px"
        boxShadow="2xl"
        fontSize={fontSize}
        overflow={"scroll"}
        display={{ base: 'none', md: 'block' }}
      >
        <Flex alignItems="center" justifyContent="center" mb="30px">
          <Image src="https://res.cloudinary.com/drdjty87p/image/upload/v1725440436/Screenshot_2024-09-04_142606-removebg-preview_bamzi5.png"/>
          
        </Flex>
        {SidebarContent}
      </Box>

      <IconButton
        ref={btnRef}
        icon={<FaBars />}
        variant="outline"
        colorScheme="whiteAlpha"
        onClick={onOpen}
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        top="1rem"
        right="1rem"
        bg="#2A2D3E"
        color="white"
        p="20px"
        boxShadow="2xl"
        fontSize={fontSize}
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        
      >
        <DrawerOverlay />
        <DrawerContent bg="#2A2D3E">
          <DrawerCloseButton bg="#2A2D3E"
        color="white"
        p="20px"
        boxShadow="2xl"
        fontSize={fontSize} />
          <DrawerHeader color="white">Bloash</DrawerHeader>
          <DrawerBody>
            {SidebarContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
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

