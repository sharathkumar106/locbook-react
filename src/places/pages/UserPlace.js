import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlace = () => {

    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, sendRequest } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {

        const fetchPlaces = async () => {
            let responseData;
            try {
                responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (error) {
                setLoadedPlaces(null);
            };
        };

        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces =>
            prevPlaces.filter(p => p.id !== deletedPlaceId)
        );
    }

    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner className="white-loader" />
                </div>
            )}
            {!isLoading && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
        </React.Fragment>
    )
};

export default UserPlace;