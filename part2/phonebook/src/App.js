import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState(""); // controlls for input element

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {name: newName};
        setPersons(persons.concat(personObject));
        setNewName("");
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>debug: {newName}</div>
        </div>
    );
};

export default App;
