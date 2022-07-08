const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async() => {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const getContactById = async(contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === `${contactId}`);
  if (!contactById) {
    return null;
  }
  return contactById;
}

const removeContact = async(contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [contactRemove] = contacts.splice(idx, 1);
  await updateContacts(contacts) ;
  return contactRemove;
}


const addContact = async(name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name ,
    email,
    phone
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}

