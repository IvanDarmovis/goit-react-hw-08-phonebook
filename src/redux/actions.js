import { createAction } from '@reduxjs/toolkit';

const filter = createAction('contactList/filter');
const contactAdd = createAction('contactList/add');
const contactDelete = createAction('contactList/delete');

export { filter, contactAdd, contactDelete };
