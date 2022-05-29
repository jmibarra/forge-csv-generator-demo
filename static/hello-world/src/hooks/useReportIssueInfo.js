import {useEffect, useState} from "react";
import {invoke,requestJira} from "@forge/bridge";

/**
 * Retrieve a collection of issues matching the provided JQL string.
 */
 export const useReportIssueInfo = (issueKey) => {
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [issue, setIssue] = useState();

    useEffect(() => {

        if (issueKey === undefined) {
            return;
        }

        setLoading(true);
        setErrors([]);

        const fetchIssues = async () => {
            try {
                const response = await requestJira(`/rest/api/3/issue/${issueKey}`);
                const data = await response.json();

                if (response.status >= 400) {
                    if (data.errorMessages && data.errorMessages.length > 0) {
                        setIssue();
                        // Format error messages to be displayed in the editor
                        setErrors(data.errorMessages.map((message) => ({ message })));
                    } else {
                        throw new Error(`Invalid response code: ${response.status}`);
                    }
                } else {
                    // Map the status category of each issue
                    console.log(data.fields)
                    setIssue(data)
                }
            } catch (e) {
                console.error("Could not fetch issues", e);
                setIssue();
                setErrors([{ message: "Could not fetch issues" }]);
            } finally {
                console.log("Entro al finally")
                setLoading(false);
            }
        }

        fetchIssues();
    }, [issueKey,setLoading, setIssue, setErrors])

    return {
        loading,
        errors,
        issue
    }
}