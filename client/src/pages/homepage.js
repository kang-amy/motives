import * as Scroll from 'react-scroll';
import '../App.css';
import MapComponent from '../components/map';
import Feed from "../components/feed";
import {Container} from "@material-ui/core";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest"
import {useEffect, useState} from "react";
import {baseURL} from "../CONSTANTS";
import Navbar from "../components/navbar";


function Homepage(props) {

    const [posts, setPosts] = useState([]);
    const [loadFeed, setLoadFeed] = useState(false);

    useEffect(()=>{
        setTimeout(function() {
            setLoadFeed(true);
        }, 500);
    },[])


    let getPublicPosts = async () =>{
        try{
            let posts = (await authenticatedGetRequest(baseURL + '/api/post/getpublic',{})).data.posts;
            setPosts(posts)
        }
        catch (e) {
        }

    }
    let getPrivatePosts = async () =>{
        try{
            let posts = (await authenticatedGetRequest(baseURL+'/api/post/getfollowing',{})).data.posts;
            setPosts(posts)
        }
        catch (e) {
        }
    }

    let getGoingToPosts = async () =>{
        try{
            let posts = (await authenticatedGetRequest(baseURL+'/api/post/postsimgoingtofull',{})).data.posts;
            setPosts(posts)
        }
        catch (e) {
        }
    }
    useEffect(async ()=>{
        await refreshPosts()

    },[props.feedType])

    const refreshPosts = async ()=>{

            if(props.feedType == 1){
                return await getPublicPosts();
            }
            if(props.feedType == 2)
            {
                return await getGoingToPosts();
            }

        await getPrivatePosts();

    }
    return (
            <div >
                <Navbar{...props} hideSearch={false}>
                <Container>
                    <MapComponent firstMap={true} markers={posts?posts.map(post=>({id:post._id, position:{lat:post.location.coordinates[1], lng:post.location.coordinates[0]}})):[]} mainMap={true}/>
                    {loadFeed? <Feed setPosts={setPosts} {...props} posts={posts} publicFeed={props.feedType}></Feed> : <></>}
                </Container>
                </Navbar>
            </div>
    );
}

export default Homepage;
