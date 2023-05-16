import {
    Avatar,
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, {useEffect, useState} from "react";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import {useHistory} from "react-router-dom";
import {capitalizeFirstLetter} from "../utils/stringUtils";

export default function FollowerComponent(props) {
    const history = useHistory();
    const [followingState, setFollowingState] = useState(0);
    const [followerState, setFollowerState] = useState(0);

    useEffect(async () => {
            let ret = (await authenticatedGetRequest(baseURL + '/api/follow/relationship/' + props.id, {})).data
            setFollowerState(ret.follower);
            setFollowingState(ret.following);

        }, [props.id]
    )

    return (
        <Center py={6} >
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{sm: '100%', md: '540px'}}
                height={{sm: '476px', md: '10rem'}}
                direction={{base: 'column', md: 'row'}}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={4}>
                <Flex flex={1} onClick={() => history.push('/profile/' + props.username)}>
                    <Avatar sx={{margin: 'auto'}}/>
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} onClick={() => history.push('/profile/' + props.username)}>
                        {capitalizeFirstLetter(props.firstname) + ' ' + capitalizeFirstLetter(props.lastname)}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4} onClick={() => history.push('/profile/' + props.username)}>
                        {capitalizeFirstLetter(props.username)}
                    </Text>
                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        {props.isMyself
                            ? <></>
                            :
                            (props.isRequests ? <RequestButtons {...props}/> :
                                <>
                                    <Button onClick={() => history.push('/profile/' + props.username)}>
                                        View Profile
                                    </Button>
                                    <FollowingButtons followingState={followingState} otherUserId={props.id}
                                                      setFollowingState={setFollowingState}></FollowingButtons></>)
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}


function RequestButtons(props) {
    return (
        < >
            <Button
                onClick={async () => {
                    await authenticatedPostRequest(baseURL + '/api/follow/acceptrequest', {otherUser: props.id})
                    props.setPendingRequests(props.pendingRequests.filter((request) => {
                        return request.username != props.username;
                    }))
                }}>Accept</Button>
            <Button
                onClick={async () => {
                    await authenticatedPostRequest(baseURL + '/api/follow/denyrequest', {otherUser: props.id})
                    props.setPendingRequests(props.pendingRequests.filter((request) => {
                        return request.username != props.username;
                    }))
                }}>Deny</Button>
        </>
    );
}

function FollowingButtons(props) {

    const body = {otherUser: props.otherUserId}
    if (props.followingState === 2) {
        return <Button style={{width: '100px'}} onClick={async () => {
            await authenticatedPostRequest(baseURL + '/api/follow/unfollow', body)
            props.setFollowingState(0);
        }
        }>Unfollow</Button>
    }
    if (props.followingState === 1) {
        return <Button style={{width: '100px'}} disabled>Pending <br/>Request</Button>
    }
    return (
        <Button style={{width: '100px'}} onClick={async () => {
            await authenticatedPostRequest(baseURL + '/api/follow/followrequest', body)
            props.setFollowingState(1);
        }}>Follow</Button>
    );
}
