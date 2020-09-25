import React, { useContext, useState } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/Validator';

import './Authenticate.css'
import { AuthContext } from '../../shared/context/AuthContext';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Authenticate = props => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false);
        }

        setIsLoginMode(prevMode => (!prevMode));
    }

    const onAuthenticatonHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (error) { }
        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    formData
                );

                auth.login(responseData.userId, responseData.token);
            } catch (error) { }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication card-white">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2 className="authentication__header">Login Required!</h2>
                <hr />

                <form onSubmit={onAuthenticatonHandler}>
                    {!isLoginMode && (
                        <Input
                            id="name"
                            type="text"
                            element="input"
                            label="Your Name"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your name"
                            placeholder="Enter your name"
                        />
                    )}

                    {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please upload an image" />}

                    <Input
                        id="email"
                        type="text"
                        element="input"
                        label="Email ID"
                        placeholder="Enter your e-mail id"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Enter a valid e-mail id"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        type="password"
                        element="input"
                        label="Password"
                        placeholder="**********"
                        validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(20)]}
                        errorText="Passwords must be min. 8 characters and max. 20 characters long"
                        onInput={inputHandler}
                    />

                    <Button type="submit" className="btn-center" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                    </Button>
                </form>

                <Button inverse className="btn-center" onClick={switchModeHandler} >
                    {isLoginMode ? 'SIGN UP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    );
};

export default Authenticate;