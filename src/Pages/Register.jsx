import styled from "styled-components";
import { mobile } from "../responsive";
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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUserName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

  const handleRegister=async()=>{
    let body={
      "username":username,
      "email":email,
      "password":password
    }
    let response=await axios.post("http://localhost:3001/api/auth/register",body)
    if(response.status===201){
      localStorage.setItem("UserId",response.data._id);
      window.location.replace("/")
    }
    console.log(response);
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>{
            setUserName(e.target.value)
          }} />
          <Input placeholder="email" onChange={(e)=>{
            setEmail(e.target.value)
          }} />
          <Input placeholder="password" onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(e)=>{e.preventDefault();handleRegister()}}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;