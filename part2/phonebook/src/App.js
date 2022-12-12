import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567"}]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setNewFilter] = useState("");

    const filteredEntries = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    const addPerson = (event) => {
        event.preventDefault();

        if(persons.find((person) => person.name.localeCompare(newName, undefined, { sensitivity: 'accent' }) === 0 )){
            alert(`${newName} is already added to phonebook`);
        }else{
            const personObject = {
                name: newName,
                number: newNumber
            };
            setPersons(persons.concat(personObject));
            setNewName("");        
            setNewNumber("");        
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
            <Persons filteredEntries={filteredEntries}/>
        </div>
    );
};

export default App;
