import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  currentPatient: Patient;
};

const initialState: State = {
  patients: {},
  currentPatient: {} as Patient,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientList: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientList
    };
};

export const addPatient = (newPatient: Patient): Action => {
    return { 
        type: "ADD_PATIENT", 
        payload: newPatient 
    };
};

export const setCurrentPatient = (currentPatientData: Patient): Action => {
    return { 
        type: "SET_CURRENT_PATIENT", 
        payload: currentPatientData 
    };    
};
