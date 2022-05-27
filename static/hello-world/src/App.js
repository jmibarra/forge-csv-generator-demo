import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import { CSVLink, CSVDownload } from "react-csv";

function App() {

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (
        <div>
            <CSVLink data={csvData}>Download me</CSVLink>;
        </div>
    );
}

export default App;
