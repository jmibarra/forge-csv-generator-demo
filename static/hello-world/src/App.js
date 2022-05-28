import React, { useEffect, useState } from 'react';
import { ExportToCsv } from 'export-to-csv-file';
import { invoke, view } from '@forge/bridge';

import Button from '@atlaskit/button';

function App() {
    // useEffect(() => {
    //     invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    //   }, []);

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
       
    const csvExporter = new ExportToCsv(options);
       
    csvExporter.generateCsv(data);

    view.close()

    //TODO: Ver como restringir a un solo proyecto o tipo de ticket
    //TODO: Ver de implementar el consumo de info desde tickets reales
    //TODO: Ver de consumir el pedido desde el ticket desde que ejecuto.

    return (
        <></>
    );
}

export default App;
