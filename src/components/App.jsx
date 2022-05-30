import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage';
import InputForm from './InputForm/InputForm';
import ContactList from './ContactsList/ContactsList';
import Section from './Section/Section';
import Filter from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onInputChange = ev => {
    const { value } = ev.currentTarget;
    setFilter(value);
  };

  const onFormSubmit = data => {
    if (contacts.find(el => el.name === data.name)) {
      alert(`${data.name} is already in the list`);
      return;
    }
    setContacts(prev => [...prev, data]);
  };

  function filtered() {
    return contacts.filter(el => el.name.toLowerCase().includes(filter));
  }

  const onDeleteBtn = ev => {
    setContacts(prev => prev.filter(el => el.id !== ev.target.name));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 32,
        color: '#010101',
        marginLeft: 40,
      }}
    >
      <Section title="Phonebook" />
      <InputForm onSubmit={onFormSubmit} />
      <Section title="Contacts" />
      {contacts?.length > 0 && (
        <Filter onInput={onInputChange} filter={filter} />
      )}
      <ContactList
        options={filtered()}
        filter={filter.toLowerCase()}
        onDeleteClick={onDeleteBtn}
      />
    </div>
  );
}

export default App;
