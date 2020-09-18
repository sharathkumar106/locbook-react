import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = props => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card className="card-white">
                    <h2>No places found. Maybe create one?</h2>
                    <Link to="/places/new">Share Place</Link>
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
                    image={place.imageURL}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorID={place.creator}
                    coordinates={place.location} />)
                )
            }
        </ul>
    )
};

export default PlaceList;