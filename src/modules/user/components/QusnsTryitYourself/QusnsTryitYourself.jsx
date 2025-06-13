import React from 'react';
import {
  Container,
  QuestionCard,
  Icon,
  Content,
  TagsRow,
  Tag,
  Title,
} from './QusnsTryitYourself.styles';
import { HiOutlineCode } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { LuPencil } from 'react-icons/lu';

const questions = [
  {
    id: 1,
    completed: false,
    type: 'coding',
    category: 'Algorithms',
    difficulty: 'Easy',
    text: 'Write a function to reverse a string.',
  },
  {
    id: 2,
    completed: false,
    type: 'mcq',
    category: 'Data Structures',
    difficulty: 'Medium',
    text: 'What is the time complexity of inserting an element into a heap?',
  },
  {
    id: 3,
    completed: false,
    type: 'multi line',
    category: 'System Design',
    difficulty: 'Hard',
    text: 'Design a scalable URL shortening service.',
  },
  {
    id: 4,
    completed: false,
    type: 'approach',
    category: 'Approach',
    difficulty: 'Medium',
    text: 'This is approach question.',
  },
   {
    id: 5,
    completed: false,
    type: 'singleline',
    category: 'single line',
    difficulty: 'Medium',
    text: 'What is the time complexity of inserting an element into a heap?',
  },
];

const QusnsTryitYourself = () => {
  return (
    <Container>
      {questions.map((q) => (
        <QuestionCard key={q.id}>
          <Icon>
            {q.completed ? (
              <FaCheck color="green" />
            ) : q.type === 'coding' ? (
              <HiOutlineCode color="purple" />
            ) : (
              <LuPencil color="darkblue" />
            )}
          </Icon>
          <Content>
            <TagsRow>
              <Tag>{q.type}</Tag>
              <Tag difficulty={q.difficulty}>{q.difficulty}</Tag>
            </TagsRow>
            <Title>{q.text}</Title>
          </Content>
        </QuestionCard>
      ))}
    </Container>
  );
};

export default QusnsTryitYourself;
