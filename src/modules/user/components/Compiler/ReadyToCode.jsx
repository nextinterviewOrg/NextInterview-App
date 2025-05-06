import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Container,
  CodeBox,
  RunButton,
  OutputBox,
  OutputSection,
  LanguageSelect,
  Buttons
} from './ReadyToCode.styles';

const languageOptions = {
  python: {
    filename: 'index.py',
    defaultCode: `import sys\nname = sys.stdin.readline()\nprint('Hello ' + name.strip())`
  },
  mysql: {
    filename: 'main.sql',
    defaultCode: `SELECT 'Hello Peter';`
  },
};

const ReadyToCode = () => {
  const [selectedLang, setSelectedLang] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    setCode(languageOptions[lang].defaultCode);
    setOutput('');
  };
  const runCode = async () => {
    if (!selectedLang || !code) {
      setOutput('Please select a language and write some code.');
      return;
    }
  
    const payload = {
      language: selectedLang,
      files: [
        {
          name: languageOptions[selectedLang].filename,
          content: code,
        },
      ],
    };
  
    try {
      const res = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': "e3d1d11c7dmshca53081ed1ccf3fp1b61cdjsn79cc71e1336c",
          'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
  
      if (result.status === 'success') {
        setOutput(result.stdout || result.stderr || 'No output');
      } else {
        setOutput('Error: ' + (result.exception || 'Unknown error'));
      }
    } catch (err) {
      setOutput('Request failed: ' + err.message);
    }
  };
  
  return (
    <Container>
      <CodeBox>
        <Editor
          height="300px"
          language={selectedLang || 'plaintext'}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-light"
        />
        <Buttons>
          <LanguageSelect value={selectedLang} onChange={handleLanguageChange}>
            <option value="">Select Language</option>
            {Object.keys(languageOptions).map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </LanguageSelect>
          <RunButton onClick={runCode}>Run code</RunButton>
        </Buttons>
      </CodeBox>

      <OutputBox>
        <h4>Output</h4>
        <OutputSection>{output}</OutputSection>
      </OutputBox>
    </Container>
  );
};

export default ReadyToCode;
