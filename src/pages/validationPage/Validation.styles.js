import styled from "styled-components";
import theme from "../../theme/Theme";

export const Container = styled.div`
 background-color: ${(props) => props.theme.colors.light};
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 40px;
    // max-width: 600px;
    margin: 0 auto;
    height: 100vh;
    `;