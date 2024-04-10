import React from "react";
import user from "../images/user.jpg"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ContactDetails = () => {
    const location = useLocation();
    const { name, email } = location.state.contact;

    return (
        <div className='main' style={{ marginTop: "100px" }}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header"> {name}</div>
                    <div className="description">{email}</div>
                </div>
                <div className="center-div">
                    <Link to ={"/"}>
                    <button className="ui button blue right">Back to Contact List</button>
                    </Link>
                    </div>

            </div>
        </div>
    );

};
export default ContactDetails;