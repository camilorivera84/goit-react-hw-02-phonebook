import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 300px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

const ContactName = styled.span`
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: white;
  color: #000;
  border: 1px solid gray;
  transition: background-color 0.3s;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List className="list_contacts">
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          <ContactName>{contact.name}:</ContactName> {contact.number}
          <DeleteButton
            className="delete-button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
