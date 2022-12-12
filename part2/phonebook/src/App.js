import { useState } from "react";
import Person from "./components/Person";
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
                <div>
                    filter: <input value={filter} onChange={handleFilterChange} />
                </div>            
            <h2>Add New</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {filteredEntries.map((person) => (<Person key={person.name} person={person}/>))}
            </ul>
        </div>
    );
};

export default App;
