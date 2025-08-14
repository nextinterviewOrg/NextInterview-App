import styled from "styled-components";


export const ModuleSidebarContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sidebarBgColor};
  width: ${(props) => {
    if (props.isMobile) {
      return props.sidebarOpen ? "250px" : "0";
    }
    return props.isExpanded ? "250px" : "60px";
  }};
  height: 100vh;
  transition: all 0.3s ease;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  box-shadow: ${props => props.isMobile && props.sidebarOpen ? "2px 0 10px rgba(0,0,0,0.1)" : "none"};
  left: ${props => props.isMobile && !props.sidebarOpen ? "-250px" : "0"};
  @media (max-width: 768px) {
    left: ${props => props.sidebarOpen ? "0" : "-250px"};
    width: 250px;
    transition: left 0.3s ease;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => (props.isExpanded || props.isMobile) ? "20px" : "10px"};
    min-height: 60px;

    img {
      width: ${(props) => (props.isExpanded || props.isMobile) ? "80%" : "50%"};
      transition: width 0.3s ease;
      min-width: 100px;
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    align-items: ${(props) => (props.isExpanded ? "flex-start" : "center")};
  }

  .menu-item {
    width: 100%;
  }

  .menu-link {
    display: flex;
    align-items: center;
    padding: ${(props) => (props.isExpanded ? "10px 15px" : "10px")};
    color: ${(props) => props.theme.colors.sidebarTextColor || "grey"};
    text-decoration: none;
    transition: padding 0.3s ease, background-color 0.3s ease;

    &:hover {
      background-color: ${(props) =>
    props.theme.colors.sidebarHoverBgColor || "#e0e0e0"};
    }

    &.active {
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) =>
    props.theme.colors.sidebarActiveBgColor || "#f0f0f0"};
      font-weight: bold;
    }

    .menu-link-icon {
      margin-right: ${(props) => (props.isExpanded ? "10px" : "0")};
      font-size: 20px;
      transition: margin 0.3s ease;
    }

    .menu-link-text {
      display: ${(props) => (props.isExpanded ? "inline-block" : "none")};
      font-size: 14px;
      transition: opacity 0.3s ease;
    }
  }

  .progress-section {
    padding: 15px;
    text-align: center;
    // margin-bottom: 20px;
  }

  .progress-section h3 {
    font-size: 14px;
    color: #ddd;
  }

  .progress-bar-container {
    width: 100%;
    height: 10px;
    background-color: #444;
    border-radius: 5px;
    margin: 10px 0;
  }

  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    border-radius: 5px;
  }

  /* Course Topics Section */
  .course-topics {
    padding: 10px;
    margin-bottom: 30px;
    overflowy: scroll;
    height: 70vh;
    scrollbar-width: none;
  }

  .course-topics-title {
    text-overflow: ellipsis;
    /* font-family: "DM Sans"; */
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
  }

  .topic {
    margin-bottom: 15px;
  }

  .topic-title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.black};
    /* font-family: "DM Sans"; */
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    //   background-color: #f8f8f8;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .topic-title:hover {
    background-color: #e0e0e0;
  }
  .topic-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 90%;
    font-size: 18px;
  }

  .subtopics {
    padding-left: 20px;
    margin-top: 10px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.black};
    /* font-family: "DM Sans"; */
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
      min-height: fit-content!important;
       height: auto!important;
  }

  .subtopic-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
     min-height: fit-content!important;
       height: auto!important;
  }

  .subtopic-info .completed {
    display: flex;

    gap: 4px;
    color: green;
  }

  .subtopic-info .pending {
    color: orange;
  }

  .time {
    font-size: 14px;
    color: #777;
  }

  .subtopic-info span {
    margin-right: 10px;
     min-height: fit-content!important;
       height: auto!important;
  }

  .subtopic-title {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.black};
    /* font-family: "DM Sans"; */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
    padding: 10px;
      //  min-height: fit-content!important;
      //  height: auto!important;
  }

  .module-sidebar-topic-title {
    /* font-family: "DM Sans"; */
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    align-items: left;
    text-align: left;
  }
  .progress-details {
    display: flex;
    justify-content: space-between;
    /* font-family: "DM Sans"; */
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textgray};
  }
  .progress-details-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* font-family: "DM Sans"; */
    font-size: 16px;
  }
  .subtopic-link {
    text-decoration: none;
    color: inherit;
    
  }
  .subtopic-link:visited .subtopic-title {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
  }

  // Add to your ModuleSidebar.styles.js
.subtopic-link.disabled {
  cursor: not-allowed;
  opacity: 0.7;
  
  &:hover {
    background-color: transparent;
  }
}

  .start-button {
    width: 170px;
    height: 34px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
    gap: 10px;
    text-align: center;
    /* Body Text/Small/Body Small (Medium) */
    /* font-family: "DM Sans"; */
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.secondary};
    margin-top: 20px;
    background-color: transparent;
  }
`;

export const MobileToggleButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1100;

  background: ${props => props.theme.colors.lightgreen};
  color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.visible ? 'block' : 'none'};
`;

export const SubscriptionModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const SubscriptionModal = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;

  /* @media (max-width: 480px) {
    max-width: 200px;
  } */

  h3 {
    margin: 10px 0px 20px 0;
    color: #333;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }

  p {
    margin-bottom: 1.5rem;
    color: #666;
  }

  button {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

  }

  .primary-btn {
  background-color: ${(props) => props.theme.colors.info}!important;
    color: white!important;

    &:hover {
  background-color: ${(props) => props.theme.colors.secondary}!important;
    }

    @media (max-width: 480px) {
      width: 100%;
      margin-top: 10px; 
    }
  }

  .secondary-btn {
    background-color: #fff;
    color: ${(props) => props.theme.colors.secondary};
      border: 1px solid ${(props) => props.theme.colors.secondary}!important;

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  .close-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    background: transparent!important;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black!important;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

`;

