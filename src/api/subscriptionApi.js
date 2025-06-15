import api from "../config/axiosconfig";



export const getAllSubscription = async () => {
    try {
        const res = await api.get("/subscription/getAllPlans");
        return res.data;
    } catch (err) {
        throw err;
    }

};

export const getUserSubscription = async (userId) => {
    try {
        if (!userId) throw new Error("User id is required");
        const res = await api.get(`/subscription/getSubscriptionByUserId/${userId}`);
        return res.data;
    } catch (err) {
        throw err;
    }

};

export const cancelSubscription = async (userId) => {
    try {
        if (!userId) throw new Error("User id is required");
        const res = await api.post(`/subscription/cancelSubscription`, { userId: userId });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const createSubscription = async (userId, planId) => {
    try {
        if (!userId) throw new Error("User id is required");
        const res = await api.post(`/subscription/createSubscription`, { userId: userId, planId: planId });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getAllPayments = async (range) => {
    try {
        
        const res = await api.post(`/subscription/getAllPayments?duration=${range}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getPaymentSummary = async () => {
    try {
      
        const res = await api.get(`/subscription/getPaymentSummary`);
        console.log("res.data,res.data",res.data);
        return res.data;
    } catch (err) {
        throw err;
    }
};