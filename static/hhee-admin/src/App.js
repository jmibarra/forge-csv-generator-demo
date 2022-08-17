import { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import ReportForm from './components/reportForm/ReportForm';
import AccessBanner from './components/AccessBanner';


function App() {
    const [projectKey, setProjectKey] = useState(null);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setProjectKey);
    }, []);
       

    return (
        <>
            {projectKey == "HHEE"? <ReportForm/> : <AccessBanner />}  
        </>
    );
}

export default App;
