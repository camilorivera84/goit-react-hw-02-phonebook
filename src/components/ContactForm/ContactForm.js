import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 200px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 10px rgb(251, 255, 0),
    0 0 10px rgb(242, 255, 0);
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  width: 200px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactForm = ({ onAddContact }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'number') {
      const formattedNumber = value.replace(/[^0-9]/g, '').slice(0, 7);
      const formattedValue = formattedNumber.replace(
        /(\d{3})(\d{2})(\d{2})/,
        '$1-$2-$3'
      );

      setContact(prevContact => ({
        ...prevContact,
        [name]: formattedValue,
      }));
    } else {
      setContact(prevContact => ({
        ...prevContact,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = contact;

    if (/\d/.test(name)) {
      Notiflix.Notify.failure(
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore'
      );
      return;
    }

    const phoneNumberRegex = /^[\d-]+$/;
    if (!phoneNumberRegex.test(number)) {
      Notiflix.Notify.failure(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }

    onAddContact(name, number);
    setContact({ name: '', number: '' });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            value={contact.number}
            onChange={handleChange}
            maxLength={7}
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </Container>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
