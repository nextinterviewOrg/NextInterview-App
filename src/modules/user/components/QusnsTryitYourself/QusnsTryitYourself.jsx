import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { gettiyquestions } from '../../../../api/tiyApi';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';

const QusnsTryitYourself = () => {
  const [questions, setQuestions] = useState([]);
  const { module_code, topic_code } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userRes = await getUserByClerkId(user.id);
        const userId = userRes._id;
console.log(userId);
        const res = await gettiyquestions(module_code, topic_code, userId);
        console.log("res.data", res.data);
        setQuestions(res.data);
      } catch (error) {
        console.error('Failed to fetch coding questions:', error);
      }
    };

    if (user?.id && module_code && topic_code) {
      fetchQuestions();
    }
  }, [user, module_code, topic_code]);

  return (
    <Container>
      {questions.map((q) => (
        <QuestionCard key={q._id}>
          <Icon>
            {q.completed ? (
              <FaCheck color="green" />
            ) : q.question_type === 'coding' ? (
              <HiOutlineCode color="purple" />
            ) : (
              <LuPencil color="darkblue" />
            )}
          </Icon>
          <Content>
            <TagsRow>
              <Tag>{q.question_type}</Tag>
              <Tag difficulty={q.level}>{q.level}</Tag>
            </TagsRow>
            <Title>{q.question}</Title>
          </Content>
        </QuestionCard>
      ))}
    </Container>
  );
};

export default QusnsTryitYourself;
