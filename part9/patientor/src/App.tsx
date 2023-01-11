import React from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch, PathMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailPage from "./PatientDetailPage";
import { Typography } from "@material-ui/core";

const App = () => {
    const [, dispatch] = useStateValue();
    React.useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(
                    `${apiBaseUrl}/patients`
                );
                dispatch(setPatientList(patientListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();
    }, [dispatch]);

    const patientMatch = useMatch("/patients/:id");
    const getPatientId = ( patientMatch: PathMatch<"id"> | null ): string | null => {
        if (patientMatch === null) return null;
        const id = patientMatch.params.id;
        if (typeof id === "undefined") return null;
        return id;
    };

    return (
        <div className="App">
            <Container>
                <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                    Patientor
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                >
                    Home
                </Button>
                <Divider hidden />
                <Routes>
                    <Route path="/" element={<PatientListPage />} />
                    <Route path="/patients/:id" element={ <PatientDetailPage patientId={getPatientId(patientMatch)} /> } />
                </Routes>
            </Container>
        </div>
    );
};

export default App;
