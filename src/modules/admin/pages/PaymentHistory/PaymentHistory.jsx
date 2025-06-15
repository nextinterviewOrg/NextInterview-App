import React, { useEffect, useState } from "react";
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
import api from "../../../../config/axiosconfig";
import { getAllPayments, getPaymentSummary } from "../../../../api/subscriptionApi";
import { use } from "react";

const PaymentHistory = () => {
  const [selectedTab, setSelectedTab] = useState("month");
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState([]);
  const [LoadingData, setLoadingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const invoicesPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      const summaryData = await getPaymentSummary();
      console.log("summaryData", summaryData);
      setLoadingData(summaryData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const apiCall = async () => {
      try {
        console.log("api call");
        setSummary([]);
        setPayments([]);
        if (selectedTab === "month") {
          const paymentsData = await getAllPayments("monthly");
          setPayments(paymentsData.payments);

          const setData = [{
            icon: (
              <img
                src={transaction}
                alt="Transaction Icon"
                style={{ width: "64px", height: "64px" }}
              />
            ),
            iconType: "transaction",
            title: "Total Successful Payments",
            value: LoadingData.data.month.successCount,
            previous: LoadingData.data.month.previousSuccessCount,
            change: LoadingData.data.month.successChangePercentage.toFixed(2),
            text:"Previous Month",
            isPositive: LoadingData.data.month.successChangePercentage > 0 ? true : false
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
            value: `₹${LoadingData.data.month.current / 100}`,
            previous: `₹${LoadingData.data.month.previous / 100}`,
            change: LoadingData.data.month.change_percentage.toFixed(2),
            text:"Previous Month",
            isPositive: LoadingData.data.month.change_percentage > 0 ? true : false
          }]
          console.log("setData", setData);
          setSummary(setData);
        } else if (selectedTab === "year") {
          const paymentsData = await getAllPayments("yearly");
          setPayments(paymentsData.payments);
          setPayments(paymentsData.payments);
          
          const setData = [{
            icon: (
              <img
                src={transaction}
                alt="Transaction Icon"
                style={{ width: "64px", height: "64px" }}
              />
            ),
            iconType: "transaction",
            title: "Total Successful Payments",
            value: LoadingData.data.year.successCount,
            previous: LoadingData.data.year.previousSuccessCount,
            change: LoadingData.data.year.successChangePercentage.toFixed(2),
            text:"Previous Year",
            isPositive: LoadingData.data.year.successChangePercentage > 0 ? true : false
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
            value: `₹${LoadingData.data.year.current / 100}`,
            previous: `₹${LoadingData.data.year.previous / 100}`,
            change: LoadingData.data.year?.change_percentage.toFixed(2),
            text:"Previous Year",
            isPositive: LoadingData.data.year.change_percentage > 0 ? true : false
          }]
          console.log("setData", setData);
          setSummary(setData);
        } else if (selectedTab === "week") {
          const paymentsData = await getAllPayments("weekly");
          setPayments(paymentsData.payments);
          console.log("paymentsData", paymentsData);
          const setData = [{
            icon: (
              <img
                src={transaction}
                alt="Transaction Icon"
                style={{ width: "64px", height: "64px" }}
              />
            ),
            iconType: "transaction",
            title: "Total Successful Payments",
            value: LoadingData.data.week.successCount,
            previous: LoadingData.data.week.previousSuccessCount,
            change: LoadingData.data.week.successChangePercentage.toFixed(2),
            text:"Previous Week",
            isPositive: LoadingData.data.week.successChangePercentage > 0 ? true : false
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
            value: `₹${LoadingData.data.week.current / 100}`,
            previous: `₹${LoadingData.data.week.previous / 100}`,
            change: LoadingData.data.week.change_percentage.toFixed(2),
            text:"Previous Week",
            isPositive: LoadingData.data.week.change_percentage > 0 ? true : false
          }]
          console.log("setData", setData);
          setSummary(setData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    apiCall();
  }, [selectedTab,LoadingData]);

  // Filter payments based on search term
  const filteredPayments = payments.filter(payment => {
    if (!payment) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      (payment.email && payment.email.toLowerCase().includes(searchLower)) ||
      (payment.method && payment.method.toLowerCase().includes(searchLower)) ||
      (payment.status && payment.status.toLowerCase().includes(searchLower)) ||
      (payment.amount && payment.amount.toString().includes(searchTerm)) ||
      (payment.created_at && new Date(payment.created_at).toLocaleString().toLowerCase().includes(searchLower))
    );
  });

  // Update pagination to use filtered payments
  const totalPages = Math.ceil(filteredPayments.length / invoicesPerPage);
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredPayments.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        {summary.length > 0 && summary.map((card, index) => (
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
                <SubText>{card.text}</SubText>
              </SubTitle>
            </CardDesc>
          </Card>
        ))}
      </CardsContainer>

      <SearchSortRow>
        <Title>All Invoices</Title>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, mode, amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </SearchSortRow>

      <InvoiceTable>
        <thead>
          <tr>
            <Th>Customer Email</Th>
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
                  {item.email}
                </UserCell>
              </Td>
              <Td>
                <UserCell>
                  <ModeCell>
                    <img
                      src={
                        item.method.toLowerCase().includes("upi")
                          ? upiIcon
                          : item.method.toLowerCase().includes("card")
                            ? cardIcon
                            : item.method.toLowerCase().includes("net")
                              ? netBanking
                              : netBanking
                      }
                      alt="mode"
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                  </ModeCell>
                  {item.method}
                </UserCell>
              </Td>
              <Td>{item?.created_at ? (new Date(item?.created_at)).toLocaleString() : ""}</Td>
              <Td>₹{item.amount / 100}</Td>
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
            Showing data {indexOfFirstInvoice + 1}-{Math.min(indexOfLastInvoice, filteredPayments.length)} of {filteredPayments.length}
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