import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true; // Track component mount status
        const fetchEmails = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/email/getallemails", {
                    withCredentials: true
                });
                if (isMounted) {
                    dispatch(setEmails(res.data.emails));
                }
            } catch (error) {
                console.error("Error fetching emails:", error);
                // Optionally, dispatch an action to set an error state in Redux
            }
        };

        fetchEmails();

        return () => {
            isMounted = false; // Cleanup on component unmount
        };
    }, [dispatch]); // Added `dispatch` to the dependency array

};

export default useGetAllEmails;
