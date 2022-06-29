import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/api';
import Modal from 'components/Modal';
import InputForm from 'components/InputForm/InputForm';
import s from './ContactsList.module.css';
import ContactListItem from './ContactsListItem/ContactsListItem';
import { List } from '@mui/material';

function ContactList() {
  const filter = useSelector(state => state.root.filter);
  const data = useSelector(state => state.root.contacts.list);
  const isContactsFetching = useSelector(
    state => state.root.contacts.isFetching
  );
  const [showModal, setShowModal] = useState(false);
  const [options, setOption] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const toogleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (isContactsFetching) dispatch(getContacts());
  }, [dispatch, isContactsFetching]);

  useEffect(() => {
    setOption(data?.filter(el => el.name.toLowerCase().includes(filter)) ?? []);
  }, [data, filter]);

  const onListItemClick = el => {
    setUser(el);
    toogleModal();
  };

  if (options.length === 0)
    return <p className={s.emptyList}>No numbers to show</p>;
  return (
    <div>
      <List
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {options?.map(el => (
          <ContactListItem
            key={el.id}
            name={el.name}
            number={el.number}
            onClick={() => onListItemClick(el)}
          />
        ))}
      </List>
      {showModal && (
        <Modal onClose={toogleModal}>
          <div className={s.modalData}>
            <InputForm
              id={user.id}
              userName={user.name}
              phone={user.number}
              onClose={toogleModal}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ContactList;
