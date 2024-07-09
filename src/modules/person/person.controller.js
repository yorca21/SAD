const PersonQueries = require('./person.queries');

// Controlador para crear una nueva persona
const createPerson = async (req, res) => {
    try {
        const personData = req.body;
        const newPerson = await PersonQueries.createPerson(personData);
        return  res.status(201).json(newPerson);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating person', error });
    }
};
//controlador para  listar todas las personas 
const getAllPersons = async (req, res) => {
    try {
        const persons = await PersonQueries.allPersons();
        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Controlador para encontrar una persona por su ID
const findPersonById = async (req, res,) => {
    try {
        const personId = req.params.id;
        const person = await PersonQueries.findPersonById(personId);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding person', error });
    }
};

// Controlador para encontrar personas por ciertos criterios
const findPersons = async (req, res) => {
    try {
        const criteria = req.query;
        const persons = await PersonQueries.findPersons(criteria);
        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding persons', error });
    }
};

// Controlador para actualizar una persona
const updatePerson = async (req, res) => {
    try {
        const personId = req.params.id;
        const newData = req.body;
        const updatedPerson = await PersonQueries.updatePerson(personId, newData);
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        return res.status(200).json(updatedPerson);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating person', error });
    }
};

// Controlador para eliminar una persona
const deletePerson = async (req, res) => {
    try {
        const personId = req.params.id;
        const result = await PersonQueries.deletePerson(personId);
        if (!result) {
            return res.status(404).json({ message: 'Person not found' });
        }
        return res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting person', error });
    }
};

module.exports = {
    createPerson,
    getAllPersons,
    findPersonById,
    findPersons,
    updatePerson,
    deletePerson
};
