import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageURL: 'https://lh5.googleusercontent.com/p/AF1QipOUyj7983L9cDPGUUsm_c1-KWrR2B80LhxOfBQZ=w433-h240-k-no',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lng: -73.98,
            lat: 40.75
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Another Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageURL: 'https://lh5.googleusercontent.com/p/AF1QipOUyj7983L9cDPGUUsm_c1-KWrR2B80LhxOfBQZ=w433-h240-k-no',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lng: -73.9845379,
            lat: 40.752736
        },
        creator: 'u2'
    },
    {
        id: 'p3',
        title: "New York Stock Exchange",
        description: "Where the money lives!",
        imageURL: "https://lh5.googleusercontent.com/p/AF1QipNQAI0pbRgTkSWO_nev3j05RyEIWBYj3OYFmYTA=w408-h306-k-no",
        address: "11 Wall St, New York, NY 10005, United States",
        location: {
            lat: 40.706877,
            lng: -74.0112654
        },
        creator: "u3"
    }

]

const UserPlace = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <PlaceList items={loadedPlaces} />
    )
};

export default UserPlace;