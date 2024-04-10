import React from "react";
import user from "../images/user.png"
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className='ui item'>
            <div className='content' style={{ marginTop: "50px" }}>
                <img className="ui avatar images" src={user} alt="user" height="30px" width="30px" />

                <Link to = {`/contact/${id}` } state = {{ contact: props.contact }} >
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
                <Link to ={`/edit`} state={{contact: props.contact}}>
                <i className='edit alternate outline icon'
                    style={{ color: "blue", marginTop: "7px", marginRight:"5px" }}
                ></i>
                </Link>
                      <i className='trash alternate outline icon'
                    style={{ color: "red", marginTop: "7px" }}
                    onClick={() => props.clickHandler(id)}></i>
                {/* </Link> */}
            </div>
        </div>
    );

}

export default ContactCard;