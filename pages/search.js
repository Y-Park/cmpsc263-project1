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
import book_object from '@/backend/books'
import BookOverlay from '@/components/BookOverlay'

const Dashboard = () => {

  const { user, setUser } = useStateContext();
  const router = useRouter();

  const [searchType, setSearchType] = useState("intitle");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null)

  const openBook = (book) => {
    setSelectedBook({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      image: book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png",
      link: book.volumeInfo.infoLink,
    });
  }

  const closeBook = () => setSelectedBook(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      if (currentUser){
        setUser(currentUser);
      } else {
        router.push('/');
      }
    })
    return () => unsubscribe();
  }, [router, setUser]);

  async function handleSearch(){
    if(!query.trim()) {
      alert("Please input search.");
      return;
    }
    try{
      const result = await fetch(`${book_object.url}?q=${searchType}:${query}&key=AIzaSyDbf3NXIMmu3cN0anQYbBUJpgQ_k-lWV0k&maxResults=40`);
      // const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchType}:${query}&key=${book_object.key}&maxResults=40`);
      const data = await result.json();
      setBooks(data.items || []);
    } catch(err){
      alert(`Error fetching book data: ${err}`)
    }  
  }


  return (
    <>
      <Hero text={'BookNest'} />
        <Container>
          <H2>Search Books</H2>
          <SearchBar>
            <select value = {searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value = "intitle">Book Title</option>
              <option value = "inauthor">Author</option>
              <option value = "isbn">ISBN</option>
            </select>
            <input 
            type = "text" 
            placeholder = "Enter search term here." 
            value = {query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
            <ButtonLinkContainer>
            <ButtonLink onClick = {handleSearch}>Search</ButtonLink>
            </ButtonLinkContainer>
          </SearchBar>

          <Results>
            {books.length > 0 ? (
              books.map((book, index) => (
                <BookCard key={index}>
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
                    onClick={() => openBook(book)}
                  />
                  <div>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>Author: {book.volumeInfo.authors?.join(", ") || "N/A"}</p>
                    <p>Published: {book.volumeInfo.publishedDate || "N/A"}</p>
                    {/* <a href={book.volumeInfo.infoLink} target="_blank">
                      More Info
                    </a> */}
                  </div>
                </BookCard>
              ))
            ) : (
              <NoResults>No results found.</NoResults>
            )}
          </Results>

        </Container>
      {selectedBook && <BookOverlay book={selectedBook} onClose={closeBook} />}
    </>
  )
}



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

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  margin-top: 10px;
  gap: 20px;

  select {
    width: 100px;
    height: 30px;
  }

  input {
    width: 300px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

`
const H2 = styled.h2`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: black;
`
const Results = styled.div`
  padding-top: 30px;
`

const ButtonLink = styled.a`
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  color: white;
  background-color: black;
  padding: 7px 14px;
  margin-top: 10px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover{
  background-color:#333;
  };
`;

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
    cursor: pointer;
  }

  div {
    display: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 400px;
  }

  h3 {
    font-family: 'Arial', sans-serif;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  p {
    font-family: 'Arial', sans-serif;
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

const ButtonLinkContainer = styled.div`
  justify-content:10px;
  padding-top: 7px
`
const NoResults = styled.p`
  font-family: 'Arial', sans-serif;
  font-size: 30px;
  padding-top: 20px;
`



export default Dashboard