import React, { useState } from 'react';
import {
  Container,
  TabContainer,
  Tab
} from './SetingsPage.styles';
 
import SMTPSettings from '../../components/SMTPsettings/SMTPsettings';
// import AISettings from '../../components/AIsettings/AIsettings';
import UserAccessSettings from '../../components/UserAcess/UserAcess';
 
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('user');
 
  const renderContent = () => {
    switch (activeTab) {
      case 'user':
        return < UserAccessSettings/>;
      // case 'ai':
      //   return <AISettings />;
      case 'smtp':
        return <SMTPSettings />;
      default:
        return null;
    }
  };
 
  return (
    <Container>
      <TabContainer>
      <Tab active={activeTab === 'user'} onClick={() => setActiveTab('user')}>
          User Access
        </Tab>
        {/* <Tab active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>
          AI
        </Tab> */}
        <Tab active={activeTab === 'smtp'} onClick={() => setActiveTab('smtp')}>
          SMTP Server
        </Tab>
 
      </TabContainer>
      {renderContent()}
    </Container>
  );
};
 
export default SettingsPage;
 
 
