import '../App.css';
import MapComponent from '../components/map';
import FeedSelector from "../components/feedSelector";
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router, Link, Route, useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box, Container, FormControlLabel, List, Paper, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import {ArrowBack, ArrowBackIos} from "@material-ui/icons";
import axios from "axios";
import setAuthToken from "../utils/authentication/setAuthToken";
import {refreshToken} from "../utils/authentication/refreshToken";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";
import Post from "../components/post";
import FollowerComponent from "../components/FollowerComponent";
import {Heading} from "@chakra-ui/react";


function PostDetailsPage(props) {
    const history = useHistory();
    const {id} = useParams();
    const [postDetails, setPostDetails] = useState(0);
    const [seeWhosGoingEnabled, setSeeWhosGoingEnabled] = useState(false);
    const [goingTo, setGoingTo] = useState([]);
    const [whosGoing, setWhosGoing] = useState(false);
    useEffect(async () => {
        const post = (await authenticatedGetRequest(baseURL + '/api/post/getpost/' + id)).data.post
        setPostDetails(post);
        setSeeWhosGoingEnabled(post.seeWhosGoing);

        const ret = (await authenticatedGetRequest(baseURL + '/api/post/postsimgoingtolist')).data.posts
        setGoingTo(ret);
        try {
            let ret2 = (await authenticatedGetRequest(baseURL + '/api/post/whosgoinglist/' + id)).data
            ret2 = await Promise.all(ret2.whosGoing.map(async (request) => {
                let data = (await authenticatedGetRequest(baseURL + '/api/search/getpublicuserdetailsid/' + request)).data;
                return data
            }));
            setWhosGoing(ret2)

        } catch {
        }
    }, [])
    const onDelete = async ()=>{
        await authenticatedPostRequest(baseURL+'/api/post/delete/' + id);
        history.push('/');
    }
    return (
        <div>
            <Navbar{...props} hideSearch={false}>
            {postDetails !== 0
                ? <div>
                    <Post onDelete={onDelete}{...props} {...postDetails} isPostDetailsPage={true} goingTo={goingTo.indexOf(id) !== -1}
                          key={postDetails._id}/>
                    {seeWhosGoingEnabled?   <>
                    <Heading>Who's Going?</Heading>
                    <List>
                        {!whosGoing || whosGoing.length===0
                            ? <h2>{"No one has said they're going yet. Be the first one!"}</h2>
                            : whosGoing.map((follower) => {
                                return (
                                    <div >
                                        <FollowerComponent {...follower}
                                                           isMyself={props.user === follower.username}></FollowerComponent>
                                    </div>
                                )
                            })}
                    </List>
                    </>:<></>}
                </div>

                : <h2>Sorry you are unable to view this post!</h2>}
            </Navbar>
        </div>
    )
}



export default PostDetailsPage;
