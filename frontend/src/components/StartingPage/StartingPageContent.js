import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import configObject from "../../config";
import AuthContext from "../../store/auth-context";
import UsersContext from "../../store/users-context";
import Table from "../Table/Table";
import Search from "./Search";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
    const [users, setUsers] = useState([]);
    const authCtx = useContext(AuthContext);
    const usersCtx = useContext(UsersContext);
    const [ searchedUsers, setSearchedUsers ] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch(configObject.BASE_URL + "/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token.token,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
                usersCtx.updateUsers(users);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            getUsers();
        }
    }, []);

    return (
        <section className={classes.starting}>
            {authCtx.isLoggedIn ? (
                users && (
                    <>
                        <Search setSearchedUsers={setSearchedUsers} />
                        <Table data={users} searched={searchedUsers} />

                    </>
                )
            ) : (
                <h3>
                    You are not an authenticated user. Please <Link to="/login">Login</Link>{" "}
                    to continue.
                </h3>
            )}
        </section>
    );
};

export default StartingPageContent;
