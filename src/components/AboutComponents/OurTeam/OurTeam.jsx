import React from 'react';
import { Container, Title, Subtitle, TeamGrid, TeamCard, Image, Role, Name } from './OurTeam.styles';
import team1 from '../../../assets/team1.png';
import team2 from '../../../assets/team2.png';
import team3 from '../../../assets/team3.png';
import team4 from '../../../assets/team4.png';

const teamMembers = [
  { name: 'Annette Black', role: 'Lorem Ipsum', image: team1 },
  { name: 'Wade Warren', role: 'Lorem Ipsum', image: team2 },
  { name: 'Savannah Nguyen', role: 'Lorem Ipsum', image:team3},
  { name: 'Jenny Wilson', role: 'Lorem Ipsum', image: team4 },
  { name: 'Annette Black', role: 'Lorem Ipsum', image:team1 },
  { name: 'Wade Warren', role: 'Lorem Ipsum', image: team2 },
  { name: 'Savannah Nguyen', role: 'Lorem Ipsum', image: team3 },
  { name: 'Jenny Wilson', role: 'Lorem Ipsum', image: team4 },
];

const OurTeam = () => {
  return (
    <Container>
      <Title>Meet our team</Title>
      <Subtitle>Meet our team of professionals to Lorem ipsum dolor</Subtitle>
      <TeamGrid>
        {teamMembers.map((member, index) => (
          <TeamCard key={index}>
            <Image src={member.image} alt={member.name} />
            <Role>{member.role}</Role>
            <Name>{member.name}</Name>
          </TeamCard>
        ))}
      </TeamGrid>
    </Container>
  );
};

export default OurTeam;
