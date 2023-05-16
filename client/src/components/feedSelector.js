import React from 'react';
import Button from "@material-ui/core/Button"

function FeedSelector(props) {

    return (
        <div  style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>

            <div style={{
                display: 'flex',
                justifyContent: 'left',
            }}>
                <Button onClick = {()=>props.setPublicFeed(0)}><h3>Following</h3></Button>
                <Button onClick = {()=>props.setPublicFeed(1)}><h3>Public</h3></Button>
                <Button onClick = {()=>props.setPublicFeed(2)}><h3>Events I'm going to</h3></Button>

            </div>
            <Button onClick = {props.refreshPosts}><h3>Refresh
             Posts</h3></Button>
        </div>


    );
}

export default FeedSelector;