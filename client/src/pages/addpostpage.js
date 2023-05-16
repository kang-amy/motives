import '../App.css';
import Button from "@material-ui/core/Button";
import { useHistory} from "react-router-dom";
import {useState} from "react";
import {Box, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import {authenticatedPostRequest} from "../utils/authentication/authenticatedRequest";
import {baseURL} from "../CONSTANTS";
import NewMap from "../components/newMap/newMap";
import Navbar from "../components/navbar";
import {Container, Heading, useMediaQuery} from "@chakra-ui/react";
import {scroller} from "react-scroll";
import DatePicker from "../components/datepicker/date-picker";

function AddPostPage(props) {
    //Init

    const history = useHistory()

    //States
    const [title, setTitle] = useState('');
    const [seeWhosGoing, setSeeWhosGoing] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [description, setDescription] = useState('');
    const [eventStart, setEventStart] = useState(Date.now())
    const [eventEnd, setEventEnd] = useState(Date.now())
    const [location, setLocation] = useState({
        lat: 43.4723,
        lng: -80.5449
    })
    const [address, setAddress] = useState('200 University Ave W, Waterloo, ON N2L 3G1')
    const [error, setError] = useState({})


    //functions
    const inputChange = (state) => {
        let callback;
        switch (state) {
            case 'title':
                callback = (target) => setTitle(target.value);
                break;
            case 'description':
                callback = (target) => setDescription(target.value);
                break;
            case 'eventStart':
                callback = (target) => setEventStart(target.value);
                break;
            case 'eventEnd':
                callback = (target) => setEventEnd(target.value);
                break;

            default:
                callback = () => {
                };
        }
        return e => callback(e.target);
    }
    const onPostSubmit = e => {
        e.preventDefault();
        authenticatedPostRequest(baseURL + '/api/post/createpost', {
            title,
            group: isPublic ? 0 : 1,
            description,
            eventStart: new Date(eventStart),
            eventEnd: new Date(eventEnd),
            location,
            seeWhosGoing,
            address
        }).then(() => {
            history.push('/')
        }).catch(err => {
            setError(err.errors)
            scroller.scrollTo('topOfPage', {duration: 1500,
                delay: 100,
                smooth: true,})
        })
    };

    return (

        <div id={'topOfPage'}>
            <Navbar{...props} hideSearch={false}>
            <div style={{marginTop: "50px"}}>
                <form noValidate onSubmit={onPostSubmit}>
                    <Container>

                        <Heading >Post Your Motive</Heading>
                        <p style={{color: "red"}}>{error.date}</p>

                        <br/>
                        <DateTimePicker eventStart={eventStart} setEventEnd={setEventEnd} setEventStart={setEventStart} eventEnd={eventEnd} inputChange={inputChange}/>
                        <br />

                        <FormLabel component="legend" style={{marginTop:'20px', }}>Do you want to make this post private or public?</FormLabel>
                        <RadioGroup value={isPublic ? "public" : "private"}
                                    onChange={(e) => setIsPublic(e.target.value === "public")}>
                            <FormControlLabel value="public" control={<Radio color='primary'/>} label="Public"/>
                            <FormControlLabel value="private" control={<Radio color='primary'/>} label="Private"/>
                        </RadioGroup>

                        <FormLabel component="legend" style={{marginTop:'20px'}}>Do you want to let others see who's going?</FormLabel>
                        <RadioGroup value={seeWhosGoing ? "Yes" : "No"}
                                    onChange={(e) => setSeeWhosGoing(e.target.value === "Yes")}>
                            <FormControlLabel value="Yes" control={<Radio color='primary'/>} label="Yes"/>
                            <FormControlLabel value="No" control={<Radio color='primary'/>} label="No"/>
                        </RadioGroup>

                        <NewMap setLocation={setLocation} setAddress={setAddress}/>

                        <div>
                            {!error.title
                                ? <TextField id="standard-basic" fullWidth
                                             label="Title" value={title}
                                             onChange={inputChange('title')} variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.title} fullWidth
                                           label="Title" value={title}
                                           onChange={inputChange('title')} variant="standard"/>}
                        </div>

                        <div>
                            {!error.description
                                ? <TextField fullWidth
                                             label="Description" value={description}
                                             onChange={inputChange('description')} id="filled-multiline-static"
                                             multiline
                                             rows={4}
                                             variant="standard"/>
                                :
                                <TextField error id="standard-error-helper-text" helperText={error.description}
                                           fullWidth

                                           label="Description" value={description}
                                           onChange={inputChange('description')} variant="standard"/>}
                        </div>
                    </Container>
                    <Button type="submit" color="primary">
                        Create Post
                    </Button>
                    <div style={{height:'100px'}}></div>
                </form>
            </div>
            </Navbar>
        </div>

    );
}

function DateTimePicker({eventStart, setEventStart, eventEnd, setEventEnd, inputChange}){
    let sBrowser, sUsrAg = navigator.userAgent;
    //for desktop safari
    if((sUsrAg.indexOf("Safari") > -1
        && sUsrAg.indexOf("Chrome") == -1
        && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ))){
        return (
            <><DatePicker
                timeIntervals={5}
                showTimeSelect
                selected={eventStart}
                onChange={(date) => setEventStart(date)}
                dateFormat="MM/dd/yyyy h:mm aa"
            />
                <br/>
                <DatePicker
                    timeIntervals={5}
                    showTimeSelect
                    selected={eventEnd}
                    onChange={(date) => setEventEnd(date)}
                    dateFormat="MM/dd/yyyy h:mm aa"
                /></>
        )
    }
    //for other browsers
       return (<> <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            value={eventStart}
            InputLabelProps={{
                shrink: true,
            }}
            style={{width:'100%'}}
            onChange={inputChange('eventStart')}


        />
            <br/>
            <TextField
                style={{marginTop:'20px',width:'100%'}}
                id="datetime-local"
                label="End Date"
                type="datetime-local"
                value={eventEnd}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={inputChange('eventEnd')}

            /></>)
}

export default AddPostPage;
