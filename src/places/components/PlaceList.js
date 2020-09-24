import React from 'react';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = props => {
    if (!props.items) {
        return (
            <div className="place-list center">
                <Card className="card-white">
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        )
    }

    return (
        <ul className="place-list">
            {props.items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorID={place.creator}
                    coordinates={place.location}
                    onDelete={props.onDeletePlace}
                />
            ))
            }
        </ul>
    )
};

export default PlaceList;