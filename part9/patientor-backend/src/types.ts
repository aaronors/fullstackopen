export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string; 
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientFields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};

interface BaseEntryFields {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
}

interface HealthCheckEntryFields extends BaseEntryFields {
    type: "HealthCheck";
    healthCheckRating: unknown;
}

interface OccupationalHealthcareEntryFields extends BaseEntryFields {
    type: "OccupationalHealthcare";
    employerName: unknown;
    sickLeave?: {
        startDate: unknown;
        endDate: unknown;
    };
}

interface HospitalEntryFields extends BaseEntryFields {
    type: "Hospital";
    discharge: {
        date: unknown;
        criteria: unknown;
    };
}

export type PatientEntryFields =
    | HospitalEntryFields
    | OccupationalHealthcareEntryFields
    | HealthCheckEntryFields;