import React from "react";
import { useLocation } from 'react-router-dom';

function DeleteContact(props) {
    const location = useLocation();
    const {id, name, email } = location.state.contact;

    return (
        <div className="ui container" style={{ marginTop: "50px" }}>DeleteContact
            <div className="content">
                <div className="header">
                    {name}
                </div>
                <div className="description">{email}</div>

            </div>
            <div >
                <button className="ui button red" > Delete</button>
                <button className="ui button blue">Cancel</button>
            </div>
        </div>
    )
}

export default DeleteContact;