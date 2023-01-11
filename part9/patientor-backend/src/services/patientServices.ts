import patients from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";

const nonSensitivePatients: Array<NonSensitivePatient> =
patients as Array<NonSensitivePatient>;


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

    return patient;
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...entry,
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getEntries, addPatient, getPatient };
