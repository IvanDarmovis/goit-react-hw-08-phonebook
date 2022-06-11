// import { useGetContactsQuery } from 'redux/api';
import { Route, Routes } from 'react-router-dom';
import InputForm from './InputForm/InputForm';
import ContactList from './ContactsList/ContactsList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import LoginForm from './LoginForm';
import { useGetContactsQuery } from '../redux/api';
import { useSelector } from 'react-redux';
import { token } from '../redux/reducer';

function App() {
  const { data } = useGetContactsQuery();
  // const storeToken = useSelector(state => state.user.token);
  // token.set(storeToken);

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
      <Filter />
      <ContactList />
      <LoginForm />
    </div>
  );
}

export default App;
