import { useState } from 'react';
import s from './InputForm.module.css';
import { useAddContactMutation, useGetContactsQuery } from '../../redux/api';

function InputForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mutator] = useAddContactMutation();
  const { data } = useGetContactsQuery();

  const onInputChange = ev => {
    const { name, value } = ev.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const onFormSubmit = async ev => {
    ev.preventDefault();
    if (data.find(el => el.name === name)) {
      alert('This contact already exist');
      resetForm();
      return;
    }
    console.log(await mutator({ name, phone }));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.labelInput}
          onChange={onInputChange}
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
          onChange={onInputChange}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.formBtn}>
        Add contact
      </button>
    </form>
  );
}

export default InputForm;
