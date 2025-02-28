import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import Layout from "@/components/Layout"
import Image from "next/image"
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react';
import { useStateContext } from '@/context/StateContext';
import { auth } from '@/backend/Firebase'
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const {user} = useStateContext(); // global user state

  return (
    <>
        {/* <Hero text={'BookNest'} /> */}
        <ImageContainer>
          <Image
            src = "/img2.png"
            width = {800}
            height = {800}
          />

          <Wrapper>
            BookNest
            <Sub>
              <p>So many books; </p>
              <p>so little time.</p>
            </Sub>
            <ButtonLinkContainer> 
            {user ? 
              <>
                <ButtonLink href="/dashboard">Dashboard</ButtonLink>
                <ButtonLink onClick={() => signOut(auth)} href='/'>Sign Out</ButtonLink>
              </> : 
              <>
                <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
                <ButtonLink href="/auth/login">Log in</ButtonLink>
              </>}
            </ButtonLinkContainer>

          </Wrapper>
          <Image
            src = "/img2.png"
            width = {800}
            height = {800}
          />
        </ImageContainer>
      <Footer/>
    </>
  )
}

const ImageContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;

const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 60px;
  text-decoration: none;
  color: white;
  background-color: orange;
  justify-content: center;
  height: 800px;

  padding-top: 150px;
  padding-right: 200px;
  padding-left: 180px;
  border-radius: 0px;
  font-weight: bold;
`;

const Sub = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 25px;
  justify-content: center;
  margin-top: 10px;
  font-weight: normal;
`

const ButtonLink = styled.a`
  font-family: 'Arial', sans-serif;
  font-size: 17px;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 10px 20px;
  border-radius: 100px;
  display: inline-block;
  margin-top: 100px;
  font-weight: normal;
`;

const ButtonLinkSignOut = styled.a`
  font-family: 'Arial', sans-serif;
  font-size: 17px;
  text-decoration: none;
  color: #dc4d01;
  display: inline-block;
  margin-top: 100px;
  font-weight: normal;
`;

const ButtonLinkContainer = styled.div`
  display:flex;
  gap: 30px;

`

const ButtonLinkContainer1 = styled.div`
  display:flex;
  gap: 30px;

`