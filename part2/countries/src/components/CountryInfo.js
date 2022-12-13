const CountryInfo = ({country}) => {
    return(
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language) => (<li key={language}> {language} </li>))}
            </ul>
            <img src={country.flags.png} alt={country.name.common.concat(" ", "flag")}/>
        </div>
        
    );
};
export default CountryInfo;