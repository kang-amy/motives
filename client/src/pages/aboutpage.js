import Navbar from "../components/navbar";

import {
    Box,
    Heading,
    Container,
    Text,
    Stack,
    Icon,
    SimpleGrid,
    HStack,
    VStack, Link
} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import {FiClock} from "react-icons/all";

const features = [
    {
        id: 1,
        made: true,
        title: 'Mobile and Desktop Websites ',
        text: 'Motives has different interfaces so it can be used on both your phone or computer',
    }, {
        id: 2,
        made: true,
        title: 'Shareable Profile and Event Links',
        text: 'To share your profile or event, all you need to do is copy and paste the link in your url bar',
    }, {
        id: 3,
        made: true,
        title: 'My Motives Tab',
        text: 'Keep track of all your upcoming motives using the my motives tab',
    }, {
        id: 4,
        made: true,
        title: 'Private and Public Events',
        text: 'Post events for everyone to see or just for your followers',
    }, {
        id: 5,
        made: true,
        title: 'Explore Map',
        text: "Click on the map markers to explore local events in the Explore tab"
    },{
        id: 11,
        made: true,
        title: 'Search Users',
        text: "Search for your friends using the search users feature"
    },
    {
        id: 6,
        made: false,
        title: 'Friend Groups ',
        text: 'Host events and filter the invite list by friend groups.',
    }, {
        id: 7,
        made: false,
        title: 'Direct Messages ',
        text: 'Direct message any other user on the platform.',
    }, {
        id: 8,
        made: false,
        title: 'Link to Instagram',
        text: 'Link your account to instagram, making it easier to find your followers',
    }, {
        id: 9,
        made: false,
        title: 'Payments',
        text: 'You’ll be able to receive payments online in advance for any event you host',
    }, {
        id: 0,
        made: false,
        title: 'QR Codes',
        text: 'Automatically generate a QR code that only participant lists can receive and scan at arrival ',
    },
]

export default function AboutPage(props) {
    return (
        <Navbar{...props} hideSearch={!props.user}>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{base: 8, md: 14}}
                    py={{base: 20, md: 36}}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
                        lineHeight={'110%'}>
                        Plan and Share Events with <br/>
                        <Text as={'span'} bgGradient='linear(to-l, #2945CF, #1BAEE3)'
                              bgClip='text'>
                            Motives!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        <Text as={'span'} bgGradient='linear(to-l, #2945CF, #1BAEE3)'
                              bgClip='text'>
                            Motives
                        </Text> is an event planning platform that makes it easier for you to host a Motive or find
                        Motive near you. Motives can be posted as public events for everyone to see or private events
                        for your followers only. Use the <strong>Post a Motive</strong> feature to host your own events
                        or find publicly posted motives near you on the <strong>Explore</strong> tab map! You can also
                        find out what private events the people you follow are hosting in
                        the <strong>Following</strong> tab. Finally, let the host know you're going to an event using
                        the <strong>I'm Going</strong> button and keep track of the events you're going to using
                        the <strong>My Motives</strong> tab.
                    </Text>

                </Stack>
                <Box >
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={'3xl'}>Features</Heading>
                        <Text color={'gray.600'} fontSize={'xl'}>
                            Motives is a user-centric platform. Any recommendation you have will be noted down and most likely implemented to better the overall experience of the platform! Here's a list of some of our current features (<Icon color={'green.400'}  as={CheckIcon}/>) and features that are coming very soon (<Icon as={FiClock}/>)!
                        </Text>
                    </Stack>

                    <Container maxW={'6xl'} mt={10}>
                        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={10}>
                            {features.map((feature) => (
                                <FeatureCard key={feature.id} feature={feature} />
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>
            </Container>
        </Navbar>
    )
}

function FeatureCard({feature}){
    return (
        <HStack key={feature.id} align={'top'}>
            <Box color={feature.made?'green.400':''} px={2}>
                <Icon as={feature.made?CheckIcon:FiClock}/>
            </Box>
            <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
            </VStack>
        </HStack>
    )
}



