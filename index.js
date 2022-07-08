const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contactsOperations = require("./db/contacts");

const invokeAction = async({action, id, name, email, phone})=> {
    switch(action){
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.log(contacts);
            break;
        case "get":
            const contactById = await contactsOperations. getContactById(id);
            console.log(contactById);
            break;
        case "add":
            const newContact = await contactsOperations.addContact(name,email,phone);
            console.log(newContact);
            break;        
        case "remove":
            const contactRemove = await contactsOperations.removeContact(id);
            console.log(contactRemove);
            break;
        default:
            console.log('Unknown action type!');
    }
}

const array = hideBin(process.argv);
const { argv } = yargs(array);

invokeAction(argv);