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

export const createPlan = async (planData) => {
  try {
    const response = await api.post("/subscription/createPlan", planData);
    console.log("createPlan API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("createPlan API Error:", error.response?.data || error.message);
    throw error;
  }
};


export const getAllPlans = async () => {
  try {
    const { data } = await api.get('/subscription/getAllPlans');
    console.log(data); 
    // If backend shape is { success, plans: [...] }
    return data.plans ?? data;   // ← always an array
  } catch (err) {
    console.error('Error fetching plans:', err);
    throw err;
  }
};

export const upgradeSubscription = async (userId, planId) => {
    try {
        if (!userId) throw new Error("User id is required");
        const res = await api.post(`/subscription/upgradePlan`, { userId: userId, newPlanId: planId });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const deletePlan = async (planId) => {
  try {
    const response = await api.delete(`/subscription/softDelete/${planId}`);
    console.log("deletePlan API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("deletePlan API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllPlansWithStatus = async () => {
  try {
    const { data } = await api.get('/subscription/getAllPlansStatus');
    console.log(data); 
    // If backend shape is { success, plans: [...] }
    return data.plans ?? data;   // ← always an array
  } catch (err) {
    console.error('Error fetching plans:', err);
    throw err;
  }
};

export const UpdateToggleStatus = async (planId) => {
  try {
    const response = await api.put(`/subscription/togglePlanStatus/${planId}`);
    console.log("UpdateToggleStatus API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("UpdateToggleStatus API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePlans = async (planId, planData) => {
  try {
    const response = await api.put(`/subscription/updatePlan/${planId}`, planData);
    console.log("updatePlans API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("updatePlans API Error:", error.response?.data || error.message);
    throw error;
  }
};