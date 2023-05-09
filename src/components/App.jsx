import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { FormContact } from './FormContact/FormContact';
import { ContactList } from './ContactList/ContactList';
import { Layout } from './Layout/Layout';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    if (savedContacts.length > 0) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    );

    if (isDuplicate) {
      alert(`${newContact.name}: is already in contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Layout>
      <div>
        <h1>Phonebook</h1>
        <FormContact onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
      <GlobalStyle />
    </Layout>
  );
};

export default App;
