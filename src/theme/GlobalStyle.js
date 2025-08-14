import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Body text & UI Elements use Inter */
  body, p, span, li, button, input, textarea, label {
    font-family: 'Inter', sans-serif;
  }

  /* Headings use Poppins */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }

      .page-wrapper{
        min-height: 100vh;
        display: flex;
        width: 100%;
        transition: margin-left 0.3s ease-in-out;
    }

    .content-wrapper{
        flex: 1;
        max-width: 1600px;
        margin-right: auto;
    
         margin-left: ${(props) => (props.isExpanded ? "200px" : "60px")};
  padding: 20px;
  width: calc(100% - ${(props) => (props.isExpanded ? "200px" : "60px")});
  transition: margin-left 0.3s ease, width 0.3s ease;
    }
    .content-wrapper2{
        flex: 1;
        max-width: 100vw;
        max-height: 100vh;
   
    
        


  transition: margin-left 0.3s ease, width 0.3s ease;
    }
`;

export default GlobalStyle;
