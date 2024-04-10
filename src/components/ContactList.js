import React, { useRef } from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

const ContactList = (props) => {
    const inputElement = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const getSearchTerm = () => {
        props.searchKeyword(inputElement.current.value);
    }

    const renderList = props.contacts.map((contact) => {
        return <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />;

    });
    return (
        <div className='main' style={{ marginTop: "50px" }}>
            <h2>Contact List</h2>
            <Link>
                <div className='ui right'>
                    <button className='ui button blue right floated blue'>Add Contact</button>
                </div>
            </Link>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input type="text" ref={inputElement} value={props.term} placeholder='Search Contacts' className='prompt' onChange={getSearchTerm} />
                    <i className='search icon'></i>
                </div>
            </div>
            <div className='ui celled list'>{renderList.length > 0 ? renderList : "No Contacts available"}</div>
        </div>

    );
}

export default ContactList;