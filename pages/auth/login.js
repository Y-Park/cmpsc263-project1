import React, { useState } from 'react'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()


  async function handleLogin(){

  }


  return (
    <>
    <Hero text={'BookNest'} />
    <Section>
        <Header>Log in</Header>

        <Wrapper>
          <InputTitle>Email</InputTitle>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Wrapper>

        <Wrapper>
          <InputTitle>Password</InputTitle>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Wrapper>

        <UserAgreementText>
          By logging in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <ButtonLink onClick={handleLogin}>Log in</ButtonLink>

    </Section>
    </>
  )
}

const Section = styled.section`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 40vh;
`;

const ButtonLink = styled.button`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Header = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  font-size: 16px;
  font-family: Arial, sans-serif;
  width: 80%;
  
`;

const InputTitle = styled.label`
  font-size: 14px;
  color: #666;
`;

const MainButton = styled.button`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login