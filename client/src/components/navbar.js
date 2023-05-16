import React, {ReactNode} from 'react';

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Divider, Button,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCheckSquare,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown, FiPlusCircle, FiInfo,
} from 'react-icons/fi';
import {FaUserFriends} from 'react-icons/fa'
import SearchBar from "./searchbar/searchBar";
import {authenticatedGetRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import {useHistory} from "react-router-dom";
import {Tooltip} from "@material-ui/core";


const LinkItems = [
    {name: 'Explore', icon: FiCompass, link:'/'},
    {name: 'Following', icon: FaUserFriends, link:'/following'},
    {name: "My Motives", icon: FiCheckSquare, link:'/imgoingto'},
    {name: 'Post a Motive', icon: FiPlusCircle, link:'/addpost'},
    {name: 'About Motives', icon:FiInfo, link:'/about'}
];

export default function Navbar(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent {...props} onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} {...props}/>
            <Box ml={{base: 0, md: 60}}  p="4">
                {props.children}
            </Box>
        </Box>
    );
}


const SidebarContent = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchData, setSearchData] = React.useState([]);
    const history = useHistory();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const searchUser = async (searchTerm) => {
        if (searchTerm === "") return setSearchData([])
        let data = (await authenticatedGetRequest(baseURL+'/api/search/searchusers/'+searchTerm)).data.users;
        data = data.map((person)=>{
            return {
                title: person.username,
                link: '/profile/'+person.username,
            }
        })
        setSearchData(data)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...props}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">

                <Text bgGradient='linear(to-l, #2945CF, #1BAEE3)'
                      bgClip='text' fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    MOTIVES
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={props.onClose}/>
            </Flex>
            {props.hideSearch? <></>:<SearchBar  searchUser={searchUser} placeholder={'Search Users'} data={searchData}></SearchBar>}
            {LinkItems.map((link) => (
                <NavItem link={link.link} key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}

        </Box>
    );
};

const NavItem = (props) => {
    return (
        <Link href={props.link} style={{textDecoration: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...props}>
                {props.icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={props.icon}
                    />
                )}
                {props.children}
            </Flex>
        </Link>
    );
};


const MobileNav = (props) => {
    const history = useHistory()
    return (
        <div style={{position:'sticky', zIndex: 100,top: 0}} >
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...props}
            style={{}}
        >
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={props.onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                bgGradient='linear(to-l, #2945CF, #1BAEE3)'
                bgClip='text'
                fontFamily="monospace"
                fontWeight="bold">
                MOTIVES
            </Text>


            <HStack spacing={{base: '0', md: '6'}}>
                <Flex alignItems={'center'}>
                    <Menu>
                        {props.hideSearch ? <Button colorScheme='blue' onClick={()=>history.push('/login')}>Login</Button> :
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{boxShadow: 'none'}}>

                                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                    <Tooltip title="Account settings">

                                        <Avatar sx={{width: 35, height: 35}}></Avatar>

                                    </Tooltip>
                                </Box>


                            </MenuButton>
                        }
                        <MenuList

                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>

                            <MenuItem onClick={async () => {
                                history.push('/profile/' + props.user)
                            }}>


                                View My Profile



                            </MenuItem>
                            <MenuItem onClick={async () => {
                                history.push('/followrequests')
                            }}>

                                View Pending Requests
                            </MenuItem>
                            <Divider/>

                            <MenuItem onClick={async () => {
                                await props.onLogout()
                                history.push('/login')
                            }
                            }>
                                Logout

                            </MenuItem>

                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
        </div>
    );
};