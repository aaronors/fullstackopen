export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

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

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

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
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

// --

interface BaseEntryFormValues {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
}

interface HealthCheckEntryFormValues extends BaseEntryFormValues {
    type: "HealthCheck";
    healthCheckRating: unknown;
}

interface OccupationalHealthcareEntryFormValues extends BaseEntryFormValues {
    type: "OccupationalHealthcare";
    employerName: unknown;
    sickLeave?: {
        startDate: unknown;
        endDate: unknown;
    };
}

interface HospitalEntryFormValues extends BaseEntryFormValues {
    type: "Hospital";
    discharge: {
        date: unknown;
        criteria: unknown;
    };
}

export type PatientEntryFormValues =
    | HospitalEntryFormValues
    | OccupationalHealthcareEntryFormValues
    | HealthCheckEntryFormValues;