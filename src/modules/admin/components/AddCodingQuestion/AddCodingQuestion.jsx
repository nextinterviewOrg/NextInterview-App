import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
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
    RunCodeButton,

} from './AddCodingQuestion.styles';
import { Select, notification } from 'antd';
import { getModuleCode, getTopicCode } from '../../../../api/addNewModuleApi';
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import {
    TinyMCEapiKey,
    TinyMCEmergetags_list,
    TinyMCEplugins,
    TinyMCEToolbar,
} from "../../../../config/TinyMceConfig";
import { addTiyQbCodingQuestion } from '../../../../api/tiyQbCodingQuestionApi';
import { addMainQBCodingQuestion } from '../../../../api/userMainQuestionBankApi';
import { getInterviewTopics } from '../../../../api/interviewTopicsApi';
// import { addChallenge } from '../../../../../api/challengesApi';

const AddCodingQuestion = ({ onClose, onChallengeAdded }) => {
    const [formData, setFormData] = useState({
        programming_language: 'Python',
        question: '',
        description: '',
        topic_code: '',
        input: '',
        output: '',
        level: 'easy',
        hints: [],
        topics: [],
        base_code: '',
        module_code: '',
        isTIYQustion: false,
        isQuestionBank: false,
        dbSetupCommands: "",
        question_type: "coding",
        solutionCode: '',
        solutionExplanation: '',
        isAvailableForMockInterview: false,
        topicId: null
    });

    const [code, setCode] = useState('');
    const [newTopic, setNewTopic] = useState('');
    const [currentHint, setCurrentHint] = useState({ hint_text: '', explanation: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [moduleOptions, setModuleOptions] = useState([]);
    const [selectedModuleCode, setSelectedModuleCode] = useState(null);
    const [topicOptions, setTopicOptions] = useState([]);
    const [selectedTopicCode, setSelectedTopicCode] = useState(null);
    const [interviewTopicOptions, setInterviewTopicOptions] = useState([]);

    useEffect(() => {
        const apiCaller = async () => {
            const moduleCodesData = await getModuleCode();
            const interviewTopicData = await getInterviewTopics();
            const preparedInterviewTopicData = interviewTopicData.data.map((topic) => { return ({ value: topic._id, label: topic.topic }) })
            setInterviewTopicOptions(preparedInterviewTopicData);
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) })
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            setFormData(prev => ({ ...prev, module_code: preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null }));
        }
        apiCaller();
    }, []);
    useEffect(() => {
        const apiCaller = async () => {
            try {


                const topicCodeData = await getTopicCode(selectedModuleCode);
                console.log("topicCodeData", topicCodeData);
                const preparedTopicData = topicCodeData.data.map((topic) => { return ({ value: topic.topic_code, label: topic.topic_name }) })
                console.log("preparedTopicData", preparedTopicData);
                setTopicOptions(preparedTopicData);
                setSelectedTopicCode(preparedTopicData.length > 0 ? preparedTopicData[0].value : null);
                setFormData(prev => ({ ...prev, topic_code: preparedTopicData.length > 0 ? preparedTopicData[0].value : null }));
            } catch (e) {
                if (e.response.status === 404) {
                    setTopicOptions([]);
                    setSelectedTopicCode(null);
                    setFormData(prev => ({ ...prev, topic_code: null }));
                }
            }
        }
        apiCaller();

    }, [selectedModuleCode])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleHintChange = (e) => {
        const { name, value } = e.target;
        setCurrentHint(prev => ({ ...prev, [name]: value }));
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
    const removeTopic = (index) => {
        setFormData(prev => ({
            ...prev,
            topics: prev.topics.filter((_, i) => i !== index)
        }));
    };

    const addTopic = () => {
        if (newTopic.trim()) {
            setFormData(prev => ({
                ...prev,
                topics: [...prev.topics, newTopic.trim()]
            }));
            setNewTopic('');
        }
    };

    const runCode = async () => {
        if (!formData.programming_language || !code) {
            setError('Please select a language and write code');
            return;
        }

        setIsRunning(true);
        setError(null);

        const lang = formData.programming_language.toLowerCase();
        const payload = {
            language: lang,
            files: [{ name: lang === 'Python' ? 'index.py' : 'main.sql', content: code }],
            stdin: formData.input
        };

        try {
            const res = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': '39906602eamsh7241fddd134e8ecp1ff6d1jsn745264e9d839',
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                },
                body: JSON.stringify(payload),
            });


            const result = await res.json();
            console.log("result", result);
            if (result.status === 'success') {
                setFormData(prev => ({ ...prev, output: result?.stdout?.trim() || result?.stderr?.trim() || '' }));
            } else {
                setError(result.exception || 'Execution failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsRunning(false);
        }
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const requiredFields = ['programming_language', 'question', 'description', 'output'];
            const missing = requiredFields.filter(field => !formData[field]?.trim());
            console.log("missing", missing, "formData", formData);
            if (missing.length > 0) {
                setError(`Please fill in: ${missing.join(', ')}`);
                return;
            }
            if (!formData.isTIYQustion && !formData.isQuestionBank) {
                notification.error({
                    message: 'Please select at least one question type',
                    placement: 'topRight',
                    duration: 3
                })
                return;
            }
            if (formData.isTIYQustion && (!formData.topic_code)) {
                notification.error({
                    message: 'Please select a topic',
                    placement: 'topRight',
                    duration: 3
                })
                return;
            }


            setIsSubmitting(true);

            const submitData = {
                ...formData,
                topics: formData.topics.map(topic => { return ({ topic_name: topic.trim() }) })
            }
            try {
                const response = await addMainQBCodingQuestion(submitData);
                if (response) {
                    console.log("response", response);
                    notification.success({
                        message: 'Question added successfully',
                        placement: 'topRight',
                        duration: 3
                    })
                    setSuccess('Question added successfully');
                    onChallengeAdded(response.data);
                    setTimeout(onClose, 1500);
                } else {
                    throw new Error(response.message || 'Save failed');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsSubmitting(false);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalOverlay>
            <FormContainer>
                <CloseButton onClick={onClose}><FiX /></CloseButton>
                <FormTitle>Add Coding Question</FormTitle>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}

                <FormGroup>
                    <FormLabel>Programming Language *</FormLabel>
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
                    <FormLabel>Module Code</FormLabel>
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
                    <FormLabel>Topic Code</FormLabel>
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
                    <FormLabel>Question *</FormLabel>
                    <FormTextArea name="question" value={formData.question} onChange={handleChange} />
                    {/* <TinyMCEEditor
                        apiKey={TinyMCEapiKey}
                        init={{
                            plugins: TinyMCEplugins,
                            toolbar: TinyMCEToolbar,
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: TinyMCEmergetags_list,
                            ai_request: (request, respondWith) =>
                                respondWith.string(() =>
                                    Promise.reject("See docs to implement AI Assistant")
                                ),
                            branding: false,
                        }}
                        value={formData.QuestionText || ""}
                        onEditorChange={(newValue) => {
                            setFormData({ ...formData, QuestionText: newValue });
                        }}
                        initialValue=""
                    /> */}
                </FormGroup>

                <FormGroup>
                    <FormLabel>Description *</FormLabel>
                    {/* <FormTextArea name="description" value={formData.description} onChange={handleChange} /> */}
                    <TinyMCEEditor
                        apiKey={TinyMCEapiKey}
                        init={{
                            plugins: TinyMCEplugins,
                            toolbar: TinyMCEToolbar,
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: TinyMCEmergetags_list,
                            ai_request: (request, respondWith) =>
                                respondWith.string(() =>
                                    Promise.reject("See docs to implement AI Assistant")
                                ),
                            branding: false,
                        }}
                        value={formData.description || ""}
                        onEditorChange={(newValue) => {
                            setFormData({ ...formData, description: newValue });
                        }}
                        initialValue=""
                    />
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
                        value={formData.level}
                        options={[
                            { value: 'easy', label: 'Easy' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'hard', label: 'Hard' },
                        ]}
                        onChange={(e) => { setFormData({ ...formData, level: e }); }}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Editor</FormLabel>
                    <Editor
                        height="200px"
                        language={formData.programming_language.toLowerCase()}
                        value={code}
                        onChange={setCode}
                        theme="vs-light"

                    />
                </FormGroup>

                {formData.programming_language !== "MySQL" &&
                    <FormGroup>
                        <FormLabel>Input</FormLabel>
                        <FormTextArea name="input" value={formData.input} onChange={handleChange} />
                    </FormGroup>
                }

                <RunCodeButton onClick={runCode} disabled={isRunning}>
                    {isRunning ? 'Running...' : 'Run Code'}
                </RunCodeButton>

                <FormGroup>
                    <FormLabel>Expected Output *</FormLabel>
                    <FormTextArea name="output" value={formData.output} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Base Code</FormLabel>
                    <Editor
                        height="200px"
                        language={formData.programming_language.toLowerCase()}
                        value={formData.base_code}
                        onChange={(e) => { setFormData({ ...formData, base_code: e }); }}
                        theme="vs-light"
                    />
                    {/* <FormTextArea name="base_code" value={formData.base_code} onChange={handleChange} /> */}
                </FormGroup>
                {
                    formData.programming_language === "MySQL" &&
                    <FormGroup>
                        <FormLabel>DB Creation Commands</FormLabel>
                        <Editor
                            height="200px"
                            language={formData.programming_language.toLowerCase()}
                            value={formData.dbSetupCommands}
                            onChange={(e) => { setFormData({ ...formData, dbSetupCommands: e }); }}
                            theme="vs-light"

                        />
                    </FormGroup>
                }

                <FormGroup>
                    <FormLabel>Code Solution</FormLabel>
                    <Editor
                        height="200px"
                        language={formData.programming_language.toLowerCase()}
                        value={formData.solutionCode}
                        onChange={(e) => { setFormData({ ...formData, solutionCode: e }); }}
                        theme="vs-light"

                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Solution Explanation</FormLabel>
                    <FormTextArea name="solutionExplanation" value={formData.solutionExplanation} onChange={handleChange} />
                </FormGroup>


                <FormGroup>
                    <FormLabel>Topics</FormLabel>
                    <HintContainer>
                        <FormInput value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Add a topic" />
                        <HintButton onClick={addTopic}>Add Topic</HintButton>
                        <HintList>
                            {formData.topics.map((topic, i) => (
                                <HintItem key={i}>{topic}
                                    <RemoveHintButton onClick={() => removeTopic(i)}>Remove</RemoveHintButton>
                                </HintItem>
                            ))}
                        </HintList>
                    </HintContainer>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Hints</FormLabel>
                    <HintContainer>
                        <FormInput name="hint_text" value={currentHint.hint_text} onChange={handleHintChange} placeholder="Hint text" />
                        <FormTextArea name="explanation" value={currentHint.explanation} onChange={handleHintChange} placeholder="Hint explanation" />
                        <HintButton onClick={addHint}>Add Hint</HintButton>
                        <HintList>
                            {formData.hints.map((hint, i) => (
                                <HintItem key={i}>
                                    <div><strong>{hint.hint_text}</strong><br />{hint.explanation}</div>
                                    <RemoveHintButton onClick={() => removeHint(i)}>Remove</RemoveHintButton>
                                </HintItem>
                            ))}
                        </HintList>
                    </HintContainer>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Questions to be included in </FormLabel>
                    <FormLabel>
                        <input
                            type="checkbox"
                            name="isTIYQustion"
                            checked={formData.isTIYQustion}
                            onChange={handleCheckboxChange}
                        /> Try It Yourself Question
                    </FormLabel>
                    <FormLabel>
                        <input
                            type="checkbox"
                            name="isQuestionBank"
                            checked={formData.isQuestionBank}
                            onChange={handleCheckboxChange}
                        /> Question Bank Question
                    </FormLabel>
                </FormGroup>
                {/* <FormGroup>
                    <FormLabel>Interview Topic</FormLabel>
                    <Select
                        style={{ width: '100%' }}
                        showSearch

                        placeholder="Select a Interview Topic"
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
                        options={interviewTopicOptions}
                        value={formData.topicId}
                        onChange={(e) => { setFormData({ ...formData, topicId: e }); }}
                    />
                </FormGroup> */}
                <FormGroup>
                    <FormLabel>
                        <input
                            type="checkbox"
                            name="isAvailableForMockInterview"
                            checked={formData.isAvailableForMockInterview}
                            onChange={(e) => { if (formData.topicId == null) return; handleCheckboxChange(e) }}
                        />   <>     </> Mark this question as available for Mock Interviews
                    </FormLabel>
                </FormGroup>
                <SaveButton onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </SaveButton>
            </FormContainer>
        </ModalOverlay>
    );
};

export default AddCodingQuestion;
