import '../App.css';
import MapComponent from '../components/map';
import Feed from "../components/feed";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest"
import {useEffect, useState} from "react";
import {baseURL} from "../CONSTANTS";
import {useParams} from "react-router-dom";
import ProfileHeader from "../components/profileHeader";
import Navbar from "../components/navbar";
import {Container} from "@material-ui/core";




function ProfilePage(props) {
    const [following, setFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
    const [otherUserId, setOtherUserId] = useState('');
    const [userFound, setUserFound] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const {username} = useParams();

    useEffect(async () => {
        getProfileDetails(username).then(async (userDetails) => {
            if(userDetails.errors){
                return setUserFound(false);
            }
            setName(userDetails.firstname + " " + userDetails.lastname);
            setUserFound(true);
            setOtherUserId(userDetails.id);
            const ret = await getPosts(userDetails.id);
            setPosts(ret.posts);
            setIsFollowing(ret.isFollowing);
        })

    }, [])


    const getProfileDetails = async (user) => {
        return (await authenticatedGetRequest(baseURL + '/api/search/getpublicuserdetailsusername/'+user,{})).data;
    }

    const getPosts = async (id) => {
        return (await authenticatedGetRequest(baseURL + '/api/follow/getuserposts/'+id, {})).data
    }

    return (
        <div>
            <Navbar{...props} hideSearch={false}>
            {userFound
                ? <Container>
                    <ProfileHeader user={props.user} otherUser={username} isFollowing={isFollowing} otherUserId={otherUserId}/>
                    <MapComponent firstMap={true} markers={posts ? posts.map(post => ({
                        id: post._id,
                        position: {lat: post.location.coordinates[1], lng: post.location.coordinates[0]}
                    })) : []} mainMap={true}/>
                    <Feed setPosts={setPosts}{...props} posts={posts}></Feed>
                </Container>
                :<Container>
                    <h3>User not found</h3>
                </Container>
            }
            </Navbar>
        </div>
    )
}

export default ProfilePage;
