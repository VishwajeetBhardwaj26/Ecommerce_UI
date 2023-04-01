import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
let response;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  margin-right: 10px;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  useEffect(() => {
    const helper = async () => {
      let response1 = await axios.get(
        "http://localhost:3001/api/products/getProducts",
      );
      response = response1.data;
    };
    helper();
  }, []);
  const handleCart = async (item) => {
    let accesstoken=localStorage.getItem("JWT")
    let body = {
      userId: localStorage.getItem("UserId"),
      products: [
        {
          productId: item._id,
          quantity: 1,
        },
      ],
    };
     await axios.post("http://localhost:3001/api/cart/create",body, {
      headers: {
          'token':`${accesstoken}`,
      }
  })
  .then(response => {
    console.log(response);
      // return  response;
  })
  .catch((error) => {
    console.log(error);
      //return  error;
  });
    //console.log(response);
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {response?.map((item) => (
          <Slide key={item?._id}>
            <ImgContainer>
              <Image src={item?.image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item?.title}</Title>
              <Desc>{item?.description}</Desc>
              <Button
                onClick={() => {
                  handleCart(item);
                }}
              >
                Add To Cart
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
