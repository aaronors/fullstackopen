import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import CountryDisplay from "./components/CountryDisplay";

function App() {
    const [filter, setNewFilter] = useState("");
    const [allCountries, setAllCountries] = useState([]);

    const hook = () => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setAllCountries(response.data);
        });
    };

    useEffect(hook, []);

    const filteredEntries = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));


    const handleFilterChange = (event) =>{
        setNewFilter(event.target.value);
    }    

    return(
        <>
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            <CountryDisplay countries={filteredEntries}/>
        </>
    );
}

export default App;
// over 10 countries returned -> show "Too many matches, specify another filter"
// 10 or fewer countries -> show countries 
// only one country matching query -> show basic data 


//what to do
// 1. hook up react app so that it retrieves and shows countries
// 2. implement conditional rendering if too many matches
// 3. implement coniditonal rendering if one country

