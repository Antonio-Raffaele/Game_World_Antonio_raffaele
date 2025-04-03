import { useEffect, useState } from "react";

export default function useFetchSolution(initialUrl) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [url, updateUrl] = useState(initialUrl);

    const fetchData = async () => {
        setData(null);

        if (!url) {
            setError("Error: URL non valido");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return {
        url,
        loading,
        error,
        data,
        fetchData, 
        updateUrl
    };
}