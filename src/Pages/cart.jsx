import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressForm from "./Order";
const Container = styled.div``;
let sum;
let updatedData1;
let accesstoken = localStorage.getItem("JWT");
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
let userId = localStorage.getItem("UserId");
const Cart = () => {
  const [dummyArr, setDummyArr] = useState([]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    const helper = async () => {
      sum = 0;
      let yourConfig = {
        headers: {
          token: accesstoken,
        },
      };
      let response = await axios.get(
        `http://localhost:3000/api/cart/find/${userId}`,
        yourConfig
      );
      let products = response.data.map(function (item) {
        return item.products;
      });
      const ids = products.map((innerArray) => innerArray[0].productId);
      const updatedData = products.map((innerArray) =>
        innerArray.map(({ _id, ...rest }) => rest)
      );
       updatedData1 = updatedData.reduce(
        (acc, innerArray) => [...acc, ...innerArray],
        []
      );
      ids.forEach((item) => {
        let yourConfig = {
          headers: {
            token: accesstoken,
          },
        };
        axios
          .get(`http://localhost:3000/api/products/find/${item}`, yourConfig)
          .then((response) => {
            sum += response.data.price;
            let body = {
              title: response.data.title,
              id: response.data._id,
              color: response.data.color,
              size: response.data.size,
              price: response.data.price,
              image: response.data.image,
            };
            setDummyArr([...dummyArr, body]);
          });
      });
    };
    helper();
  }, []);
  return (
    <>
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopTexts></TopTexts>
          </Top>
          <Bottom>
            <Info>
              {dummyArr?.map((item) => (
                <Product>
                  <ProductDetail>
                    <Image src={item.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item.id}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size:</b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>$ {item.price}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {sum}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {sum}</SummaryItemPrice>
              </SummaryItem>
              <Button
                onClick={() => {
                  setClick(true);
                }}
              >
                Order Now
              </Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      {click && <AddressForm setClick={setClick} sum={sum} updatedData1={updatedData1} />}
    </>
  );
};

export default Cart;
