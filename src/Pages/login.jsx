import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;


const Login = () => {
  const [username,setUserName]=useState();
  const [password,setPassword]=useState(); 
  const handleLogin=async()=>{
    let body={
      "username":username,
      "password":password
    }
    let response=await axios.post("http://localhost:3001/api/auth/login",body)
    if(response.status===200){
      localStorage.setItem("JWT",response.data.jwtToken);
      window.location.replace("/")
    }
    console.log(response);
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>{
            setUserName(e.target.value)
          }}/>
          <Input placeholder="password" onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <Button onClick={(e)=>{e.preventDefault();handleLogin()}}>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;