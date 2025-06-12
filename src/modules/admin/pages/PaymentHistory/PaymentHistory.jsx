import React, { useState } from "react";
import {
  Container,
  Header,
  Wrapper,
  Tabs,
  Tab,
  CardsContainer,
  Card,
  IconCircle,
  CardTitle,
  Value,
  Comparison,
  SubText,
  CardDesc,
  SubNumber,
  SubTitle,
  ChangeText,
  InvoiceTable,
  Th,
  Tr,
  Td,
  UserCell,
  Avatar,
  StatusBadge,
  SearchSortRow,
  Pagination,
  Title,
  ModeCell
} from "./PaymentHistory.styles";

import { FiSearch } from "react-icons/fi";
import { GoArrowUp, GoArrowDown, GoPeople } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";

import transaction from "../../../../assets/transactions.svg";
import SalesAmount from "../../../../assets/sales-amount.svg";
import cardIcon from "../../../../assets/card-icon.jpg";
import netBanking from "../../../../assets/net-banking.jpg";
import upiIcon from "../../../../assets/upi-icon.png";

const PaymentHistory = () => {
  const [selectedTab, setSelectedTab] = useState("month");
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  const cardData = [
    {
      icon: (
        <img
          src={transaction}
          alt="Transaction Icon"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      iconType: "transaction",
      title: "Total Successful Payments",
      value: 100,
      previous: 70,
      change: 16,
      isPositive: true
    },
    {
      icon: <GoPeople style={{ fontSize: "64px" }} />,
      iconType: "people",
      title: "Total Unique Subscribers",
      value: 80,
      previous: 90,
      change: 11,
      isPositive: false
    },
    {
      icon: (
        <img
          src={SalesAmount}
          alt="Sales Amount Icon"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      iconType: "sales",
      title: "Total Payments",
      value: "₹30,899",
      previous: "₹20,899",
      change: 16,
      isPositive: true
    }
  ];

  const invoices = [
    {
      name: "Jane Cooper",
      mode: "UPI",
      date: "20/05/25",
      amount: "₹1,899",
      status: "Success"
    },
    {
      name: "Albert Stephan",
      mode: "Net Banking",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Failed"
    },
    {
      name: "John Doe",
      mode: "Debit card",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Processing"
    },
    {
      name: "Albert Jain",
      mode: "Visa Card",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Failed"
    },
    {
      name: "Jane Cooper",
      mode: "Net Banking",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Success"
    },
    {
      name: "Jane Cooper",
      mode: "UPI",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Success"
    },
    {
      name: "Jane Cooper",
      mode: "Master Card",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Processing"
    },
    {
      name: "Jane Cooper",
      mode: "American Express",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Failed"
    },
    {
      name: "Steve Smith",
      mode: "UPI",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Success"
    },
    {
      name: "Mary Jane",
      mode: "Net Banking",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Failed"
    },
    {
      name: "Jake Long",
      mode: "UPI",
      date: "20/10/24",
      amount: "₹1,899",
      status: "Success"
    }
  ];

  const totalPages = Math.ceil(invoices.length / invoicesPerPage);
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  return (
    <Container>
      <Wrapper>
        <Header>Payment History</Header>
        <Tabs>
          <Tab active={selectedTab === "week"} onClick={() => setSelectedTab("week")}>This Week</Tab>
          <Tab active={selectedTab === "month"} onClick={() => setSelectedTab("month")}>This Month</Tab>
          <Tab active={selectedTab === "year"} onClick={() => setSelectedTab("year")}>This Year</Tab>
        </Tabs>
      </Wrapper>

      <CardsContainer>
        {cardData.map((card, index) => (
          <Card key={index}>
            <IconCircle iconType={card.iconType}>{card.icon}</IconCircle>
            <CardDesc>
              <CardTitle>{card.title}</CardTitle>
              <Comparison>
                <Value>{card.value}</Value>
                <ChangeText isPositive={card.isPositive}>
                  {card.isPositive ? <GoArrowUp /> : <GoArrowDown />}
                  {`${card.change}%`}
                </ChangeText>
              </Comparison>
              <SubTitle>
                <SubNumber>{card.previous}</SubNumber>
                <div className='line'></div>
                <SubText>Previous Month</SubText>
              </SubTitle>
            </CardDesc>
          </Card>
        ))}
      </CardsContainer>

      <SearchSortRow>
        <Title>All Invoices</Title>
        <div className="search">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
      </SearchSortRow>

      <InvoiceTable>
        <thead>
          <tr>
            <Th>Customer Name</Th>
            <Th>Payment Mode</Th>
            <Th>Payment Date</Th>
            <Th>Payment Amount</Th>
            <Th>Payment Stage</Th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((item, index) => (
            <Tr key={index}>
              <Td>
                <UserCell>
                  <Avatar><IoPersonOutline /></Avatar>
                  {item.name}
                </UserCell>
              </Td>
              <Td>
                <UserCell>
                  <ModeCell>
                    <img
                      src={
                        item.mode.toLowerCase().includes("upi")
                          ? upiIcon
                          : item.mode.toLowerCase().includes("card")
                          ? cardIcon
                          : item.mode.toLowerCase().includes("net")
                          ? netBanking
                          : netBanking
                      }
                      alt="mode"
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                  </ModeCell>
                  {item.mode}
                </UserCell>
              </Td>
              <Td>{item.date}</Td>
              <Td>{item.amount}</Td>
              <Td>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </Td>
            </Tr>
          ))}
        </tbody>
      </InvoiceTable>

      <Pagination>
        <div>
          <span style={{ color: "#1A1C1E99" }}>
            Showing data {indexOfFirstInvoice + 1}-{Math.min(indexOfLastInvoice, invoices.length)} of {invoices.length}
          </span>
        </div>
        <div>
          <span
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            ← Previous
          </span>
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <span
                key={pageNum}
                className={pageNum === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </span>
            );
          })}
          <span
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          >
            Next →
          </span>
        </div>
      </Pagination>
    </Container>
  );
};

export default PaymentHistory;
