import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
        type: "SET_CURRENT_PATIENT";
        payload: Patient;
    }
    | {
        type: "SET_DIAGNOSES";
        payload: Diagnosis[];
    }
    | {
        type: "UPDATE_PATIENT_ENTRIES";
        payload: Entry;
    };


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "SET_CURRENT_PATIENT":
            return {
                ...state,
                currentPatient: action.payload
            };
        case "SET_DIAGNOSES":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
                        {}
                    ),
                    ...state.diagnoses,
                },
            };
            case "UPDATE_PATIENT_ENTRIES":
                return {
                    ...state,
                    currentPatient: {
                        ...state.currentPatient,
                        entries: [...state.currentPatient.entries, action.payload]
                    }
                };            
        default:
            return state;
    }
};