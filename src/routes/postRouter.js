const express = require("express")
const PostRouter = express.Router();
const Post = require("../models/schema/post")
const {getWhosGoing} = require("../models/whosgoing/seeWhosGoing");
const {canSeeWhosGoing} = require("../models/post/seeWhosGoing");
const {getGoingTo} = require("../models/goingto/goingto");
const {getGoingToPosts} = require("../models/post/getPosts");
const {deleteGoingTo} = require("../models/goingto/goingto");
const {insertGoingTo} = require("../models/goingto/goingto");
const {validatePost} = require("../models/post/inputValidation");
const {getPostDetails} = require("../models/post/getPosts");
const {getPublicPosts} = require("../models/post/getPosts");
const {getFollowingPosts} = require("../models/post/getPosts");
const {createPost} = require("../models/post/createPost");
PostRouter.post('/createpost', async (req, res, next) => {
    const {
        user,
        title,
        group,
        description,
        eventStart,
        eventEnd,
        location,
        seeWhosGoing,
        address
    } = req.body;
    const post = new Post({
        seeWhosGoing,
        userid: user.id,
        username: user.username,
        useremail: user.email,
        location: {
            type: 'Point',
            coordinates: [location.lng, location.lat]
        },
        address,
        title,
        group,
        description,
        eventStart,
        eventEnd,
    })
    let errors = await validatePost(post)
    if (!errors.isValid) {
       return next({
            code: 400,
            errors: errors.errors
        });
    }
    createPost(post)
        .then(() => next({
            code: 200
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            });
        })
})

PostRouter.get('/getfollowing', (req, res, next) => {
    const {user} = req.body;
    getFollowingPosts(user.id)
        .then((ret) => next({
            code: 200,
            data: {posts: ret}
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.get('/getpublic', async (req, res, next) => {
    const {user} = req.body;
    getPublicPosts()
        .then((ret) => next({
            code: 200,
            data: {posts: ret}
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.get('/postsimgoingtofull', async (req, res, next) => {
    const {user} = req.body;
    getGoingToPosts(user.id)
        .then((ret) => next({
            code: 200,
            data: {posts: ret}
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.get('/postsimgoingtolist', async (req, res, next) => {
    const {user} = req.body;
    getGoingTo(user.id)
        .then((ret) => next({
            code: 200,
            data: {posts: ret.posts}
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.get('/getpost/:postid', (req, res, next) => {
    const {user} = req.body;
    const {postid} = req.params;

    getPostDetails(user.id, postid)
        .then((ret) => next({
            code: 200,
            data: ret
        }))
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.post('/imgoing', async (req, res, next) => {
    const {user, postId, going} = req.body;
    if (going) {
        await insertGoingTo(postId, user.id)
    } else {
        await deleteGoingTo(postId, user.id)
    }
    next({
        code: 200
    })
})


PostRouter.get('/whosgoinglist/:postid', async (req, res, next) => {
        const {user} = req.body;
        const {postid} = req.params;

        // check if has permissions
        try {
            if (!(await canSeeWhosGoing(user.id, postid))) return next({
                code: 400,
                errors: {error:'err'}
            });

            //return going list
            let ret = await getWhosGoing(postid);
            next({
                code: 200,
                data: {whosGoing: ret}
            });
        } catch {
            next({
                code: 400
            })
        }
    }
)

PostRouter.post('/delete/:postid', async (req,res, next)=>{
    const {user} = req.body;
    const {postid} = req.params;

    getPostDetails(user.id, postid)
        .then(async(ret) => {
            if(user.id != ret.post.userid && user.id != '61cd4c622b06aac67ca99808') throw new Error;
            await Post.findByIdAndDelete(ret.post._id);
            next({
                code: 200,
            })
        })
        .catch(err => {
            next({
                code: 400,
                errors: {error: err}
            })
        });
})

PostRouter.post('/test', (req, res, next) => {
    res.send(200)
})


module.exports = {PostRouter}