import React, { useState } from 'react';
import {
  EditorContainer,
  StyledIframe,
  Title,
  QuestionBox,
  Wrapper,
  BackIcon,
} from './CodeEditorWindow.styles';
import { RxArrowLeft } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
 
const CodeEditorWindow = () => {
  const [language, setLanguage] = useState('python');
  const navigate = useNavigate();
 
  const getIframeSrc = () => {
    if (language === 'python') {
      return 'https://onecompiler.com/embed/python?hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&disableCopyPaste=true&disableAutoComplete=true&theme=dark&fontSize=20&hideEditorOptions=true&hideStdin=true';
    } else if (language === 'mysql') {
      return 'https://onecompiler.com/embed/mysql?hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&disableCopyPaste=true&disableAutoComplete=true&theme=dark&fontSize=20&hideEditorOptions=true&hideStdin=true';
    }
    return '';
  };
 
  const handleGoBack = () => {
    navigate('/user/challengeInfo'); // Navigate back to the previous page
  };
 
  return (
    <Wrapper>
      <BackIcon              onClick={handleGoBack}
            style={{
              borderRadius: "10%",
              border: "1px solid grey",
              padding: "8px",
            }}><RxArrowLeft /></BackIcon>
      <Title>Question Type - Coding</Title>
        <QuestionBox>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </QuestionBox>
 
      <EditorContainer>
        <StyledIframe src={getIframeSrc()} title={`${language} editor`} />
      </EditorContainer>
    </Wrapper>
  );
};
 
export default CodeEditorWindow;
 
 