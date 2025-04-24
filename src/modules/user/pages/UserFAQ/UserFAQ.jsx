// UserFAQ.js
import React, { useEffect, useState } from "react";
import {
  FAQContainer,
  FAQTitle,
  FAQSubtitle,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  ToggleButton,
  RaiseQueryButton,
} from "../UserFAQ/UserFAQ.style";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import SupportQuery from "../../components/SupportQuery/SupportQuery";
import theme from "../../../../theme/Theme";
import { getFaq } from "../../../../api/faqApi";


const UserFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaq();
        setFaqs(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "flex-end",
          width: "95%",
          margin: " auto",
        }}
      >
        <FAQTitle>Frequently asked questions</FAQTitle>
        <RaiseQueryButton onClick={() => setIsModalOpen(true)}>
          Raise Query
        </RaiseQueryButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "93%",
          margin: "auto",
        }}
      >
        <FAQSubtitle>
          Everything you need to know about the product and billing.
        </FAQSubtitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              <ToggleButton>
                {openIndex === index ? (
                  <CiCircleMinus
                    style={{ color: `${theme.colors.secondary}` }}
                  />
                ) : (
                  <CiCirclePlus
                    style={{ color: `${theme.colors.secondary}` }}
                  />
                )}
              </ToggleButton>
            </FAQQuestion>
            {openIndex === index && <FAQAnswer>{faq.answer}</FAQAnswer>}
          </FAQItem>
        ))}
      </div>
      {isModalOpen && (
        <SupportQuery
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </FAQContainer>
  );
};

export default UserFAQ;
