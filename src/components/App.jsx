import { useGetContactsQuery } from 'redux/api';
import InputForm from './InputForm/InputForm';
import ContactList from './ContactsList/ContactsList';
import Section from './Section/Section';
import Filter from './Filter/Filter';

function App() {
  const { data } = useGetContactsQuery();

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
      <InputForm />
      <Section title="Contacts" />
      {data?.length > 0 && <Filter />}
      <ContactList />
    </div>
  );
}

export default App;
