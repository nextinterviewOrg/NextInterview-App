import React from 'react';
import {
  TableContainer,
  TableHeader,
  RowContainer,
  ModuleName,
  AvgRating,
  RatingStars,
  Star,
  UserCount
} from './UserFeedbackDisplay.style';

const modules = [
  { name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 4, users: 10 },
  { name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 2, users: 20 },
  { name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 3, users: 35 },
  { name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', rating: 4, users: 35 },
];

const renderStars = (count) =>
  [...Array(5)].map((_, i) => (
    <Star key={i} filled={i < count}>★</Star>
  ));

const UserFeedbackDisplay = () => {
  return (
    <TableContainer>
      <TableHeader>
        <div>Module Name</div>
        <div>Avg Rating</div>
        <div>Submitted User Count</div>
      </TableHeader>
      {modules.map((mod, index) => (
        <RowContainer key={index}>
          <ModuleName>{mod.name}</ModuleName>
          <AvgRating>
            {mod.rating}
            <RatingStars>{renderStars(mod.rating)}</RatingStars>
          </AvgRating>
          <UserCount>{mod.users}</UserCount>
        </RowContainer>
      ))}
    </TableContainer>
  );
};

export default UserFeedbackDisplay;
