import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import colors from "colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = join(__dirname, "/db/contacts.json");

export function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.log(contacts);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

export function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
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

export function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((item) => item.id === contactId);
      const indexOfContact = contacts.indexOf(contact);
      contacts.splice(indexOfContact, 1);
      console.log(
        colors.green("Success!") +
          colors.yellow(`\nContact ${contactId} removed from the list`)
      );
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
}

export async function addContact(name, email, phone) {
  const newContactObject = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    contacts.push(newContactObject);
    const json = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, json, "utf8");
    const updatedData = await fs.readFile(contactsPath, "utf8");
    console.log(
      colors.green("Success!") +
        colors.yellow("\nFile Contents of file after append:"),
      updatedData
    );
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
