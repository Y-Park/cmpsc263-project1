import React, { useState, useEffect } from 'react'
import { openai } from '@ai-sdk/openai'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import { auth } from '@/backend/Firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Dashboard = () => {

  const { user, setUser } = useStateContext() 
  const router = useRouter()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      if (currentUser){
        setUser(currentUser)
      } else {
        router.push('/')
      }
    })
    return () => unsubscribe();
  }, [router, setUser])


  return (
    <>
      <Hero text={'BookNest'} />
      <Section>

      </Section>
    </>
  )
}


//STYLED COMPONENTS
const Section = styled.section`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`



const TopHeader = styled.h1`
font-size: 26px;
display: flex;

`



export default Dashboard