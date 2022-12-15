import LargeFilterMsg from "./LargeFilterMsg";
import CountryList from "./CountryList";
import CountryInfo from "./CountryInfo";

const CountryDisplay = ({countries, setNewFilter}) => {

    let numberOfEntries = countries.length;

    if(numberOfEntries === 1 ){
        return <CountryInfo country={countries[0]}/>;
    } else if(numberOfEntries > 1 && numberOfEntries <= 10){
        return <CountryList countries={countries} setNewFilter={setNewFilter}/>;
    } else if(numberOfEntries > 10){
        return <LargeFilterMsg />;
    }
};
export default CountryDisplay;
