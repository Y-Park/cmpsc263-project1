import React, { useState, useEffect } from 'react'
import { openai } from '@ai-sdk/openai'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import { auth, database } from '@/backend/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { getDocs, getDoc, setDoc } from 'firebase/firestore'


const Dashboard = () => {

  const { user, setUser } = useStateContext() 
  const router = useRouter()
  const [markedBooks, setMarkedBooks] = useState([]);

  async function showBooks() {
    if (!user) return;
    try{
      const bookCol = collection(database, "users", user.uid, "markedBooks");
      const booksList = (await getDocs(bookCol)).docs.map(doc => doc.data());

      setMarkedBooks(booksList);
    } catch(err) {
      alert(`Error getting marked books: ${err}`);
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      if (currentUser){
        setUser(currentUser);
      } else {
        router.push('/');
      }
    })
    return () => unsubscribe();
  }, [router, setUser])

  useEffect(() => {
    if (user) {
      showBooks();
    }
  }, [user]);

  return (
    <>
      <Hero text={'BookNest'} />
      <Section>
        <Container>
          {markedBooks.length > 0 ? 
          markedBooks.map((book,index) => (
          <BookCard key={index}>
            <img
              src={book.image || "/placeholder.png"}
            />
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.authors?.join(", ") || "N/A"}</p>
              <ButtonLink href={book.link} target="_blank">
                More Info
              </ButtonLink>
            </div>
          </BookCard>)) : 
          <NoBooks>No marked books.</NoBooks>}
        </Container>

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
const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: auto;
  text-align: center;
`;


const TopHeader = styled.h1`
font-size: 26px;
display: flex;

`
const BookCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly; 
  align-items: center;
  gap: 50px;
  height: 150px;
  border-bottom: 1px solid #ddd;

  img {
    flex-shrink: 0;
    width: 90px;
    height: 120px;
    object-fit: cover;
    border: 2px solid #ddd;
  }

  div {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 400px;
    gap: 5px;
  }

  h3 {
    font-family: 'Arial', sans-serif;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  p {
    text-overflow: ellipsis;
    max-width: 300px;
  }

  a {
    font-family: 'Arial', sans-serif;
    // text-decoration: none;
    // color: black;
    // padding: 7px 14px;
    // cursor: pointer;
    // transition: background-color 0.3s;
    // &:hover{
    // color:#333;
    // };
    // text-overflow: ellipsis;
  }
`
const NoBooks = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 30px;
`

const ButtonLink = styled.a`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 7px 14px;
  margin-left: 45px;
  margin-top: 5px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover{
  background-color:#333;
  };
  max-width: 100px;
`;

export default Dashboard