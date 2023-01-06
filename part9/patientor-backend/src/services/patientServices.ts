/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../../data/patients.json";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<NonSensitivePatient> =
    patientData as Array<NonSensitivePatient>;

const getEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry,
    };

    patientData.push(newPatient);
    return newPatient;
};

export default { getEntries, addPatient };
