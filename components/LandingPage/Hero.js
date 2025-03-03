import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { auth } from '@/backend/Firebase'
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useStateContext } from '@/context/StateContext';

const Hero = ({text}) => {
  const {user} = useStateContext(); // global user state
  

  return (
    <Section>
          <Wrapper>
            <Header href="/">{text}</Header>
            <SearchLink href="/search">Search Books</SearchLink>
            <ButtonContainer>
              {user ? 
              <>
                <ButtonLink href="/dashboard">My Books</ButtonLink>
                <ButtonLink onClick={() => signOut(auth)} href='/'>Sign Out</ButtonLink>
              </> : 
              <>
                <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
                <ButtonLink href="/auth/login">Log in</ButtonLink>
              </>}
              
            </ButtonContainer>
          </Wrapper>
    </Section>
  );
};


const Section = styled.section`
background-color: orange;
width: 100%;
height: 80px;
`;

const Overlay = styled.div`
`;

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding-top: 30px;
  gap: 20px;
`;

const Header = styled(Link)`
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
`;

const StyleDiv = styled.div`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: orange;
  padding: 7px 20px;
  border-radius: 50px;
  text-align: left;
`;

const ButtonLink = styled.a`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover{
  background-color:#333;
  };
`;

const SearchLink = styled.a`
  font-family: 'Arial', sans-serif;
  font-size: 14px
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  display: inline-block;
`;

const Logout = styled.button`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 50px;
  &:hover {
    background-color: #333;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.nav`
  display: flex;
  gap: 20px;
  margin-left: auto;
  margin-right: 30px;
`;


export default Hero;
