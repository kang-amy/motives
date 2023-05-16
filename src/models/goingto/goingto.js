const Eventsgoingto = require("../schema/eventsgoingto")
const Whosgoing = require("../schema/whosgoing")
const createGoingTo = async (post) => {
    const whosgoing = new Whosgoing({
        postid: post._id,
        userid: post.userid,
        username: post.username,
        useremail: post.useremail,
        guests: [],
    })

    await whosgoing.save();
}

const deleteGoingTo = async (post, id) => {
    let data;
    await Eventsgoingto.findOne({userid: id}).then((ret) => {
        data = ret;
    })

    if (!data) data = {userid: id, posts: []}
    data.posts = data.posts.filter((postid) => postid !== post);
    await Eventsgoingto.updateOne({userid: id}, data, {upsert: true})

    await Whosgoing.findOne({postid: post}).then((ret) => {
        data = ret;
    })
    data.guests = data.guests.filter((userid) => userid !== id)
    await Whosgoing.updateOne({postid: post}, data, {upsert: true});
}

const insertGoingTo = async (post, id) => {
    let data;

    await Eventsgoingto.findOne({userid: id}).then((ret) => {
        data = ret;
    })
    if (data && data.posts.indexOf(post) !== -1) return;
    if (!data) data = {userid: id, posts: []}
    data.posts.push(post)
    await Eventsgoingto.updateOne({userid: id}, data, {upsert: true})

    await Whosgoing.findOne({postid: post}).then((ret) => {
        data = ret;
    })
    data.guests.push(id);
    await Whosgoing.updateOne({postid: post}, data, {upsert: true});
}

const getGoingTo = async (id) => {
    let data;
    await Eventsgoingto.findOne({userid: id}).then((ret) => {
        data = ret;
    })
    if(data === null)data = {
        posts:[]
    }
    return data
}

module.exports = {
    getGoingTo,
    createGoingTo,
    deleteGoingTo,
    insertGoingTo
}