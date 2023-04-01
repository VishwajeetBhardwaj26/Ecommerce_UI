
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Register from "../Pages/Register";
import Slider from "./slider";
import Login from "../Pages/login";
const Container = styled.div`
  height: 60px;
  background-color: skyblue;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Center = styled.div`
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  return (
    <>
      <Container>
        <Wrapper>
          <Center>
            <Logo>Shopping</Logo>
          </Center>
          <Right>
            <MenuItem
              onClick={() => {
                setClick(true);
              }}
            >
              REGISTER
            </MenuItem>
            <MenuItem
              onClick={() => {
                setClick1(true);
                setClick(false);
              }}
            >
              SIGN IN
            </MenuItem>
            <MenuItem>
                <ShoppingCartOutlined
                  onClick={() => {
                    window.location.replace("/cart");
                  }}
                />
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
      {!click && !click1 && <Slider />}
      {click && <Register />}
      {click1 && <Login />}
    </>
  );
};

export default Navbar;
