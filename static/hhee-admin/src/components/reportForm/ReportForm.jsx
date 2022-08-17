import { useEffect, useState } from 'react';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import Select, { components } from '@atlaskit/select';
import Form, {
    ErrorMessage,
    Field,
    FormFooter,
    ValidMessage,
  } from '@atlaskit/form';
import { DatePicker } from '@atlaskit/datetime-picker';
import SectionMessage from '@atlaskit/section-message';

import { useReportIssueInfo } from '../../hooks/useReportIssueInfo';

import { ExportToCsv } from 'export-to-csv-file';

const ReportForm = () => {
    const [jql, setJql] = useState();
    const [success, setSuccess] = useState(false)
    const { loading, errors, issues } = useReportIssueInfo(jql);

    useEffect(() => {
        const csvExporter = new ExportToCsv(options);
        if(issues.length > 0){
            csvExporter.generateCsv(issues);
            setSuccess(true)
        } //Ver si anda bien un cartel indica que no hay tickets para dicho periodo(Que no se vea siempre cuando el valor inicial de issue es [])

    }, [issues])

    const validateField = (value) => {
        if (!value) {
          return 'REQUIRED';
        }
    };

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

    const handleSubmit = (formData) => {
        console.log(formData['select-picker-issueType'])
        setJql("created >= "+formData['datetime-picker-start']+" AND created <= "+formData['datetime-picker-end']+" AND project = HHEE order by created DESC");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {({ formProps }) => (
                    <form {...formProps}>
                        <Field
                            name="datetime-picker-start"
                            label="Fecha de inicio"
                            validate={validateField}
                            isRequired
                            defaultValue=""
                        >
                            {({ fieldProps, error, meta: { valid } }) => (
                                <>
                                <DatePicker {...fieldProps} />
                                {valid && (
                                    <ValidMessage>Fecha de inicio válida</ValidMessage>
                                )}
                                {error === 'REQUIRED' && (
                                    <ErrorMessage>Este campo es requerido</ErrorMessage>
                                )}
                                </>
                            )}
                        </Field>
                        <Field
                            name="datetime-picker-end"
                            label="Fecha de fin"
                            validate={validateField}
                            isRequired
                            defaultValue=""
                        >
                            {({ fieldProps, error, meta: { valid } }) => (
                                <>
                                <DatePicker {...fieldProps} />
                                {valid && (
                                    <ValidMessage>Fecha de fin válida</ValidMessage>
                                )}
                                {error === 'REQUIRED' && (
                                    <ErrorMessage>Este campo es requerido</ErrorMessage>
                                )}
                                </>
                            )}
                        </Field>
                        <Field
                            name="select-picker-issueType"
                            label="Tipo de registro"
                            validate={validateField}
                            isRequired
                            defaultValue=""
                        >
                            {({ fieldProps, error, meta: { valid } }) => (
                                <>
                                    <Select
                                        {...fieldProps}
                                        options={[
                                            { label: 'Horas extra', value: 'Horas extra' },
                                            { label: 'Horas de guardia', value: 'Horas de guardia' }
                                        ]}
                                        placeholder="Seleccione un tipo de registro"
                                    />
                                    {valid && (
                                        <ValidMessage>Fecha de inicio válida</ValidMessage>
                                    )}
                                    {error === 'REQUIRED' && (
                                        <ErrorMessage>Este campo es requerido</ErrorMessage>
                                    )}
                                </>
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="submit" appearance="primary">
                                Submit
                            </Button>
                        </FormFooter>
                    </form>
                )}
            </Form>
            {loading && <div> <h3><Spinner /> Generando el reporte...</h3> </div>}
            {
                success && 
                <div> 
                    <SectionMessage appearance="success">
                        <p>Reporte generado con éxito</p>
                    </SectionMessage> 
                </div>
            }
            {
                errors.length > 0 && 
                <div> 
                    <SectionMessage
                        title="Se produce un error al generar el reporte"
                        appearance="error"
                    >
                        {errors.map(({message}) => {
                            return <p>{message}</p>
                        })}
                    </SectionMessage>
                </div>
            }
            
        </>
    )
}

export default ReportForm;