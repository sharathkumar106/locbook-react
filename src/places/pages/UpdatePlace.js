import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/AuthContext';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/Validator';

import './PlaceForm.css';

const UpdatePlace = props => {
    const auth = useContext(AuthContext);
    const placeId = useParams().placeId;
    const [loadedPlace, setLoadedPlace] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

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

    useEffect(() => {
        const fetchPlace = async () => {
            const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
            setLoadedPlace(responseData.place);

            setFormData({
                title: {
                    value: responseData.place.title,
                    isValid: true
                },
                description: {
                    value: responseData.place.description,
                    isValid: true
                }
            }, true);
        }
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);


    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/places/${auth.userId}/${placeId}`, 'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push(`/${auth.userId}/places`)
        } catch (error) { };
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner className="white-loader" />
            </div>
        )
    }
    if (!loadedPlace && !error) {
        return <div className="center">
            <Card className="card-white">
                <h2>Sorry! Place not found</h2>
            </Card>
        </div>
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (min 5 characters)."
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" className="btn-center" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    )
};

export default UpdatePlace;