/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientServices";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getEntries());
});

patientRouter.post("/", (req, res) => {
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;
    const newPatient = patientService.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender,
    });
    res.json(newPatient);
});

export default patientRouter;
