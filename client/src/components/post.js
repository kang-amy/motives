import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue, Image, Flex, Wrap, Link, Button,
} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import MapComponent from "./map";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {capitalizeFirstLetter} from "../utils/stringUtils";

export default function Post(props) {
    const history = useHistory();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const [showDetails, setShowDetails] = useState(false);
    const [goingTo, setGoingTo] = useState(props.goingTo.toString());
    useEffect(() => setGoingTo(props.goingTo.toString()), [props.goingTo]);
    const changeGoingTo = async (e) => {

        await authenticatedPostRequest(baseURL + '/api/post/imgoing', {
            postId: props._id,
            going: e.target.value == 'true'
        })
        setGoingTo(e.target.value)
    }

    return (
        <Center id={props._id}  py={6} >
            <Box
                maxW={'80%'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'200px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <MapComponent key={props._id} firstMap={props.isPostDetailsPage} markers={[{
                        id: 0,
                        position: {lat: props.location.coordinates[1], lng: props.location.coordinates[0]}
                    }]} center={{
                        lat: props.location.coordinates[1],
                        lng: props.location.coordinates[0]
                    }}></MapComponent>
                </Box>
                <Stack onClick={() => history.push('/post/' + props._id)}>
                   <Text
                        color={'blue'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                       <Link href={'/post/' + props._id}> {props.title}</Link>
                    </Text>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={{md: '2xl', base: '14px'}}
                        fontFamily={'body'}>
                        {(new Date(props.eventStart)).toLocaleString('en-US', options)} - {(new Date(props.eventEnd)).toLocaleString('en-US', options)}
                    </Heading>
                    <Text color={'gray.500'} fontSize={{md: '2xl', base: '14px'}}>
                        <p>{props.address}</p>
                        <p style={{textAlign: 'left', marginLeft: '25px'}}>{props.description}</p>
                    </Text>
                </Stack>
                <Wrap mt={6} justify={'space-between'} spacing={4} align={'center'}>
                    <Link href={('/profile/' + props.username)}>
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar
                            />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>{capitalizeFirstLetter(props.username)}</Text>
                                <Text color={'gray.500'}>View Profile</Text>
                            </Stack>

                        </Stack>
                    </Link>
                    {props.username===props.user || props.user==='admin'?
                        <Button color={'red'} onClick={props.onDelete}>Delete</Button>:
                    <FormControl component="fieldset">
                        <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={goingTo}
                            onChange={changeGoingTo}
                        >
                            <FormControlLabel value={'true'} control={<Radio color='primary'/>} label="I'm Going"/>
                            <FormControlLabel value={'false'} control={<Radio color='primary'/>} label="I'm Not Going"/>
                        </RadioGroup>
                    </FormControl>}
                </Wrap>
            </Box>
        </Center>
    );
}
