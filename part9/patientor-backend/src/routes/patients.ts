import express from "express";
import patientService from "../services/patientServices";
import { toNewPatient, toNewPatientEntry } from "../utils";
import { PatientFields, PatientEntryFields } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getEntries());
});

patientRouter.get("/:id", (req, res) => {
    res.send(patientService.getPatient(req.params.id));
});

patientRouter.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body as PatientFields);
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

patientRouter.post("/:id/entries", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body as PatientEntryFields);
        const addedPatientEntry = patientService.addPatientEntry(req.params.id, newPatientEntry);
        res.json(addedPatientEntry);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

export default patientRouter;