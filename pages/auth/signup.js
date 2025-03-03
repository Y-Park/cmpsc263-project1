import React, { useState, useEffect } from 'react'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import { auth } from '@/backend/Firebase'

const Signup = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return 2;
    }
    // console.log('so far so good...')
    // const emailResponse = await isEmailInUse(email)
    // console.log('email response', emailResponse)
    // if(emailResponse.length > 0 ){
    //     return 1;
    // }

    return 0;
}

  async function handleSignup(){
    const emailResult = await validateEmail()
    if(emailResult === 2){
      alert("Invalid email "); 
      return;
    } else if (emailResult === 1){
      alert("Address already in use "); 
      return;
    }
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredentials.user);
        router.push('/dashboard')
    }catch(err){
        alert(`Error Signing Up: ${err}`)
    }
  }

  useEffect(() => {
      if(user){
        router.push('/dashboard')
      }else{
  
      }
    }, user)

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
        <ButtonLink onClick={handleSignup}>Signup</ButtonLink>
        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>
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
  height: 450px;
`;

const ButtonLink = styled.a`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover{
  background-color:#333;
  };
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
  font-size: 16px;

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


export default Signup