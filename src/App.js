import './App.css';
import React, { useState } from "react";
import ReactDOM from "react-dom"
import validator from 'validator'
import { RequestService } from './services/request.service';
import { APIURLConstants } from './util/api.url.constants';


function App() {


    const [message, setMessage] = useState("");
    const [fields, setFields] = useState("");
    const [inputFieldError, setInputFieldError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState('')

    const handlePasswords = (password, confirmPassword) => {
        if(password === confirmPassword){
            if (validator.isStrongPassword(password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            })) {
                console.log('Is Strong Password')
                return true;
            } else {
                console.error('Is Not Strong Password')
                return false;
            }
        }
        }
    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlefirstNameChange = event => {
        setFirstName(event.target.value)

    };
    const handlelastNameChange = event => {
        setLastName(event.target.value)
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value)
    };
    function errorComponent() {
        return (
            <div> {message} +:
                <br> </br>
                {inputFieldError}
            </div>
        );
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log("firstname"  + firstName)
        console.log("lastname"  + lastName)
        console.log("email"  + email)
        console.log("password"  + password)
        console.log("confirm password"  + confirmPassword)

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password:password,
            confirmPassword:confirmPassword
        };

        if(firstName.length <= 12){
            setFields("firstName, ");
            if(lastName.length <= 16){
                setFields(fields + "lastName, ");
                if(handlePasswords(password, confirmPassword)){
                    setFields(fields + "password or Confirm Password");
                    setMessage(fields);
                    RequestService.postRequest(APIURLConstants.REGISTER, data)
                        .then(response => {
                            if (response.status === 200) {
                                console.log("");
                            }
                        })
                        .catch(e => {
                            console.log("error")
                        });
                }
            }
        } else {
            setMessage(`Following Input fields not correct: ${inputFieldError}`)
            ReactDOM.render(<errorComponent />, document.getElementById("root"));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first name"
                        placeholder="Enter first name"
                        onChange={handlefirstNameChange}
                        value={firstName}
                    />
                </div>
                <div>
                    <label>last name</label>
                    <input
                        type="text"
                        name="last name"
                        placeholder="Enter Last name"
                        onChange={handlelastNameChange}
                        value={lastName}
                    />
                </div>
                <div>
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter confirm Password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                    />
                </div>
                <button  type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}

export default App;