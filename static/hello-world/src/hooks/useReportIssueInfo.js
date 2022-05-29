import {useEffect, useState} from "react";
import {invoke,requestJira} from "@forge/bridge";

/**
 * Retrieve a collection of issues matching the provided JQL string.
 */
 export const useReportIssueInfo = (jql) => {
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [issues, setIssues] = useState([]);

    useEffect(() => {

        if (jql === undefined) {
            return;
        }

        setLoading(true);
        setErrors([]);

        const fetchIssues = async () => {
            try {
                const response = await requestJira(`/rest/api/3/search?jql=${jql}&fields=status`);
                const data = await response.json();

                if (response.status >= 400) {
                    if (data.errorMessages && data.errorMessages.length > 0) {
                        setIssues([]);
                        // Format error messages to be displayed in the editor
                        setErrors(data.errorMessages.map((message) => ({ message })));
                    } else {
                        throw new Error(`Invalid response code: ${response.status}`);
                    }
                } else {
                    // Map the status category of each issue
                    const issues = data.issues.map((issue) => { //Aca debo meter la lógica para armar la linea del CSV para cada issue
                        const statusCategory = issue.fields.status.statusCategory;
                        return {
                            statusCategory: statusCategory.name,
                            statusCategoryKey: statusCategory.key,
                        }
                    })
                    setIssues(issues);
                }
            } catch (e) {
                console.error("Could not fetch issues", e);
                setIssues([]);
                setErrors([{ message: "Could not fetch issues" }]);
            } finally {
                setLoading(false);
            }
        }

        fetchIssues();
    }, [jql,setLoading, setIssues, setErrors])

    return {
        loading,
        errors,
        issues
    }
}