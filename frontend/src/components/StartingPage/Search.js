import React, { useContext, useRef } from "react";
import UsersContext from "../../store/users-context";

const Search = ({ setSearchedUsers }) => {
    const searchInputRef = useRef();
    const usersCtx = useContext(UsersContext);

    const search = (keyword) => {
        const currentUsers = usersCtx.current_page_users;

        const searchedUsers = currentUsers.filter((user) => {
            return (
                user.firstname.toLowerCase().indexOf(keyword) > -1 ||
                user.lastname.toLowerCase().indexOf(keyword) > -1 || 
                user.city.toLowerCase().indexOf(keyword) > -1 || 
                user.email.toLowerCase().indexOf(keyword) > -1 
            );
        });

        setSearchedUsers(searchedUsers);
    };

    const onSearchHandler = (event) => {
        event.preventDefault();

        const enteredKeyword = searchInputRef.current.value;
        if (enteredKeyword !== "") {
            usersCtx.updateSearch(true);
            search(enteredKeyword.toLowerCase());
        } else {
            usersCtx.updateSearch(false);
        }
    };

    return (
        <div>
            <form onSubmit={onSearchHandler}>
                <label>
                    <input type="text" ref={searchInputRef}></input>
                    <button>Search</button>
                    <button onClick={(event)=>{
                        event.preventDefault();
                        searchInputRef.current.value = '';
                        setSearchedUsers([]);
                        usersCtx.updateSearch(false);

                    }}>Reset</button>
                </label>
            </form>
        </div>
    );
};

export default Search;
