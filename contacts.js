const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.log(contacts);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((item) => item.id === contactId);
      console.log(contact);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((item) => item.id === contactId);
      const indexOfContact = contacts.indexOf(contact);
      contacts.splice(indexOfContact, 1);
      console.log(contacts);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

function addContact(name, email, phone) {
  const newContactObject = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      contacts.push(newContactObject);
      const json = JSON.stringify(contacts);
      fs.writeFile(contactsPath, json, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "\nFile Contents of file after append:",
            fs.readFileSync(contactsPath, "utf8")
          );
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}