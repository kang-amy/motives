import '../App.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box, Container, FormControlLabel, List, Paper, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import ProfileHeader from "../components/profileHeader";
import Navbar from "../components/navbar";
import FollowerComponent from "../components/FollowerComponent";

function ListFollowersPage(props) {
    const [followers, setFollowers] = useState([]);
    const [userFound, setUserFound] = useState(true);
    const [name, setName] = useState('');
    const [otherUserId, setOtherUserId] = useState('');
    const {username} = useParams();

    useEffect(async () => {
            getProfileDetails(username).then(async (userDetails) => {
                if (userDetails.errors) {
                    return setUserFound(false);
                }

                setName(userDetails.firstname + " " + userDetails.lastname);
                setUserFound(true);
                setOtherUserId(userDetails.id);
                let followers = props.followers
                    ? (await authenticatedGetRequest(baseURL + '/api/follow/getfollowers/' + userDetails.id))
                    : (await authenticatedGetRequest(baseURL + '/api/follow/getfollowing/' + userDetails.id))
                if (followers.data.errors) {
                    return setUserFound(false);
                }
                followers = props.followers ? followers.data.followers : followers.data.following;
                followers = await Promise.all(followers.map(async (request) => {
                    let data = (await authenticatedGetRequest(baseURL + '/api/search/getpublicuserdetailsid/' + request)).data;
                    return data
                }));
                setFollowers(followers)
            })
        }
        ,
        [props.followers]
    )
    const getProfileDetails = async (user) => {
        return (await authenticatedGetRequest(baseURL + '/api/search/getpublicuserdetailsusername/' + user, {})).data;
    }
    return (
        <div>
            <Navbar{...props} hideSearch={false}>
            {userFound
                ? <Container>
                    <ProfileHeader user={props.user} otherUser={username} isFollowing={true} otherUserId={otherUserId}/>
                    <List>
                        {followers.length === 0
                            ? <h2>{props.followers ? 'No followers found' : "This user isn't following anyone"}</h2>
                            : followers.map((follower) => {
                                return (
                                    <div>
                                        <FollowerComponent {...follower}
                                                           isMyself={props.user === follower.username}></FollowerComponent>
                                    </div>
                                )
                            })}
                    </List>
                </Container>
                : <Container>
                    <h3>You do not have the required permissions</h3>
                </Container>
            }
            </Navbar>
        </div>
    )
}

export default ListFollowersPage;
