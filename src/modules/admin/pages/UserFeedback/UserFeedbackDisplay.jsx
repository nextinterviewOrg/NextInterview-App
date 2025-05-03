import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  TableHeader,
  RowContainer,
  ModuleName,
  AvgRating,
  RatingStars,
  Star,
  UserCount,
  Container
} from './UserFeedbackDisplay.style';
import { getSummaryFeedbackAllModule } from '../../../../api/moduleFeedbackApi';

const renderStars = (count) =>
  [...Array(5)].map((_, i) => (
    <Star key={i} filled={i < count}>★</Star>
  ));

const UserFeedbackDisplay = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSummaryFeedbackAllModule();
        if (response && response.sucess) {
          const formattedModules = response.data.map(item => ({
            id: item.module._id,
            name: item.module.moduleName,
            rating: Math.round(item.averageRating), // Round to nearest integer for star display
            users: item.submittedUserFeedbackCount,
            description: item.module.description
          }));
          setModules(formattedModules);
        }
      } catch (error) {
        console.error('Error fetching module feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!modules.length) {
    return <div>No module feedback data available</div>;
  }

  return (
    <Container>
    <TableContainer>
      <TableHeader>
        <div>Module Name</div>
        <div>Avg Rating</div>
        <div> User Count</div>
      </TableHeader>
      {modules.map((mod) => (
        <RowContainer key={mod.id}>
          <ModuleName title={mod.description}>{mod.name}</ModuleName>
          <AvgRating>
            {mod.rating}
            <RatingStars>{renderStars(mod.rating)}</RatingStars>
          </AvgRating>
          <UserCount>{mod.users}</UserCount>
        </RowContainer>
      ))}
    </TableContainer>
    </Container>
  );
};

export default UserFeedbackDisplay;