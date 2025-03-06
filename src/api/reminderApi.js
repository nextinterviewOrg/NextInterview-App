import api from "../config/axiosconfig";

export const sendReminder = async (data) => {
    try {
        const response = await api.post("/reminder/sendReminder", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};