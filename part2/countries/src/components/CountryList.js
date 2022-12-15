const CountryList = ({countries, setNewFilter}) => {

    const handleButtonClick = (event) =>{
        setNewFilter(event.target.value);
    }    

    return(
        <ul>
            {countries.map((country) => ( 
                <li key={country.name.common}> 
                    {country.name.common}&emsp; 
                    <button type="button" value={country.name.common} onClick={handleButtonClick}>show</button>
                </li>
            ))}
        </ul>
    );
};
export default CountryList;

// need to reload the page so that Country is shown 
// on button click -> set filter to value of button