import React, { useState } from 'react'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInUse, register} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'

const Signup = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    console.log('so far so good...')
    const emailResponse = await isEmailInUse(email)
    console.log('email response', emailResponse)
    if(emailResponse.length == 0 ){
        return false;
    }

    return true;
}

  async function handleSignup(){
    const isValidEmail = await validateEmail()
    // console.log('isValidEmail', isValidEmail)
    // if(!isValidEmail){ return; }
    
    try{
        await register(email, password, setUser)
        router.push('/dashboard')
    }catch(err){
        console.log('Error Signing Up', err)
    }
  }


  return (
    <>
    <Hero text={'BookNest'} />
    <Section>
        <Header>Signup</Header>

        <Wrapper>
        <InputTitle>Email</InputTitle>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Wrapper>

        <Wrapper>
        <InputTitle>Password</InputTitle>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Wrapper>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <ButtonLink onClick={handleSignup}>Signup</ButtonLink>

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
  height: 50vh;
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
  font-size: 24px; /* Adjusted for better scalability */
`;

const Input = styled.input`
  font-size: 16px;
  font-family: Arial, sans-serif;
  width: 80%;

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
`;

const MainButton = styled.button`
  font-size: 16px;

`;

const UserAgreementText = styled.p`
  font-size: 12px;
`;

const UserAgreementSpan = styled(Link)` 
  color: #007bff;

`;


export default Signup