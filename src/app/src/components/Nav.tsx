import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';

const Nav = () => {
  return (
    <>
      <Box bg={useColorModeValue('blue.100', 'blue.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('blue.200', 'blue.700'),
                }}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('blue.200', 'blue.700'),
                }}
                href="/data"
              >
                Data Input
              </Link>
              <Link
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('blue.200', 'blue.700'),
                }}
                href="/generate"
              >
                Generate Content
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src="https://static.wikia.nocookie.net/dogelore/images/8/87/411.png" />
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuDivider />
                <Link href="/logout">
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Nav;
