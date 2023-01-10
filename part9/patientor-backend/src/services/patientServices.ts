import patientData from "../../data/patients.json";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";

const nonSensitivePatients: Array<NonSensitivePatient> =
    patientData as Array<NonSensitivePatient>;

const patients: Array<Patient> =
    patientData as Array<Patient>;

const getEntries = (): NonSensitivePatient[] => {
    return nonSensitivePatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatient = (id: string): Patient | null => {
    const patient = patients.find((patient) => patient.id === id);

    if(typeof patient === "undefined"){
        return null;
    }

    return {
        ...patient,
        entries: []
    };
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...entry,
    };

    patientData.push(newPatient);
    return newPatient;
};

export default { getEntries, addPatient, getPatient };
