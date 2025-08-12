import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

export default function useCurrentUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const token = JSON.parse(localStorage.getItem("token"));


            try {
                const res = await axios.get("http://10.10.13.59:8000/accounts/api/v1/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return { user, loading };
}
