
const getContact = (req, res) => {
    res.status(200).json({ message: `Get Contact for ${req.params.id}`});
};


const getContacts = (req, res) => {
    res.status(200).json({ message: "Get All Contacts"});
}

const updateContact = (req, res) => {
    res.status(200).json({ message: `Update Contact for ${req.params.id}`});
};

const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete Contact for ${req.params.id}`})
};

const createContact = (req, res) => {
    console.log("Request Body: ", req.body);
    const {name, email, phone} = req.body;
    if(!name||!email||!phone){
     res.status(400).json({ message: "Error!!! field is empty"});
     throw new Error("All fields are mandatory");   
    }
    console.log(name,email,phone);

    res.status(200).json({ message: "Create Contact"});
};

module.exports = {getContact, getContacts, createContact, updateContact, deleteContact};
