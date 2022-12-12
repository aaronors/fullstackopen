const Persons = ({filteredEntries}) => {
    return (
        <>
            <ul>
            {filteredEntries.map((person) => (<li key={person.name}>{person.name} {person.number}</li>))}
            </ul>
        </>
    )
}
export default Persons;