import '../App.css';
import React, {useEffect, useState} from "react";
import {List} from "@material-ui/core";
import {authenticatedGetRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";
import FollowerComponent from "../components/FollowerComponent";
import {Heading} from "@chakra-ui/react";


function FollowRequestsPage(props) {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(async () => {
        let requests = (await authenticatedGetRequest(baseURL + '/api/follow/pendingIn')).data.pendingIn
        requests = await Promise.all(requests.map(async (request) => {
            let data = (await authenticatedGetRequest(baseURL + '/api/search/getpublicuserdetailsid/' + request)).data;
            return data
        }));
        setPendingRequests(requests)
    }, [])


    return (
        <div>
            <Navbar{...props} hideSearch={false}>
                <Heading>Follow Requests</Heading>
            <List>
                {pendingRequests.length === 0
                    ? <h2>You currently have no pending follow requests</h2>
                    :pendingRequests.map((request)=>{
                    return (
                        <div>
                            <FollowerComponent isRequests={true} {...request} setPendingRequests={setPendingRequests} pendingRequests={pendingRequests}></FollowerComponent>
                        </div>
                    )
                })}
            </List>
            </Navbar>
        </div>
    )
}

export default FollowRequestsPage;
