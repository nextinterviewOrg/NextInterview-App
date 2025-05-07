import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
  SaveButton,
  CloseButton,
  HintButton,
  HintContainer,
  HintList,
  HintItem,
  RemoveHintButton
} from './EditChallenge.style';
import { FiX } from 'react-icons/fi';
import { editChallenge } from '../../../../../api/challengesApi';

const EditChallenge = ({ challenge, onClose, onChallengeUpdated }) => {
  const [formData, setFormData] = useState({
    programming_language: '',
    QuestionText: '',
    description: '',
    input: '',
    output: '',
    difficulty: 'Easy',
    hints: []
  });

  const [currentHint, setCurrentHint] = useState({
    hint_text: '',
    explanation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (challenge) {
      setFormData({
        programming_language: challenge.programming_language || '',
        QuestionText: challenge.QuestionText || '',
        description: challenge.description || '',
        input: challenge.input || '',
        output: challenge.output || '',
        difficulty: challenge.difficulty || 'Easy',
        hints: challenge.hints || []
      });
    }
  }, [challenge]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHintChange = (e) => {
    const { name, value } = e.target;
    setCurrentHint(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addHint = () => {
    if (!currentHint.hint_text.trim()) {
      setError('Hint text is required');
      return;
    }

    setFormData(prev => ({
      ...prev,
      hints: [...prev.hints, currentHint]
    }));
    setCurrentHint({ hint_text: '', explanation: '' });
    setError(null);
  };

  const removeHint = (index) => {
    setFormData(prev => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await editChallenge(challenge._id, {
        ...formData,
        hints: formData.hints.map(hint => ({
          hint_text: hint.hint_text,
          explanation: hint.explanation
        }))
      });
      onChallengeUpdated(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update challenge");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <FormContainer>
        <CloseButton onClick={onClose}>
          <FiX size={20} />
        </CloseButton>
        <FormTitle>Edit Challenge</FormTitle>

        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

        <FormGroup>
          <FormLabel>Programming Language</FormLabel>
          <FormSelect name="programming_language" value={formData.programming_language} onChange={handleChange}>
            <option value="">Select Language</option>
            <option value="Python">Python</option>
            <option value="MySQL">MySQL</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Question</FormLabel>
          <FormTextArea name="QuestionText" value={formData.QuestionText} onChange={handleChange} rows={4} />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormTextArea name="description" value={formData.description} onChange={handleChange} rows={6} />
        </FormGroup>

        <FormGroup>
          <FormLabel>Difficulty</FormLabel>
          <FormSelect name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Sample Input</FormLabel>
          <FormTextArea name="input" value={formData.input} onChange={handleChange} rows={3} />
        </FormGroup>

        <FormGroup>
          <FormLabel>Expected Output</FormLabel>
          <FormTextArea name="output" value={formData.output} onChange={handleChange} rows={3} />
        </FormGroup>

        <FormGroup>
          <FormLabel>Hints</FormLabel>
          <HintContainer>
            <FormInput
              name="hint_text"
              value={currentHint.hint_text}
              onChange={handleHintChange}
              placeholder="Hint text"
            />
            <FormTextArea
              name="explanation"
              value={currentHint.explanation}
              onChange={handleHintChange}
              placeholder="Hint explanation (optional)"
              rows={2}
            />
            <HintButton type="button" onClick={addHint}>
              Add Hint
            </HintButton>
          </HintContainer>

          {formData.hints.length > 0 && (
            <HintList>
              <strong>Existing Hints:</strong>
              {formData.hints.map((hint, index) => (
                <HintItem key={index}>
                  <div>
                    <strong>Hint {index + 1}:</strong> {hint.hint_text}
                    {hint.explanation && <div><em>Explanation:</em> {hint.explanation}</div>}
                  </div>
                  <RemoveHintButton type="button" onClick={() => removeHint(index)}>
                    Remove
                  </RemoveHintButton>
                </HintItem>
              ))}
            </HintList>
          )}
        </FormGroup>

        <SaveButton type="submit" 
        disabled={isSubmitting}
        onClick={handleSubmit}

        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </SaveButton>
      </FormContainer>
    </ModalOverlay>
  );
};

export default EditChallenge;
