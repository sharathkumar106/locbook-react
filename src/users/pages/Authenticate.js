import React, { useContext, useState } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Utils/Validator';

import './Authenticate.css'
import { AuthContext } from '../../shared/context/AuthContext';

const Authenticate = props => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

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
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name:undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }

        setIsLoginMode(prevMode => (!prevMode));
        console.log(isLoginMode)
    }

    const onAuthenticatonHandler = event => {
        event.preventDefault();
        auth.login();
        console.log("Authentication Success!");
    }

    return (
        <Card className="authentication card-white">
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
    );
};

export default Authenticate;