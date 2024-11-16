import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form
} from 'grommet';
import './App.css';
import Header from './components/header';

const theme = {
    global: {
        colors: {
            brand: '#000000',
            focus: '#000000',
        },
        font: {
            family: 'Lato',
        },
    },
};

const ViewMedHist = () => {
    const [medhiststate, setMedhiststate] = useState([]);

    useEffect(() => {
        getNames("");
    }, []);

    const getNames = (value) => {
        let patName = " ";
        if (value !== undefined) patName = value;
        console.log(patName);
        fetch('http://localhost:3001/MedHistView?name=' + patName + '&variable=words')
            .then(res => res.json())
            .then(res => setMedhiststate(res.data));
    };

    

    const Body = () => (
        <div className="container" style={{ width: "100vw" }}>
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: "50vw" }}>Name</th>
                            <th style={{ width: "50vw" }}>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medhiststate.map(patient => (
                            <tr key={patient.id} style={{ textAlign: "center" }}>
                                <td>{patient.Name}</td>
                                <td>
                                    <Button label="Medical Profile" href={'/ViewOneHistory/' + patient.email} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <Grommet full={true} theme={theme}>
            <Header />
            <Box fill={true} align="center">
                <Form
                    onSubmit={({ value }) => {
                        getNames(value.email);
                    }}
                >
                    <h4 style={{ textAlign: "center", marginBottom: "0" }}>Search By Name</h4>
                    <FormField name="email" align="center" />
                    <div align="center">
                        <Button type="submit" primary label="Submit" />
                    </div>
                </Form>
                <Body />
            </Box>
        </Grommet>
    );
};

export default ViewMedHist;
