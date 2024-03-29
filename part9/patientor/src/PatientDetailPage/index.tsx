import React from "react";
import axios from "axios";
import { useStateValue, setCurrentPatient, setDiagnoses, updatePatientEntries } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry, Diagnosis } from "../types";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HealingIcon from '@material-ui/icons/Healing';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WorkIcon from '@material-ui/icons/Work';
import { Button } from "@material-ui/core";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { HealthCheckEntryFormValues } from "../types";

const PatientDetailPage = ({patientId}: {patientId: string | null}) => {
    const [{ currentPatient, diagnoses } , dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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

        const fetchDiagnoses = async () => {
            if(Object.keys(diagnoses).length === 0){
                try {
                    const { data: diagnoses } = await axios.get<Diagnosis[]>(
                        `${apiBaseUrl}/diagnoses`
                    );
                    dispatch(setDiagnoses(diagnoses));
                } catch (e) {
                    console.error(e);
                }
            }
        };

        void fetchDiagnoses();
        void fetchCurrentPatient();
    }, [dispatch]);

    const submitNewPatientEntry = async (values: HealthCheckEntryFormValues) => { // left off here 
        if(patientId){
            try {
                const { data: newPatientEntry } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${patientId}/entries`,
                    values
                );
                dispatch(updatePatientEntries(newPatientEntry));
                closeModal();
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
    };

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


    const EntryView = ({entry}: {entry: Entry}) => {
        switch(entry.type) {
            case "HealthCheck":
                return (
                <div>
                    <div> <HealingIcon/> {entry.date} <i>{entry.description}</i></div>
                    <ul>
                        {entry.diagnosisCodes?.map((code, codeIndex) => (
                            <li key={codeIndex}>{code} <i>{diagnoses[code].name}</i></li>
                        ))}
                    </ul>
                    <div>health check rating: {entry.healthCheckRating}</div>
                </div>
                );
            case "OccupationalHealthcare":
                return (
                    <div>
                        <div> <WorkIcon/> {entry.date} <i>{entry.description}</i></div>
                        <ul>
                            {entry.diagnosisCodes?.map((code, codeIndex) => (
                                <li key={codeIndex}>{code} <i>{diagnoses[code].name}</i></li>
                            ))}
                        </ul>
                        <div>employer name: {entry.employerName}</div>
                        {entry.sickLeave &&
                            <>
                                <h4>Sick leave</h4>
                                <div>start date: {entry.sickLeave.startDate}</div>
                                <div>end date: {entry.sickLeave.endDate}</div>
                            </>
                        }
                    </div>
                );         
            case "Hospital":
                return (
                    <div>
                        <div> <LocalHospitalIcon/> {entry.date} <i>{entry.description}</i></div>
                        <ul>
                            {entry.diagnosisCodes?.map((code, codeIndex) => (
                                <li key={codeIndex}>{code} <i>{diagnoses[code].name}</i></li>
                            ))}
                        </ul>
                        <h4>discharge</h4>
                        <div>date: {entry.discharge.date}</div>
                        <div>criteria: {entry.discharge.criteria}</div>
                    </div>
                );                         
        }
    };

    if(!currentPatient || patientId !== currentPatient.id){
        return null;
    }
    const entryStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return(
        <>
            <h2>{currentPatient.name}<GenderIcon gender={currentPatient.gender}/></h2>
            <div>ssn: {currentPatient.ssn}</div>
            <div>occupation: {currentPatient.occupation}</div>
            <AddPatientEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatientEntry}
                error={error}
                onClose={closeModal}
            />            
            <Button variant="contained" onClick={() => openModal()}>
                Add New Patient Entry
            </Button>
            {currentPatient.entries.length !== 0 &&
            <>
                <h4>Entries</h4>
                {currentPatient.entries.map((entry, index) => (
                    <div key={index} style={entryStyle}>
                        <EntryView entry={entry}/>
                    </div>
                ))}
            </>
            }
            
        </>
    );
};

export default PatientDetailPage;