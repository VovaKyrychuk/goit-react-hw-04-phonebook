import React, { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './FormContact.styled';
import { FormLabel } from './FormContact.styled';
import { Button } from './FormContact.styled';
import { FormInput } from './FormContact.styled';
import PropTypes from 'prop-types';

export const FormContact = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChangeName = useCallback(event => {
    setName(event.currentTarget.value);
  }, []);

  const handleChangeNumber = useCallback(event => {
    setNumber(event.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      onSubmit(newContact);
      resetForm();
    },
    [name, number, onSubmit]
  );

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel htmlFor={nameId}>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
          id={nameId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel htmlFor={numberId}>
        Number
        <FormInput
          type="tel"
          name="number"
          id={numberId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChangeNumber}
        />
      </FormLabel>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

FormContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormContact;
