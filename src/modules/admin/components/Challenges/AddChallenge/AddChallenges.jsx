import React, { useState } from 'react';
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
  RemoveHintButton,
  RunCodeButton
} from '../AddChallenge/AddChallenges.style';
import { FiX } from 'react-icons/fi';
import { addChallenge } from '../../../../../api/challengesApi';
import Editor from '@monaco-editor/react';

const languageOptions = {
  python: {
    filename: 'index.py',
    defaultCode: `# Write your code here\n# Use input() to read input if needed\nprint("Hello World")`
  },
  mysql: {
    filename: 'main.sql',
    defaultCode: `-- Write your SQL query here\nSELECT 'Hello World';`
  },
};

const AddChallenge = ({ onClose, onChallengeAdded }) => {
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

  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const runCode = async () => {
    if (!formData.programming_language || !code) {
      setError('Please select a language and write some code.');
      return;
    }

    setIsRunning(true);
    setError(null);

    const language = formData.programming_language.toLowerCase();
    const payload = {
      language,
      files: [
        {
          name: languageOptions[language].filename,
          content: code,
        },
      ],
      stdin: formData.input // Pass the sample input as stdin
    };

    try {
      const res = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': 'e3d1d11c7dmshca53081ed1ccf3fp1b61cdjsn79cc71e1336c',
          'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status === 'success') {
        const output = result.stdout || result.stderr || 'No output';
        setFormData(prev => ({
          ...prev,
          output: output.trim() // Auto-populate the output field
        }));
      } else {
        setError('Execution error: ' + (result.exception || 'Unknown error'));
      }
    } catch (err) {
      setError('Request failed: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    const requiredFields = ['programming_language', 'QuestionText', 'description', 'output'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
  
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await addChallenge({
        ...formData,
        hints: formData.hints.map(hint => ({
          hint_text: hint.hint_text,
          explanation: hint.explanation
        }))
      });
      
      if (response.success) {
        setSuccess('Challenge added successfully!');
        onChallengeAdded(response.data);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to save challenge");
      }
    } catch (err) {
      setError(err.message || "Failed to save challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <FormContainer>
        <CloseButton onClick={onClose} type="button">
          <FiX size={20} />
        </CloseButton>

        <FormTitle>Add New Challenge</FormTitle>

        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}

        <FormGroup>
          <FormLabel>Programming Language *</FormLabel>
          <FormSelect
            name="programming_language"
            value={formData.programming_language}
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            <option value="Python">Python</option>
            <option value="MySQL">MySQL</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Question *</FormLabel>
          <FormTextArea
            name="QuestionText"
            value={formData.QuestionText}
            onChange={handleChange}
            placeholder="Enter the question text"
            rows={4}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description *</FormLabel>
          <FormTextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed description"
            rows={6}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Difficulty</FormLabel>
          <FormSelect
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Code Editor</FormLabel>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
            <Editor
              height="200px"
              language={formData.programming_language.toLowerCase()}
              value={code}
              onChange={setCode}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false
              }}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <FormLabel>Sample Input</FormLabel>
          <FormTextArea
            name="input"
            value={formData.input}
            onChange={handleChange}
            placeholder="Enter sample input"
            rows={3}
          />
        </FormGroup>

        <RunCodeButton type="button" onClick={runCode} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Code'}
        </RunCodeButton>

        <FormGroup>
          <FormLabel>Expected Output *</FormLabel>
          <FormTextArea
            name="output"
            value={formData.output}
            onChange={handleChange}
            placeholder="Output will appear here after running the code"
            rows={3}
            required
          />
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
              <strong>Added Hints:</strong>
              {formData.hints.map((hint, index) => (
                <HintItem key={index}>
                  <div>
                    <strong>Hint {index + 1}:</strong> {hint.hint_text}
                    {hint.explanation && (
                      <div><em>Explanation:</em> {hint.explanation}</div>
                    )}
                  </div>
                  <RemoveHintButton
                    type="button"
                    onClick={() => removeHint(index)}
                  >
                    Remove
                  </RemoveHintButton>
                </HintItem>
              ))}
            </HintList>
          )}
        </FormGroup>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <CloseButton type="button" onClick={onClose}>
            Cancel
          </CloseButton>
          <SaveButton type="submit" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Saving...' : 'Save Challenge'}
          </SaveButton>
        </div>
      </FormContainer>
    </ModalOverlay>
  );
};

export default AddChallenge;