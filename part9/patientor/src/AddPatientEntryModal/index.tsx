import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { HealthCheckEntryFormValues } from "../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}
//({ modalOpen, onClose, onSubmit, error }: Props)
const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;

// ----- first type to implement 
// ----- type = "HealthCheck"

// description: unknown; -- similar to name
// date: unknown; -- similar to date of birth
// specialist: unknown; -- similar to name
// diagnosisCodes?: unknown; -- already defined check ex9.24
// type: "HealthCheck";
// healthCheckRating: unknown; -- similar to gender options

// ----- how to render different forms depending on type 
// create new entry button -> select type modal -> fill out form 