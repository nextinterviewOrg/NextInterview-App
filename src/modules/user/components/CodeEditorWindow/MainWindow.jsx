import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "./utils/general";
import { languageOptions } from "./constants/languageOptions";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdPlayDisabled } from "react-icons/md";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "./lib/defineTheme";
import useKeyPress from "./hooks/useKeyPress";
// import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import { LandingWrapper } from "./Landing.style";

const javascriptDefault = `// some comment`;

const MainWindow = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  // const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [languages, setLanguages] = React.useState([]);
  const [language, setLanguage] = useState(languages[0]);
  useEffect(() => {
    const apiCaller = async () => {
      const options = {
        method: "GET",
        url: "https://judge0-extra-ce.p.rapidapi.com/languages",
        headers: {
          "x-rapidapi-key":
            "ae1d4db102mshca27e059c4571a1p177bfcjsn7e49f5986951",
          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const languageData = response.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.name,
          };
        });
        setLanguages(languageData);
      } catch (error) {
        console.error(error);
      }
    };
    apiCaller();
  }, []);

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // language_id: 1,
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "ae1d4db102mshca27e059c4571a1p177bfcjsn7e49f5986951",
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      // url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      url: `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "ae1d4db102mshca27e059c4571a1p177bfcjsn7e49f5986951",
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };

  function handleThemeChange(th) {
    // We will come to the implementation later in the code
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <LandingWrapper>
      <>
        {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
        <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
        <div className="button-top">
          <div className="editor-title">Question Type - Coding</div>
          <div className="btns-both">
            <div className="btn-title">Language</div>
            {/* <div className=""> */}
            <LanguagesDropdown onSelectChange={onSelectChange} />
            {/* </div> */}
          </div>
        </div>
        <div className="flex flex-row space-x-4 items-start px-4 py-4">
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>

          <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
            <OutputWindow
              outputDetails={outputDetails}
              customBTN={
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={"compile-btn"}
                  style={{ disabled: processing }}
                >
                  {processing ? <MdPlayDisabled /> : <FaRegCirclePlay />}
                </button>
              }
            />
            <div className="flex flex-col items-end">
              {/* <CustomInput
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                            />
                            <button
                                onClick={handleCompile}
                                disabled={!code}
                               className="compile-btn"
                            >
                                {processing ? "Processing..." : "Compile and Execute"}
                            </button> */}
            </div>
            {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
          </div>
        </div>
        {/* <Footer /> */}
      </>
    </LandingWrapper>
  );
};
export default MainWindow;
