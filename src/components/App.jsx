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
import { Box } from '@mui/material';

function App() {
  const data = useSelector(state => state.root.contacts.list);
  const isLoggedIn = useSelector(state => state.root.user.isLogged);

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
    </Box>
  );
}

export default App;
