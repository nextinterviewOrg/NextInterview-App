import api from '../config/axiosconfig';

/* POST  /questionBankCategory */
// categaryApi.js
export const createCategory = async (payload) => {
  try {
    const { data: created } = await api.post(
      '/questionBankCategory',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return created;        // the category object from the server
  } catch (err) {
    console.error('Error creating category:', err);
    throw err;
  }
};


/* GET  /questionBankCategory/ */
export const getAllCategory = async () => {
    try {
  const { data } = await api.get('/questionBankCategory');
  return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }                // array of category objects
};

/* PUT  /questionBankCategory/:category_id  */
export const updateCategory = async (id, payload) => {
    try {
   const res = await api.put(`/questionBankCategory/${id}`, payload);
   return res.data;  
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;  // rethrow the error for further handling
    }                // returns the updated category object
};

export const deleteCategory = async (id) => {
    try {
        const { data } = await api.delete(`/questionBankCategory/${id}`);
        return data;  // returns the deleted category object
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;  // rethrow the error for further handling
    }
}

export const addQuestionsToCategory = async ({ category_id, question_ids }) => {
    try {
  const { data } = await api.post('/questionBankCategory/addQuestionToCategory', {
    category_id,
    question_ids,
  });
  return data; // { success: true, ... }
    }
    catch (error) {
        console.error("Error adding questions to category:", error);
        throw error;  // rethrow the error for further handling
    }
};

export const removeQuestionsFromCategory = async ({ category_id, question_ids }) => {
  try {
    const { data } = await api.post('/questionBankCategory/removeQuestionFromCategory', {
      category_id,
      question_ids,
    });
    return data; // { success: true, ... }
  } catch (error) {
    console.error("Error removing questions from category:", error);
    throw error;
  }
};

export const getQuestionsToAddToCategory = async (category_id) => {
    try {
  const { data } = await api.get(`/mainQuestionBank/get/questionsToAdd/byCategory/${category_id}`);
  return data; // array of question objects
    } catch (error) {
        console.error("Error fetching questions to add to category:", error);
        throw error;  // rethrow the error for further handling
    }
};