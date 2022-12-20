import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

import "./App.css";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setNewFilter] = useState("");
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
        personService.getAll().then((personList) => {
            setPersons(personList);
        });
    }, []);

    const filteredEntries = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    const displayNotification = (msg, type) => {
        setNotification(msg);
        setNotificationType(type);
        setTimeout(() => {setNotification(null)}, 5000);
    }

    const addPerson = (event) => {
        event.preventDefault();
        let foundPerson = persons.find((person) => person.name.localeCompare(newName, undefined, { sensitivity: 'accent' }) === 0 )

        if(foundPerson !== undefined){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
                const changedPerson = { ...foundPerson, number: newNumber };     
                personService.update(changedPerson.id, changedPerson)
                    .then((returnedPerson) => {
                        setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson));
                        setNewName("");
                        setNewNumber("");
                        displayNotification(`Added ${returnedPerson.name}`, "success")
                    })
                    .catch((error) => {
                        displayNotification(`Information of ${changedPerson.name} has already been removed from the server`, "error")
                        setPersons(persons.filter((p) => p.id !== changedPerson.id));
                    });
            }
        }else{
            const personObject = {
                name: newName,
                number: newNumber
            };
            
            personService
                .create(personObject).then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName("");
                    setNewNumber("");
                    displayNotification(`Added ${returnedPerson.name}`, "success")
                })
                .catch((error) => {
                    displayNotification(error.response.data.error, "error")
                });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) =>{
        setNewFilter(event.target.value);
    }    

    return (
        <div>
            <Notification message={notification} notificationType={notificationType}/>
            <h2>Phonebook</h2>
                <Filter value={filter} onChange={handleFilterChange} />
            <h2>Add New</h2>
            <PersonForm 
                formOnSubmit={addPerson} 
                nameValue={newName} 
                nameHandler={handleNameChange} 
                numberValue={newNumber} 
                numberHandler={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons filteredEntries={filteredEntries} persons={persons} setPersons={setPersons}/>
        </div>
    );
};

export default App;
