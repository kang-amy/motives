import * as Scroll from 'react-scroll';
import '../App.css';
import MapComponent from '../components/map';
import FeedSelector from "../components/feedSelector";
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Feed from "../components/feed";
import {Container} from "@material-ui/core";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest"
import {useEffect, useState} from "react";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";

function RegisteredPage(props) {
    return (
        <div >
            <Navbar{...props} hideSearch={true}>
            <Container style={{marginTop:'20%'}}>
                <h2>Thanks for registering. Your account has been activated. Feel free to login now!</h2>
            </Container>
                <Link style={{color:'#2945CF'}} to="/about">Click here to learn more about Motives</Link>
            </Navbar>
        </div>

    );
}

export default RegisteredPage;
