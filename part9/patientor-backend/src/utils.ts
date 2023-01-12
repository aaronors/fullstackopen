import { NewPatient, Gender, PatientFields, EntryWithoutId, PatientEntryFields, Diagnosis, HealthCheckRating } from "./types";

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFields): NewPatient => {

    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };

    return newEntry;
};

export const toNewPatientEntry = (patientEntryFields : PatientEntryFields): EntryWithoutId => {
    switch (patientEntryFields.type){
        case "HealthCheck":
            return {
                description: parseDescription(patientEntryFields.description),
                date: parseEntryDate(patientEntryFields.date),
                specialist: parseSpecialist(patientEntryFields.specialist),
                ...(patientEntryFields.diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(patientEntryFields.diagnosisCodes)} : {}),
                type: patientEntryFields.type,
                healthCheckRating: parseHealthCheckRating(patientEntryFields.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                description: parseDescription(patientEntryFields.description),
                date: parseEntryDate(patientEntryFields.date),
                specialist: parseSpecialist(patientEntryFields.specialist),
                ...(patientEntryFields.diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(patientEntryFields.diagnosisCodes)} : {}),
                type: patientEntryFields.type,
                employerName:  parseEmployerName(patientEntryFields.employerName),
                ...(patientEntryFields.sickLeave ? {sickLeave: parseSickLeave(patientEntryFields.sickLeave)} : {}),
            };
        case "Hospital":
            return {
                description: parseDescription(patientEntryFields.description),
                date: parseEntryDate(patientEntryFields.date),
                specialist: parseSpecialist(patientEntryFields.specialist),
                ...(patientEntryFields.diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(patientEntryFields.diagnosisCodes)} : {}),
                type: patientEntryFields.type,
                discharge: parseDischarge(patientEntryFields.discharge)
            };            
    }
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date of birth: " + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }

    return occupation;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
};

const parseEntryDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing entry date: " + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodeArray = (array: Array<unknown>): array is Array<Diagnosis["code"]> => {
    return array.every(i => typeof i === "string");
};

const parseDiagnosisCodes = (codeArray: unknown): Array<Diagnosis["code"]> => { 
    if (!codeArray || !Array.isArray(codeArray) || !isDiagnosisCodeArray(codeArray)) {
        throw new Error("Incorrect or missing diagnosis code array");
    }
    return codeArray;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error("Incorrect or missing rating: " + rating);
    }
    return rating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employer name");
    }

    return employerName;
};

const isSickLeave = (sickLeave: {startDate: unknown; endDate: unknown;}): sickLeave is {startDate: string; endDate: string;} => {
    const isValidStartDate = typeof sickLeave.startDate !== "undefined" && isString(sickLeave.startDate) && isDate(sickLeave.startDate);
    const isValidEndDate = typeof sickLeave.endDate !== "undefined" && isString(sickLeave.endDate) && isDate(sickLeave.endDate);
    return isValidStartDate && isValidEndDate;
};

const parseSickLeave = (sickLeave: unknown): {startDate: string; endDate: string;} => {
    if (!sickLeave || typeof sickLeave !== "object"|| !("startDate" in sickLeave) || !("endDate" in sickLeave) || !isSickLeave(sickLeave)) {
        throw new Error("Incorrect or missing sick leave");
    }
    return sickLeave;
};

const isDischarge = (discharge: {date: unknown; criteria: unknown;}): discharge is {date: string; criteria: string;} => {
    const isValidDate = typeof discharge.date !== "undefined" && isString(discharge.date) && isDate(discharge.date);
    const isValidCriteria = typeof discharge.criteria !== "undefined" && isString(discharge.criteria);
    return isValidDate && isValidCriteria;
};

const parseDischarge = (discharge: unknown): {date: string; criteria: string;} => {
    if (!discharge || typeof discharge !== "object"|| !("date" in discharge) || !("criteria" in discharge) || !isDischarge(discharge)) {
        throw new Error("Incorrect or missing discharge");
    }
    return discharge;
};