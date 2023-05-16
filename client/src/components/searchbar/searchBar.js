import React, { useState } from "react";
import "./searchbar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import {Icon} from "@chakra-ui/react";
import {AiOutlineClose} from "react-icons/all";
import {capitalizeFirstLetter} from "../../utils/stringUtils";

function SearchBar({ searchUser,placeholder, data }) {
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        searchUser(searchWord);

    };

    const clearInput = () => {
        searchUser("");
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {data.length === 0 ? (
                        <></>
                    ) : (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'white',
                            }}

                            as={AiOutlineClose}
                         onClick={clearInput} />
                    )}
                </div>
            </div>
            {data.length != 0 && (
                <div className="dataResult">
                    {data.map((value, key) => {
                        return (
                            <Link className="dataItem" to={value.link}>
                                <p>{capitalizeFirstLetter(value.title)} </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;