import React from "react";
import axios from "axios";
import { useStateValue, setCurrentPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const PatientDetailPage = ({patientId}: {patientId: string | null}) => {
    const [{ currentPatient, diagnoses } , dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchCurrentPatient = async () => {
            if(patientId){
                try {
                    const { data: currentPatientData } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${patientId}`
                    );
                    dispatch(setCurrentPatient(currentPatientData));
                } catch (e) {
                    console.error(e);
                }
            }
            
        };
        void fetchCurrentPatient();
    }, [dispatch]);

    const GenderIcon = ({gender}: {gender: Gender}) => {
        switch(gender){
            case "male":
                return <ArrowLeftIcon/>;
            case "female":
                return <ArrowRightIcon/>;
            default:
                return null;
        }
    };

    if(!currentPatient || patientId !== currentPatient.id){
        return null;
    }
    return(
        <>
            <h2>{currentPatient.name}<GenderIcon gender={currentPatient.gender}/></h2>
            <div>ssn: {currentPatient.ssn}</div>
            <div>occupation: {currentPatient.occupation}</div>
            <h4>entries</h4>
            
            {currentPatient.entries.map((entry, index) => (
                <div key={index}>
                    <div>{entry.date} <i>{entry.description}</i></div>
                    <ul>
                        {entry.diagnosisCodes?.map((code, codeIndex) => (
                            <li key={codeIndex}>{code} <i>{diagnoses[code].name}</i></li>
                        ))}
                    </ul>
                </div>
            ))}
            
        </>
    );
};

export default PatientDetailPage;