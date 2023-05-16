
import '../App.css';
import MapComponent from '../components/map';
import FeedSelector from "../components/feedSelector";
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router, Link, Route, useHistory} from "react-router-dom";
import {useState} from "react";
import {Box, TextField} from "@material-ui/core";
import {ArrowBack, ArrowBackIos} from "@material-ui/icons";
import axios from "axios";
import setAuthToken from "../utils/authentication/setAuthToken";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";
import {Container, Heading} from "@chakra-ui/react";

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({})


    const history = useHistory()

    const inputChange = (state) => {
        let callback;
        switch (state) {
            case 'email':
                callback = setEmail;
                break;
            case 'password':
                callback = setPassword;
                break;
            default:
                callback = ()=>{};
        }
        return e => callback(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        axios
            .post(baseURL+"/api/authentication/login", loginData)
            .then(async (res)=>{
                const { accessToken, refreshToken } = res.data.data;
                await localStorage.setItem("accessToken", accessToken);
                await localStorage.setItem("refreshToken", refreshToken);
                setAuthToken(accessToken);
                props.onLogin()
                history.push('/')
            })
            .catch(err =>{
                setError(err.response.data.errors)
            } )
    };


    return (

        <div>
            <Navbar{...props} hideSearch={true}>
            <div style={{marginTop: "50px"}}>
                <Heading as={'h1'} size={'xl'}>
                    Login
                </Heading>
                <form noValidate onSubmit={onSubmit}>

<Container>
                        <div>
                            {!error.email
                                ? <TextField id="standard-basic" fullWidth
                                             label="Email" value={email}
                                             onChange={inputChange('email')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.email} fullWidth
                                           label="Email" value={email}
                                           onChange={inputChange('email')} variant="standard"/>}
                        </div>
                        <div>
                            {!error.password
                                ? <TextField id="standard-basic" fullWidth type="password"
                                             label="Password" value={password}
                                             onChange={inputChange('password')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.password} fullWidth
                                           type="password"
                                           label="Password" value={password}
                                           onChange={inputChange('password')} variant="standard"/>}
                        </div>

                    <Button type="submit" color="primary">
                        Sign in
                    </Button>
</Container>
                </form>
                <p>
                    Don't have an account? <Link style={{color:'#2945CF'}} to="/register">Register</Link>
                </p>
                <p>
                   <Link style={{color:'#2945CF'}} to="/about">Click here to learn more about Motives</Link>
                </p>
            </div>
            </Navbar>
        </div>

    );
}

export default LoginPage;
