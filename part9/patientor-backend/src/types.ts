export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

// export interface Patient {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn: string;
//     gender: Gender;
//     occupation: string;
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, "id"| "entries">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientFields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

