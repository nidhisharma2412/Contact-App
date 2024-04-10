import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddContact from './AddContact';
import './App.css';
import ContactList from './ContactList';
import api from '../api/Contacts'
import Header from './Header';
import ContactDetails from './ContactDetails';
import DeleteContact from './DeleteContact';
import { all } from 'axios';
import EditContact from './EditContact';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? { ...response.data } : contact;
    }));

  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    if (contacts.length !== 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className=' ui container '>
      <Header />
      < Router >
        <Routes>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} navigate={useNavigate} />} />
          <Route path='/' element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path='/contact/:id' element={<ContactDetails />} />
          <Route path='/delete/:id' element={<DeleteContact />} />
          <Route path='/edit' element={<EditContact updateContactHandler={updateContactHandler} />} />
        </Routes>
      </Router >
    </div >
  );
}

export default App;
