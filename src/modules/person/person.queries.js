const Person = require('./person.schema');

// Función para crear una nueva persona
const createPerson = async (personData) => {
    try {
        const newPerson = new Person(personData);
        await newPerson.save();
        return newPerson;
    } catch (error) {
        throw error;
    }
};
// Función para encontrar una persona por su ID
const findPersonById = async (personId) => {
    try {
        const person = await Person.findById(personId);
        return person;
    } catch (error) {
        throw error;
    }
};

// Función para encontrar personas por ciertos criterios
const findPersons = async (criteria) => {
    try {
        if (criteria.firstName && criteria.lastName) {
            const person = await Person.findOne({
                firstName: criteria.firstName,
                lastName: criteria.lastName
            });
            return person;
        } else {
            
            const person = await Person.findOne(criteria);
            return person;
        }
    } catch (error) {
        throw error;
    }
};
// Función para actualizar una persona
const updatePerson = async (personId, newData) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(personId, newData, { new: true });
        return updatedPerson;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar una persona
const deletePerson = async (personId) => {
    try {
        await Person.findByIdAndDelete(personId);
        return { message: 'Person deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPerson,
    findPersonById,
    findPersons,
    updatePerson,
    deletePerson
};
