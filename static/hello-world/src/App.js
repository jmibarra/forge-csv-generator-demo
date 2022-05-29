import { useReportIssueInfo } from './hooks/useReportIssueInfo';
import { invoke, view } from '@forge/bridge';
import { ExportToCsv } from 'export-to-csv-file';
import { useEffect, useState } from 'react';


function App() {
    const [issueKey, setissueKey] = useState("")
    const { loading, errors, issues } = useReportIssueInfo(issueKey);

    useEffect(() => {
        invoke('getText').then(setissueKey);
    },[])
    
    var data = [
        {
          name: 'Test 1',
          age: 13,
          average: 8.2,
          approved: true,
          description: "using 'Content here, content here' "
        },
        {
          name: 'Test 2',
          age: 11,
          average: 8.2,
          approved: true,
          description: "using 'Content here, content here' "
        },
        {
          name: 'Test 4',
          age: 10,
          average: 8.2,
          approved: true,
          description: "using 'Content here, content here' "
        },
    ];
       
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Informe de horas extra',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
       
    //const csvExporter = new ExportToCsv(options);
       
    //csvExporter.generateCsv(data);

    //view.close()

    //TODO: Ver como restringir a un solo proyecto o tipo de ticket
    //TODO: Ver de implementar el consumo de info desde tickets reales
    //TODO: Ver de consumir el pedido desde el ticket desde que ejecuto.

    //TODO: Pensar una versión sencilla con material ui y que me permita seleccionar el periodo desde el mismo modulo y que el elemento sea en la barra de proyectos

    return (
        <>
            <div>{issueKey}</div>
            <div>{errors}</div>
            <div>{issues}</div>
            <div>{issues[0]}</div>
        </>
    );
}

export default App;
