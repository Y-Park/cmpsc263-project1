import React, { useState, useEffect } from 'react'
import Hero from "@/components/LandingPage/Hero"
import styled from 'styled-components'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import { auth, database } from '@/backend/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'


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

  async function removeBook(book) {
    if (!user) returh;
    try{
      const bookElement = doc(database, "users", user.uid, "markedBooks", book.id);
      await deleteDoc(bookElement);
      showBooks();
    }catch(err){
      alert(`Error removing book: ${err}`)
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
            <FlexDiv>
              <h3>{book.title}</h3>
              <p>Author: {book.authors?.join(", ") || "N/A"}</p>
              <ButtonLinkContainer>
                <ButtonLink href={book.link} target="_blank">
                  More Info
                </ButtonLink>
                <ButtonLink onClick={() => removeBook(book)}>
                  Remove
                </ButtonLink>
              </ButtonLinkContainer>
            </FlexDiv>
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

const FlexDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 400px;
    gap: 5px;
`
const BookCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly; 
  align-items: center;
  height: 150px;
  border-bottom: 1px solid #ddd;

  img {
    flex-shrink: 0;
    width: 90px;
    height: 120px;
    object-fit: cover;
    border: 2px solid #ddd;
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
  margin-top: 5px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover{
    background-color:#333;
  };
  max-width: 100px;
`;

const ButtonLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 100%;
  gap: 10px;
`

export default Dashboard