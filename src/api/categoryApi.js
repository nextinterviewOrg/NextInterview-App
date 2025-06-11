import api from "../config/axiosconfig";

export const getAllCategory = async () => {
    try {
        const response = await api.get("/questionBankCategory");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/questionBankCategory/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};