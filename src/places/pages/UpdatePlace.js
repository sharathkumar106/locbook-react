import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/components/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/Validator';

import './PlaceForm.css';

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
    }

]

const UpdatePlace = props => {
    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        }, false
    );

    const identfiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if(identfiedPlace){
            setFormData({
                title: {
                    value: identfiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identfiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);

    }, [setFormData, identfiedPlace]);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identfiedPlace) {
        return <div className="center">
            <Card className="card-white">
                <h2>Sorry! Place not found</h2>
            </Card>
        </div>
    }

    if (isLoading) {
        return <div className="center">
            <Card className="card-white">
                <h2>Loading...</h2>
            </Card>
        </div>
    }

    return <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" className="btn-center" disabled={!formState.isValid}>
            UPDATE PLACE
        </Button>
    </form>
};

export default UpdatePlace;