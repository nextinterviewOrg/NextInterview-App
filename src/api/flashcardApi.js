import api from "../config/axiosconfig";


export const addFlashcard = async (data) => {
    try {

        const response = await api.post("/flashCards", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getFlashcards = async () => {
    try {
        const response = await api.get("/flashCards");
        console.log("Response Data",response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateFlashcard = async (id, data) => {
    try {
        const response = await api.put(`/flashCards/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteFlashcard = async (id) => {
    try {
        const response = await api.delete(`/flashCards/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};   

//for updating stat i need to pass card id , userid and cardknow in body

// In your flashcardApi.js
export const updateStats = async (cardId, userId, cardKnow) => {
    try {
        console.log("cardId",cardId,userId,cardKnow)
      const response = await api.put(`/flashCards/update/stats`, {
        cardId,
        userId,
        cardKnow
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error; // Make sure errors are properly propagated
    }
  };

  export const getCardByUserId = async (userId) => {
    try {
      const response = await api.get(`/flashCards/get/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error; // Make sure errors are properly propagated
    }
  };
