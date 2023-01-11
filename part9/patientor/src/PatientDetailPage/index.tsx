import { Patient, Gender } from "../types";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const PatientDetailPage = ({patient}: {patient: Patient | null}) => {
    if(!patient){
        return null;
    }
    console.log("-- patient = " + JSON.stringify(patient));

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
    return(
        <>
            <h2>{patient.name}<GenderIcon gender={patient.gender}/></h2>
            <div>{patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </>
    );
};

export default PatientDetailPage;