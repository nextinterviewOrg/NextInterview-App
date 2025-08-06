import styled from "styled-components";

export const Container = styled.div`
  // width: 97vw;
  /* border: 2px solid #ccc;
  border-radius: 8px;
  margin: 0px 30px 0px 30px; */
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  height: 85vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  border-radius: 10px;
  position: relative;

  /* Hide scrollbar border and make it thin */
::-webkit-scrollbar {
  width: 6px; /* thin scrollbar */
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent; /* no border or background */
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
  border: none; /* removes scrollbar "border" effect */
}

`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  padding: 10px 15px;
  background-color: #2290ac;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2290ac90
  }
`;

export const Header = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
`;

export const Conversation = styled.div`
 display: flex;
 font-size: 16px;
 font-weight: 600;
 margin-left: 20px;
 font-family: "DM Sans";
`;

export const ConversationBox = styled.div`
    border: 2px solid #F0F8F1;
  border-radius: 8px;
  margin: 0px 30px 0px 30px;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  height: 85vh;
`;

export const TimerBtn = styled.button`
  padding: 5px 10px;
  background: white;
  border: ${(props) => (props.isRunning ? "#1a1c1e99" : "black")};
  color: ${(props) => (props.isRunning ? "#1a1c1e99" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  background: white;
  border: 1px solid #ccc;
`;

export const EndBtn = styled.div`
  color: #2290AC;
  border: 1px solid #2290AC;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
`;

export const ChatBox = styled.div`
  flex-grow: 1; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  // justify-content: flex-start;
  align-items: center;
  height: 60vh;
  overflow-y: auto;  

  /* Custom scrollbar */
  scrollbar-width: thin; 
  scrollbar-color: #888 #f1f1f1; 

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;


export const Message = styled.div`
display: flex;
flex-direction: row;
  padding: 10px;
  border-radius: 8px;
  width: 80%;
  align-items: center;
  align-self: ${(props) => (props.sender === "AI" ? "flex-start" : "flex-end")};
  background: ${(props) => (props.sender === "AI" ? "#F5F5F5" : "#F0F8F1")};
  text-align: left;
  // justify-content: ${(props) => (props.sender === "AI" ? "flex-start" : "flex-end")};
  flex-direction: ${(props) => (props.sender === "AI" ? "row" : "row-reverse")};
`;

export const Profile = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
// width:10%;
  align-self: ${(props) => (props.sender === "M" ? "flex-end" : "flex-start")};

.realtime{
font-size: 12px;
color: #888;
padding-top: 5px;
display: flex;
justify-content: ${(props) => (props.sender === "AI" ? "flex-end" : "flex-start")};
}
  `;


export const Sender = styled.div`
  font-weight: bold;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white; /* Ensure background remains white */
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden; /* Prevent text overflow */
  
  /* Gradient text effect */
  background: linear-gradient(90deg, #D6BD37 0%, #42C62D 25%, #237ED8 50%, #7F1AAE 75%, #C21F46 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${(props) =>
    props.sender === "AI"
      ? "align-self: flex-start; margin: 0 0 0 0;"
      : "align-self: flex-end; margin: 0 0 0 30%;"}
`;


export const Text = styled.pre`
  margin: 0;
  width: 93%;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: auto;
  font-size: 14px;
  font-weight: ${(props) => (props.sender === "AI" ? "700" : "400")};
  color: #1a1c1e;
  font-family: DM SANS;
  margin-bottom: 15px;
`;

export const Img = styled.img`
  text-align: center;
  color: #555;
  width: 50px;
  height: 50px;
  // display: flex;
  // justify-content: center;
`;

export const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #ffffff;
  gap: 10px;
  // position: fixed;
  // margin-top: 30%;
`;

export const InputTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-right: 35px;
  margin-left: 10px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    z-index: 0;
    border-radius: 16px;
    background: linear-gradient(
      90deg,
      #FFE141 0%,
      #7DFF67 25%,
      #2B9DFF 50%,
      #C242FF 75%,
      #FF2D5F 100%
    );
    filter: blur(10px);
    opacity: 0.3;
  }
`;


export const Input = styled.textarea`
  position: relative;
  width: 100%;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  border-image: linear-gradient(
    90deg,
    #FFE141 0%,
    #7DFF67 25%,
    #2B9DFF 50%,
    #C242FF 75%,
    #FF2D5F 100%
  );
  border-image-slice: 1;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  resize: none;
  background-color: white;
  z-index: 1;

  &::placeholder {
    color: #aaa;
  }
`;

export const Sendicon = styled.div`
position: absolute;
right: 20px;
margin-top: 5px;
font-size: 20px; 
cursor: pointer;
`;

export const CharCount = styled.div`
  font-size: 14px;
  color: #666;
  // margin-top: 5px;
  position: absolute;
  right: 50px;
`;

export const SendButton = styled.button`
  padding: 15px 15px;
  background: #2290AC45;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 10%;
  display: ${({show}) => (show ? "none" : "block")};
  &:hover {
    background: #2290AC;
  }
`;

