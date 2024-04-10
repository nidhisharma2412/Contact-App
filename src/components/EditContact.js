import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = ({ updateContactHandler }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id, name, email } = location.state.contact;
    const [state, setState] = useState({ id, name, email });

    const update = (e) => {
        e.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All fields are mandatory");
            return;
        }
        updateContactHandler(state);
        setState({ name: "", email: "" });
        navigate("/");
    };

    return (
        <div className='ui main' style={{ marginTop: "50px" }}>
            <h2>Edit Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name='name' placeholder='Name' value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                    <label>Email</label>
                    <input type='text' name='email' placeholder='Email' value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
                </div>
                <button className='ui button blue'>Update</button>
            </form>
        </div>
    );
};

export default EditContact;
