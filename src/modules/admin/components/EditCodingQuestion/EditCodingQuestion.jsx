import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
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
} from './EditCodingQuestion.styles';
import { Select, notification } from 'antd';
import { getModuleCode, getTopicCode } from '../../../../api/addNewModuleApi';
import { updateTiyQbCodingQuestion } from '../../../../api/tiyQbCodingQuestionApi';


const EditCodingQuestion = ({ onClose, questionData, onQuestionUpdated }) => {
    const [formData, setFormData] = useState({ ...questionData, topics: questionData.topics.map((topic) => topic.topic_name) });
    const [code, setCode] = useState(questionData.base_code || '');
    const [newTopic, setNewTopic] = useState('');
    const [currentHint, setCurrentHint] = useState({ hint_text: '', explanation: '' });
    const [moduleOptions, setModuleOptions] = useState([]);
    const [topicOptions, setTopicOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const fetchModules = async () => {
            const res = await getModuleCode();
            const options = res.data.map(mod => ({ value: mod.module_code, label: mod.module_name }));
            setModuleOptions(options);
        };
        fetchModules();
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            if (!formData.module_code) return;
            const res = await getTopicCode(formData.module_code);
            const options = res.data.map(topic => ({ value: topic.topic_code, label: topic.topic_name }));
            setTopicOptions(options);
        };
        fetchTopics();
    }, [formData.module_code]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleHintChange = (e) => {
        const { name, value } = e.target;
        setCurrentHint(prev => ({ ...prev, [name]: value }));
    };

    const addHint = () => {
        if (!currentHint.hint_text) return;
        setFormData(prev => ({ ...prev, hints: [...prev.hints, currentHint] }));
        setCurrentHint({ hint_text: '', explanation: '' });
    };

    const removeHint = (index) => {
        setFormData(prev => ({ ...prev, hints: prev.hints.filter((_, i) => i !== index) }));
    };

    const addTopic = () => {
        if (!newTopic) return;
        setFormData(prev => ({ ...prev, topics: [...prev.topics, newTopic] }));
        setNewTopic('');
    };

    const removeTopic = (index) => {
        setFormData(prev => ({ ...prev, topics: prev.topics.filter((_, i) => i !== index) }));
    };

    const runCode = async () => {
        setIsRunning(true);
        try {
            const res = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': 'e3d1d11c7dmshca53081ed1ccf3fp1b61cdjsn79cc71e1336c',
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com'
                },
                body: JSON.stringify({
                    language: formData.programming_language.toLowerCase(),
                    files: [{ name: formData.programming_language === 'Python' ? 'index.py' : 'main.sql', content: code }],
                    stdin: formData.input
                })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setFormData(prev => ({ ...prev, output: result.stdout.trim() }));
            }
        } catch (err) {
            notification.error({ message: 'Code execution failed', description: err.message });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.isTiyQuestion && !formData.isQbQuestion) {
            notification.error({ message: 'Please select at least one question type' });
            return;
        }

        const requiredFields = ['programming_language', 'QuestionText', 'description', 'output'];
        const missing = requiredFields.filter(f => !formData[f]?.trim());
        if (missing.length > 0) {
            notification.error({ message: `Missing fields: ${missing.join(', ')}` });
            return;
        }

        setIsSubmitting(true);
        try {
            const submitData = {
                ...formData,
                topics: formData.topics.map(topic => { return ({ topic_name: topic.trim() }) })
            }

            const response = await updateTiyQbCodingQuestion(formData._id, submitData);
            console.log("response", response);
            if (response) {
                notification.success({ message: 'Question updated successfully' });
                onQuestionUpdated(response.data);
                setTimeout(onClose, 1000);
            }
        } catch (err) {
            notification.error({ message: 'Update failed', description: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalOverlay>
            <FormContainer>
                <CloseButton onClick={onClose}>×</CloseButton>
                <FormTitle>Edit Coding Question</FormTitle>

                <FormGroup>
                    <FormLabel>Questions to be included in </FormLabel>
                    <FormLabel><input type="checkbox" name="isTiyQuestion" checked={formData.isTiyQuestion} onChange={handleCheckboxChange} /> Try It Yourself</FormLabel>
                    <FormLabel><input type="checkbox" name="isQbQuestion" checked={formData.isQbQuestion} onChange={handleCheckboxChange} /> Question Bank</FormLabel>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Programming Language</FormLabel>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Select a type of question"
                        filterOption={(input, option) => {
                            var _a;
                            return (
                                (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                    _a !== void 0
                                    ? _a
                                    : ''
                            )
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                        value={formData.programming_language}
                        options={[
                            { value: 'Python', label: 'Python' },
                            { value: 'MySQL', label: 'MySQL' },
                        ]}
                        onChange={(e) => { setFormData({ ...formData, programming_language: e }); }}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Module</FormLabel>
                    <Select
                        style={{ width: '100%' }}
                        showSearch

                        placeholder="Select a module"
                        filterOption={(input, option) => {
                            var _a;
                            return (
                                (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                    _a !== void 0
                                    ? _a
                                    : ''
                            )
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                        options={moduleOptions}
                        value={formData.module_code}
                        onChange={(e) => { setSelectedModuleCode(e); setFormData({ ...formData, module_code: e }); }}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Topic</FormLabel>
                    <Select
                        style={{ width: '100%' }}
                        showSearch

                        placeholder="Select a module"
                        filterOption={(input, option) => {
                            var _a;
                            return (
                                (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                    _a !== void 0
                                    ? _a
                                    : ''
                            )
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                        options={topicOptions}
                        value={formData.topic_code}
                        onChange={(e) => { setSelectedTopicCode(e); setFormData({ ...formData, topic_code: e }); }}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Question</FormLabel>
                    <FormTextArea name="QuestionText" value={formData.QuestionText} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormTextArea name="description" value={formData.description} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Select a type of question"
                        filterOption={(input, option) => {
                            var _a;
                            return (
                                (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                    _a !== void 0
                                    ? _a
                                    : ''
                            )
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                        value={formData.difficulty}
                        options={[
                            { value: 'Easy', label: 'Easy' },
                            { value: 'Medium', label: 'Medium' },
                            { value: 'Hard', label: 'Hard' },
                        ]}
                        onChange={(e) => { setFormData({ ...formData, difficulty: e }); }}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Editor</FormLabel>
                    <Editor height="200px" language={formData.programming_language.toLowerCase()} value={code} onChange={setCode} theme="vs-light" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Input</FormLabel>
                    <FormTextArea name="input" value={formData.input} onChange={handleChange} />
                </FormGroup>

                <RunCodeButton onClick={runCode} disabled={isRunning}>{isRunning ? 'Running...' : 'Run Code'}</RunCodeButton>

                <FormGroup>
                    <FormLabel>Output</FormLabel>
                    <FormTextArea name="output" value={formData.output} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Base Code</FormLabel>
                    <Editor height="200px" language={formData.programming_language.toLowerCase()} value={formData.base_code} onChange={(val) => setFormData({ ...formData, base_code: val })} theme="vs-light" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Topics</FormLabel>
                    <HintContainer>
                        <FormInput value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Add topic" />
                        <HintButton onClick={addTopic}>Add Topic</HintButton>
                        <HintList>
                            {formData.topics.map((topic, i) => (
                                <HintItem key={i}>{topic} <RemoveHintButton onClick={() => removeTopic(i)}>Remove</RemoveHintButton></HintItem>
                            ))}
                        </HintList>
                    </HintContainer>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Hints</FormLabel>
                    <HintContainer>
                        <FormInput name="hint_text" value={currentHint.hint_text} onChange={handleHintChange} placeholder="Hint text" />
                        <FormTextArea name="explanation" value={currentHint.explanation} onChange={handleHintChange} placeholder="Explanation" />
                        <HintButton onClick={addHint}>Add Hint</HintButton>
                        <HintList>
                            {formData.hints.map((hint, i) => (
                                <HintItem key={i}><div>{hint.hint_text}<br />{hint.explanation}</div><RemoveHintButton onClick={() => removeHint(i)}>Remove</RemoveHintButton></HintItem>
                            ))}
                        </HintList>
                    </HintContainer>
                </FormGroup>

                <SaveButton onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </SaveButton>
            </FormContainer>
        </ModalOverlay>
    );
};

export default EditCodingQuestion;
