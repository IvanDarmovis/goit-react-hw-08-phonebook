import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, changeContact, deleteContact } from '../../redux/api';
import s from './InputForm.module.css';

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
    <form onSubmit={onFormSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.labelInput}
          onChange={ev => setName(ev.currentTarget.value)}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.labelInput}
          onChange={ev => setNumber(ev.currentTarget.value)}
          type="tel"
          name="phone"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.formBtn}>
        {id === '' ? 'Add contact' : 'Save'}
      </button>
      {id !== '' && (
        <button
          className={s.deleteBtn}
          onClick={() => {
            dispatch(deleteContact(id));
            onClose();
          }}
          name={id}
          type="button"
        >
          Delete
        </button>
      )}
    </form>
  );
}

export default InputForm;
