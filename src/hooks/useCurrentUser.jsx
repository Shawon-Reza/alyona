import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosApi from "@/api/axiosApi";

export default function useCurrentUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchUser() {
            const token = JSON.parse(localStorage.getItem("token"));
           
            try {
                const res = await axiosApi.get("/accounts/api/v1/info", {
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
