import diagnosesData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnosesData as Array<Diagnose> ;

const getEntries = (): Diagnose[] => {
    return diagnoses;
};

export default { getEntries };
