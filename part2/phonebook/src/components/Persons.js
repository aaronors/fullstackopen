import personService from "../services/persons";

const Persons = ({filteredEntries, persons, setPersons}) => {

    const handleDelete = (event) => {
        const selectedId = event.target.value;
        const selectedPerson = filteredEntries.find((person) => (person.id === parseInt(selectedId)))
        if(window.confirm(`Delete ${selectedPerson.name}`)){
            personService.deletePerson(selectedId).then(
                setPersons(persons.filter((person) => person.id !== parseInt(selectedId)))
            );
        }
    }

    return (
        <>
            <ul>
                {
                    filteredEntries.map((person) => (
                        <li key={person.name}>
                            {person.name} {person.number}&emsp;
                            <button type="button" value={person.id} onClick={handleDelete}>delete</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
export default Persons;