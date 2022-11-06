import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import configObject from "../../config";

import classes from "./AuthForm.module.css";

const RegisterForm = () => {
    const history = useHistory();

    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();
    const cityInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const RegisterHandler = async (event) => {
        event.preventDefault();

        const enteredFirstname = firstnameInputRef.current.value;
        const enteredLastname = lastnameInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
        try{
            const response = await fetch(configObject.BASE_URL + '/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    firstname: enteredFirstname,
                    lastname: enteredLastname,
                    city: enteredCity,
                    email: enteredEmail,
                    password: enteredPassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
            }else{
                alert("User created successfully!. Login to continue");
                history.push('/login');

            }
            return data;
        }catch(error){
            alert(error.message);
        }
    };
    return (
        <section className={classes.auth}>
            <h1>Register</h1>
            <form onSubmit={RegisterHandler}>
                <div className={classes.control}>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" id="firstname" ref={firstnameInputRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" id="lastname" ref={lastnameInputRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" ref={cityInputRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={emailInputRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" ref={passwordInputRef} required />
                </div>
                <div className={classes.actions}>
                    <button>Register</button>
                    <Link to="/login">
                        <button type="button" className={classes.toggle}>
                            Login with existing account
                        </button>
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default RegisterForm;
