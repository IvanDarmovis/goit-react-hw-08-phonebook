import InputForm from './InputForm/InputForm';
import ContactList from './ContactsList/ContactsList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserMenu from './UserMenu';
import { OnlyPublicPath, PrivatePath } from './services/redirect';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

function App() {
  const data = useSelector(state => state.root.contacts.list);
  const isLoggedIn = useSelector(state => state.root.user.isLogged);

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
                {data.length > 0 && <Filter />}
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
