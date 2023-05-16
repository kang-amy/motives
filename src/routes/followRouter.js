const express = require("express")
const {getUserPublicPosts} = require("../models/post/getPosts");
const {isPendingIn} = require("../models/following/pending");
const {isFollowing} = require("../models/following/followin");
const {getUserPosts} = require("../models/post/getPosts");
const {getPendingOut} = require("../models/following/pending");
const {getPendingIn} = require("../models/following/pending");
const {denyRequest} = require("../models/following/pending");
const {acceptRequest} = require("../models/following/pending");
const {addFollowRequest} = require("../models/following/pending");
const {unfollow} = require("../models/following/followout");
const {removeFollower} = require("../models/following/followin");
const {getFollowing} = require("../models/following/followout");
const {getFollowers} = require("../models/following/followin");
const FollowRouter = express.Router();

FollowRouter.get('/getfollowers/:id', async (req, res, next) => {
    const {
        user,
    } = req.body;
    const {id} = req.params
    const followers = await getFollowers(id || user.id);
    next({
        code: 200,
        data: {
            followers: followers
        }
    });

})

FollowRouter.get('/getfollowing/:id', async (req, res, next) => {
    const {
        user,
    } = req.body;
    const {id} = req.params
    const following = await getFollowing(user.id);
    next({
        code: 200,
        data: {
            following: following
        }
    });
})

FollowRouter.post('/followrequest', async (req, res, next) => {
    const {
        user,
        otherUser
    } = req.body;
    await addFollowRequest(user.id, otherUser);
    next({
        code: 200
    });
})

FollowRouter.post('/denyrequest', async (req, res, next) => {
    const {
        user,
        otherUser
    } = req.body;
    await denyRequest(user.id, otherUser);
    next({
        code: 200
    });
})

FollowRouter.post('/acceptrequest', async (req, res, next) => {
    const {
        user,
        otherUser
    } = req.body;
    await acceptRequest(user.id, otherUser);
    next({
        code: 200
    });
})

FollowRouter.get('/pendingin', async (req, res, next) => {
    const {
        user
    } = req.body
    let ret = await getPendingIn(user.id);
    next({
        code: 200,
        data:
            {
                pendingIn: ret
            }
    });
})

FollowRouter.get('/pendingout', async (req, res, next) => {
    const {
        user
    } = req.body
    let ret = await getPendingOut(user.id);
    next({
        code: 200,
        data:
            {
                pendingOut: ret
            }
    });
})

FollowRouter.post('/unfollow', async (req, res, next) => {
    const {
        user,
        otherUser,
    } = req.body;
    await unfollow(user.id, otherUser);
    await removeFollower(otherUser, user.id);
    next({
        code: 200
    });
})

FollowRouter.post('/removefollower', async (req, res, next) => {
    const {
        user,
        otherUser,
    } = req.body;
    await removeFollower(user.id, otherUser);
    await unfollow(otherUser, user.id);
    next({
        code: 200
    });
})

FollowRouter.get('/getuserposts/:otherUser', async (req, res, next) => {
    const {otherUser} = req.params;
    const {user} = req.body
    if (!(await isFollowing(user.id, otherUser))) {
        return await getUserPublicPosts(otherUser).then((ret) => {
            res.status(200).json({posts: ret, isFollowing: false});
        }).catch((e) => {
            return res.status(401).json({error: "No User Found"})
        });

    }
    let ret = await getUserPosts(otherUser);
    next({
        code: 200,
        data:
            {
                posts: ret,
                isFollowing: true
            }
    });
})


FollowRouter.get('/relationship/:otherUser', async (req, res, next) => {
    const {otherUser} = req.params;
    const {user} = req.body;
    const following = await isFollowing(user.id, otherUser);
    const follower = await isFollowing(otherUser, user.id);
    const pendingIn = await isPendingIn(user.id, otherUser);
    const pendingOut = await isPendingIn(otherUser, user.id)

    const ret = {
        following: (following ? 2 : pendingOut ? 1 : 0),
        follower: (follower ? 2 : pendingIn ? 1 : 0)
    }
    next({
        code: 200,
        data: ret
    });

})

module.exports = {FollowRouter}



