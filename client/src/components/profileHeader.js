import { useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";

import {baseURL} from "../CONSTANTS";
import {Avatar, Button, Container, Flex, Heading, Link} from "@chakra-ui/react";
import {capitalizeFirstLetter} from "../utils/stringUtils";

function FollowingButtons(props) {
    const body = {otherUser: props.otherUserId}
    if (props.followingState === 2) {
        return <Button onClick={async () => {
            await authenticatedPostRequest(baseURL + '/api/follow/unfollow', body)
            props.setFollowingState(0);
        }
        }>Unfollow</Button>
    }
    if (props.followingState === 1) {
        return <Button disabled>Pending Request</Button>
    }
    return (
        <Button onClick={async () => {
            await authenticatedPostRequest(baseURL + '/api/follow/followrequest', body)
            props.setFollowingState(1);
        }}>Follow</Button>
    );
}

function FollowerButtons(props) {
    const body = {otherUser: props.otherUserId}
    if (props.followerState === 2) {
        return <Button onClick={async () => {
            await authenticatedPostRequest(baseURL + '/api/follow/removefollower', body)
            props.setFollowerState(0);
        }}>Remove Follower</Button>
    }
    if (props.followerState === 1) {
        return <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            width: '100%',
            flexWrap: 'wrap'


        }}><Button
            onClick={async () => {
                await authenticatedPostRequest(baseURL + '/api/follow/acceptrequest', body)
                props.setFollowerState(2);
            }}>Accept Follow Request</Button>
            <Button
                onClick={async () => {
                    await authenticatedPostRequest(baseURL + '/api/follow/denyrequest', body)
                    props.setFollowerState(0);
                }}>Deny Follow Request</Button>
        </div>
    }
    return (
        <></>
    );
}

function ProfileHeader(props) {
    const isMyself = props.user === props.otherUser;
    const [followingState, setFollowingState] = useState(0);
    const [followerState, setFollowerState] = useState(0);
    const history = useHistory();
    useEffect(async () => {
            let ret = (await authenticatedGetRequest(baseURL + '/api/follow/relationship/' + props.otherUserId, {})).data
            setFollowerState(ret.follower);
            setFollowingState(ret.following);

        }, [props.otherUserId]
    )
    return (
        <Container align={'center'} >
            <div style={{
                paddingTop: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',



            }}>
                <Avatar style={{width: 100, height: 100}} onClick={()=>history.push('/profile/'+props.otherUser)}></Avatar>

                <div >
                    <Heading><Link href={'/profile/'+props.otherUser}>{capitalizeFirstLetter(props.otherUser)}</Link></Heading>
                    {isMyself
                        ? <></>
                        : <>
                            <FollowingButtons followingState={followingState} {...props}
                                              setFollowingState={setFollowingState}></FollowingButtons>
                            <br/>
                            <FollowerButtons followerState={followerState} {...props}
                                             setFollowerState={setFollowerState}></FollowerButtons>
                            <br/>
                        </>}

                    <Button style={{marginRight:'10px', marginBottom:'10px'}}color='blue' onClick={()=>history.push('/followers/' + props.otherUser)}>Followers</Button>
                    <Button style={{marginRight:'10px', marginBottom:'10px'}}color='blue' onClick={()=>history.push('/following/' + props.otherUser)}>Following</Button>
                    <br/>


                </div>

            </div>
        </Container>
    )

        ;
}


export default ProfileHeader