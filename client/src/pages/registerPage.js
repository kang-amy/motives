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
import jwt_decode from "jwt-decode";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";
import {Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";

function RegisterPage(props) {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState({})
    const inputChange = (state) => {
        let callback;
        switch (state) {
            case 'username':
                callback = setUsername;
                break;
            case 'firstname':
                callback = setFirstname;
                break;
            case 'lastname':
                callback = setLastname;
                break;
            case 'email':
                callback = setEmail;
                break;
            case 'password':
                callback = setPassword;
                break;
            case 'password2':
                callback = setPassword2;
                break;
            default:
                callback = ()=>{};
        }
        return e => callback(e.target.value);
    }
    const history = useHistory()
    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            password2: password2
        };
        axios
            .post(baseURL + "/api/authentication/register", newUser)
            .then(async () => {
                setError({})
                history.push('/registered')


            })
            .catch(err => {
                setError(err.response.data.errors)
            })

    };


    return (

        <div>
            <Navbar{...props} hideSearch={true}>
            <div style={{marginTop: "50px"}}>

                    <Heading as={'h1'} size={'xl'}>
                        Register
                    </Heading>

                <form noValidate onSubmit={onSubmit}>
                    <Container>

                        <div>
                            {!error.username
                                ? <TextField id="standard-basic" fullWidth
                                             label="Username" value={username}
                                             onChange={inputChange('username')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.username} fullWidth
                                           label="Username" value={username}
                                           onChange={inputChange('username')} variant="standard"/>}
                        </div>
                        <div>
                            {!error.firstname
                                ? <TextField id="standard-basic" fullWidth
                                             label="First name" value={firstname}
                                             onChange={inputChange('firstname')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.firstname} fullWidth
                                           label="First name" value={firstname}
                                           onChange={inputChange('firstname')} variant="standard"/>}
                        </div>
                        <div>
                            {!error.lastname
                                ? <TextField id="standard-basic" fullWidth
                                             label="Last name" value={lastname}
                                             onChange={inputChange('lastname')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.lastname} fullWidth
                                           label="Last name" value={lastname}
                                           onChange={inputChange('lastname')} variant="standard"/>}
                        </div>
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
                        <div>
                            {!error.password2
                                ? <TextField id="standard-basic" fullWidth type="password"
                                             label="Confirm Password" value={password2}
                                             onChange={inputChange('password2')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.password2} fullWidth
                                           type="password"
                                           label="Confirm Password" value={password2}
                                           onChange={inputChange('password2')} variant="standard"/>
                            }
                        </div>
                    <Button type="submit" color="primary">
                        Sign up
                    </Button>
                    </Container>
                </form>
                <p>
                    Already have an account? <Link style={{color:'#2945CF'}} to="/login">Log in</Link>
                </p>
                <Link style={{color:'#2945CF'}} to="/about">Click here to learn more about Motives</Link>
            </div>
            </Navbar>
        </div>

    );
}

export default RegisterPage;
