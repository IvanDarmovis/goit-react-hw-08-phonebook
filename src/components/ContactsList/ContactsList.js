import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery, useDeleteContactMutation } from '../../redux/api';
import s from './ContactsList.module.css';
import ContactListItem from './ContactsListItem/ContactsListItem';

function ContactList() {
  const filter = useSelector(state => state.filter);
  const [options, setOption] = useState([]);
  const { data, isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  async function contactDelete(id) {
    await deleteContact(id);
  }

  useEffect(() => {
    if (!isFetching)
      setOption(
        data?.filter(el => el.name.toLowerCase().includes(filter)) ?? []
      );
  }, [data, filter, isFetching]);

  if (options.length === 0)
    return <p className={s.emptyList}>No numbers to show</p>;
  return (
    <ul className={s.list}>
      {options?.map(({ id, name, phone }) => (
        <ContactListItem
          key={id}
          name={name}
          number={phone}
          onClick={() => contactDelete(id)}
        />
      ))}
    </ul>
  );
}

export default ContactList;
