

import LargeFilterMsg from "./LargeFilterMsg";
import CountryList from "./CountryList";
import CountryInfo from "./CountryInfo";

const CountryDisplay = ({countries}) => {

    let numberOfEntries = countries.length;

    if(numberOfEntries > 10){
        return <LargeFilterMsg />;
    }else if(numberOfEntries > 1 && numberOfEntries <= 10){
        return <CountryList countries={countries}/>;
    }else if(numberOfEntries === 1){
        return <CountryInfo country={countries[0]}/>;
    }
};
export default CountryDisplay;