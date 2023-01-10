import express from "express";
import patientService from "../services/patientServices";
import toNewPatient from "../utils";
import { PatientFields } from "../types";

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

export default patientRouter;
