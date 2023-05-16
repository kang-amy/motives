import {useEffect, useState} from "react";
import {authenticatedGetRequest, authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import Post from "./post";

function Feed(props) {
    const [goingTo, setGoingTo] = useState([]);
    useEffect(async ()=>{
        const ret = (await authenticatedGetRequest(baseURL+'/api/post/postsimgoingtolist')).data.posts
        setGoingTo(ret);
    },[props.posts])

    const onDelete = (id) =>{
        return async ()=>{
            await authenticatedPostRequest(baseURL+'/api/post/delete/' + id);
            props.setPosts(props.posts.filter(post => post._id !== id))
        }
    }
    return (
        <div>
            {props.posts.length!==0? props.posts.map(post => {
               return  <Post onDelete={onDelete(post._id)}{...props} {...post} goingTo={goingTo.indexOf(post._id) !== -1} key={post._id}/>
            }):<p>No Events Found</p>}
        </div>
    );
}

export default Feed