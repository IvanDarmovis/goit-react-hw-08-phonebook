import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, changeContact, deleteContact } from '../../redux/api';
import PropTypes from 'prop-types';
import { TextField, Box, Button } from '@mui/material';

function InputForm({ id = '', userName = '', phone = '', onClose }) {
  const data = useSelector(state => state.root.contacts.list);
  const [name, setName] = useState(userName);
  const [number, setNumber] = useState(phone);
  const dispatch = useDispatch();

  const onFormSubmit = ev => {
    ev.preventDefault();

    if (id === '') {
      if (data.find(el => el.name === name)) {
        alert('This contact already exist');
        resetForm();
        return;
      }
      dispatch(addContact({ name, number }));
      resetForm();
      return;
    }
    dispatch(changeContact({ name, number, id }));
    onClose();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Box
      onSubmit={onFormSubmit}
      component={'form'}
      autocomplete="off"
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        alignItems: 'center',
        m: '0 auto',
        '& *': {
          mt: 1,
        },
      }}
    >
      <TextField
        variant="outlined"
        onChange={ev => setName(ev.currentTarget.value)}
        type="text"
        name="name"
        value={name}
        placeholder="Enter the name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <TextField
        variant="outlined"
        onChange={ev => setNumber(ev.currentTarget.value)}
        type="tel"
        name="phone"
        value={number}
        placeholder="Enter the number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <Button
        sx={{
          p: '10px',
        }}
        type="submit"
      >
        {id === '' ? 'Add contact' : 'Save'}
      </Button>
      {id !== '' && (
        <Button
          sx={{
            p: '10px',
          }}
          onClick={() => {
            dispatch(deleteContact(id));
            onClose();
          }}
          name={id}
          type="button"
        >
          Delete
        </Button>
      )}
    </Box>
  );
}

InputForm.protoType = {
  id: PropTypes.string,
  userName: PropTypes.string,
  phone: PropTypes.string,
  onClose: PropTypes.func,
};

export default InputForm;
