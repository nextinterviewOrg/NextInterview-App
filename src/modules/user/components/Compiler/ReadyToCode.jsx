import React from "react";
import Editor from "@monaco-editor/react";
import {
  Container,
  CodeBox,
  RunButton,
  OutputBox,
  OutputSection,
  OptimiseButton,
  SubmitButton,
  Output,
  TryHarderButton,
  HardandOptimise,
  Buttons,
  LanguageSelect
} from "./ReadyToCode.styles";
import { PiStarFour } from "react-icons/pi";

const languageOptions = {
  python: {
    filename: "index.py",
    defaultCode: `import sys\nname = sys.stdin.readline()\nprint('Hello ' + name.strip())`,
  },
  mysql: {
    filename: "main.sql",
    defaultCode: `SELECT 'Hello Peter';`,
  },
};

const ReadyToCode = ({
  selectLang,
  setSelectLang,
  code,
  setCode,
  output,
  setOutput,
  input,
  setInput,
  setRunClicked,
  showOptimiseBtn,
  handleOptimizeCode,
  optimizeClicked,
  handleSubmit,
  isSubmitting,
  dbSetupCommands,
  challenge = false,
  tryHarderQuestion
}) => {
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectLang(lang);
    setCode("");
    setOutput("");
    setRunClicked(false);
  };

  const runCode = async () => {
    if (!selectLang || !code) {
      setOutput("Please select a language and write some code.");
      return;
    }
    const payload = {
      language: selectLang,
      files: [
        {
          name: languageOptions[selectLang].filename,
          content: selectLang === "python" ? code : dbSetupCommands + code,
        },
      ],
      stdin: selectLang === "python" ? input : "",
    };
    try {
      const res = await fetch("https://onecompiler-apis.p.rapidapi.com/api/v1/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": "e3d1d11c7dmshca53081ed1ccf3fp1b61cdjsn79cc71e1336c",
          "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setRunClicked(true);
      if (result.status === "success") {
        setOutput(result.stdout || result.stderr || "No output");
      } else {
        setOutput("Error: " + (result.exception || "Unknown error"));
      }
    } catch (err) {
      setOutput("Request failed: " + err.message);
    }
  };

  return (
    <Container>
      <CodeBox>
        <Editor
          height="300px"
          language={selectLang || "plaintext"}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-light"
        />
        <Buttons>
          {/* <LanguageSelect value={selectLang} onChange={handleLanguageChange}>
            <option value="">Select Language</option>
            {Object.keys(languageOptions).map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </LanguageSelect> */}
          <RunButton onClick={runCode}>Run code</RunButton>
        </Buttons>
      </CodeBox>

      {/* {selectLang === "python" && (
        <InputBox>
          <h4>Input</h4>
          <TextBox
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input..."
            style={{ width: "100%", height: "50px", marginTop: "10px" }}
          />
        </InputBox>
      )} */}

      {output !== "" && (
        <Output>
          <h4>Output</h4>
          <OutputBox>
            <OutputSection>{output}</OutputSection>

            {showOptimiseBtn && (
              <HardandOptimise>
                {!challenge ?
                  <TryHarderButton onClick={()=>{ console.log('clicked');tryHarderQuestion()}}>
                    <PiStarFour /> Try Harder Question
                  </TryHarderButton> :
                  <div>
                  </div>}
                <div style={{ display: "flex", gap: "10px" }}>
                  {/* {!optimizeClicked ? ( */}
                  <OptimiseButton
                    onClick={handleOptimizeCode}
                  >
                    Optimise Code
                  </OptimiseButton>
                  {/* ) : ( */}
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </SubmitButton>
                  {/* )} */}
                </div>

              </HardandOptimise>
            )}
          </OutputBox>
        </Output>
      )}
    </Container>
  );
};

export default ReadyToCode;
