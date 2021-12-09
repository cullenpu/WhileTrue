import {
  Box,
  Flex,
  Avatar,
  Heading,
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

const createLinks = (links: { display: string; href: string }[]) => {
  return links.map((link) => (
    <Link
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('blue.200', 'blue.700'),
      }}
      href={link.href}
    >
      <Heading as="h5" size="sm">
        {link.display}
      </Heading>
    </Link>
  ));
};

const links = [
  { display: 'Dashboard', href: '/dashboard' },
  { display: 'Data Input', href: '/data' },
  { display: 'Create', href: '/generate' },
];

const Nav = () => {
  return (
    <>
      <Box color="white" bg={useColorModeValue('blue.500', 'blue.500')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <a className="skip-to-content-link" href="#main">
                Skip to Content
              </a>
              {createLinks(links)}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src="https://static.wikia.nocookie.net/dogelore/images/8/87/411.png" />
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem color="black">Profile</MenuItem>
                </Link>
                <MenuDivider bg="black" />
                <Link href="/logout">
                  <MenuItem color="black">Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <style>{`
      .skip-to-content-link {
        height: 30px;
        left: 50%;
        margin: 8px;
        padding: 8px;
        position: absolute;
        transform: translateY(-200%);
        transition: transform 0.3s;
      }

      .skip-to-content-link:focus {
        transform: translateY(0%);
      }
      `}</style>
    </>
  );
};

export default Nav;
