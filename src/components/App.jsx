import InputForm from './InputForm/InputForm';
import ContactList from './ContactsList/ContactsList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserMenu from './UserMenu';
import { OnlyPublicPath, PrivatePath } from './services/redirect';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../redux/api';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.contacts.list);
  const isLoggedIn = useSelector(state => state.user.isLogged);

  useEffect(() => {
    if (isLoggedIn)
      setTimeout(() => {
        dispatch(getContacts());
      }, 0);
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <UserMenu />
      <Routes>
        <Route
          element={
            <OnlyPublicPath isLoggedIn={isLoggedIn} redirectPath="/contacts" />
          }
        >
          <Route index path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
        </Route>
        <Route
          element={
            <PrivatePath isLoggedIn={isLoggedIn} redirectPath="/login" />
          }
        >
          <Route
            path="/contacts"
            element={
              <>
                <Section title="PhoneBook" />
                <InputForm />
                <Section title="Contacts" />
                {data?.length > 0 && <Filter />}
                <Filter />
                <ContactList />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
