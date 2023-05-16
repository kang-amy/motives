import './App.css';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {Redirect} from "react-router";
import Homepage from "./pages/homepage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginpage";
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/authentication/setAuthToken";
import AddPostPage from "./pages/addpostpage";
import ProfilePage from "./pages/profilepage";
import RegisteredPage from "./pages/registeredpage";
import FollowRequestsPage from "./pages/followrequestspage";
import ListFollowersPage from "./pages/listfollowerspage";
import PostDetailsPage from "./pages/postdetailspage";
import {useLoadScript} from "@react-google-maps/api";
import Navbar from "./components/navbar";
import {Heading, Link, useColorMode} from "@chakra-ui/react";
import AboutPage from "./pages/aboutpage";

function App() {
    const { colorMode, toggleColorMode } = useColorMode();
    let decodedJwtUser = null;
    if (localStorage.getItem('accessToken')) {
        decodedJwtUser = jwtDecode(localStorage.getItem('accessToken')).username
        setAuthToken(localStorage.getItem('accessToken'))
    }
    const history = useHistory();
    const [user, setUser] = useState(decodedJwtUser)
    useEffect(()=>{if(colorMode==='dark'){
        toggleColorMode();
    }},[])
    const login = () => {
        if (localStorage.getItem('accessToken')) {
            decodedJwtUser = jwtDecode(localStorage.getItem('accessToken')).username
            setAuthToken(localStorage.getItem('accessToken'))
        }
        setUser(decodedJwtUser)
    }

    const logout = () => {
        setUser(null);
        setAuthToken()
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    return (

        <Router>
            <div className="App">
                {user
                    ? <Switch>
                        <Route exact path="/about">
                            <AboutPage user={user} onLogout={logout}></AboutPage>
                        </Route>
                        <Route exact path="/following">
                            <Homepage user={user} feedType={0}onLogout={logout}></Homepage>
                        </Route>
                        <Route exact path="/">
                            <Homepage user={user} feedType={1}onLogout={logout}></Homepage>
                        </Route>
                        <Route exact path="/imgoingto">
                            <Homepage user={user} feedType={2}onLogout={logout}></Homepage>
                        </Route>
                        <Route exact path="/addpost">
                            {user ? <AddPostPage user={user} onLogout={logout}></AddPostPage> : <Redirect to="/login"/>}
                        </Route>
                        <Route path="/profile/:username">
                            <ProfilePage user={user} onLogout={logout}/>
                        </Route>
                        <Route path="/followers/:username">
                            <ListFollowersPage followers={true} user={user} onLogout={logout}/>
                        </Route>
                        <Route path="/following/:username">
                            <ListFollowersPage followers={false} user={user} onLogout={logout}/>
                        </Route>
                        <Route exact path="/followrequests">
                            <FollowRequestsPage user={user} onLogout={logout}></FollowRequestsPage>
                        </Route>
                        <Route exact path="/post/:id">
                            <PostDetailsPage user={user} onLogout={logout}></PostDetailsPage>
                        </Route>
                        <Route path="/*">
                            <Navbar user={user} onLogout={logout}>
                            <Heading> <Link href={'/'}>Page Not Found! Click Here to return to the Home Page</Link></Heading>
                            </Navbar>
                        </Route>
                    </Switch>
                    : <Switch>
                        <Route exact path="/about">
                            <AboutPage ></AboutPage>
                        </Route>
                        <Route exact path="/Register">
                            <RegisterPage onLogin={login}></RegisterPage>
                        </Route>
                        <Route exact path="/registered">
                            <RegisteredPage></RegisteredPage>
                        </Route>
                        <Route exact path="/login">
                            <LoginPage onLogin={login}></LoginPage>
                        </Route>
                        <Route path="/*">
                            <Redirect to="/login"/>
                        </Route>
                    </Switch>}

            </div>
        </Router>

    );
}

export default App;
