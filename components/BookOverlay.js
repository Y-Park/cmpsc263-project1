import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OpenAI from "openai";
import openai from "@/backend/openai";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { app, database, auth } from '@/backend/Firebase';
import { useStateContext } from "@/context/StateContext";


const BookOverlay = ({ book, onClose }) => {
  const [summary, setSummary] = useState("Generating summary...");
  const {user} = useStateContext();

  async function markBook() {
    if (!user) return;
    try {
    //   title: book.volumeInfo.title,
    //   authors: book.volumeInfo.authors,
    //   image: book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png",
    //   link: book.volumeInfo.infoLink,
        const userBook = doc(database, "users", user.uid, "markedBooks", book.id);
        if ((await getDoc(userBook)).exists()){
            alert("Book is already marked.");
            return;
        }

        await setDoc(userBook, {
            uid: user.uid,
            id: book.id,
            title: book.title,
            authors: book.authors,
            image: book.image,
            link: book.link
        });
        alert("Successfully marked book!")
    } catch(err){
        alert(`Error marking book: ${err}`)
    }
  }

  async function fetchSummary() {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that summarizes books given the book title and author(s). You should not \"spoil\" the book content too much. The summary must be less than 120 words.",
          },
          {
            role: "user",
            content: `Summarize the book "${book.title}" by ${book.authors?.join(", ") || "Unknown Author"}.`,
          },
        ],
        max_tokens: 200,
      });
      setSummary(response.choices[0].message?.content || "No summary available.")
    } catch (err) {
      setSummary(`Error generating summary: ${err}`);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, [book])

  return (
    <Overlay onClick={onClose}>
     <Box onClick={(e) => e.stopPropagation()}>
        <img
            src={book.image || "/placeholder.png"}
        />
        <h2>{book.title}</h2>
        <p>By {book.authors?.join(", ") || "N/A"}</p>
        <Summary>{summary}</Summary>
        <ButtonContainer>
            <ButtonLink href={book.link} target="_blank">
                More Info
            </ButtonLink> 
            <ButtonLink onClick={markBook}>
                Mark Book
            </ButtonLink>
        </ButtonContainer>
     </Box>
    </Overlay>
  );
};

export default BookOverlay;

const Overlay = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    align-items: center;
    justify-content:center;
`
const Box = styled.div` 
    background: white;
    border-radius: 30px;
    width: 800px;
    height: 600px;
    justify-content: center;

    img {
        display: block;
        justify-content: center;
        flex-shrink: 0;
        width: 200px;
        height: 300px;
        object-fit: cover;
        border: 2px solid #ddd;
        margin: auto;
        margin-top: 10px;
    }

    h2 {
        font-family: 'Arial', sans-serif;
        display:flex;
        justify-content: center;
        padding-top: 10px;
    }

    p {
        padding-top: 5px;
        display: flex;
        justify-content:center;
    }
    
`

const Bold = styled.div`
    font-weight: bold;
`

const Summary = styled.div`
    display: flex;
    font-family: 'Arial', sans-serif;
    justify-content: center;
    padding-left: 20px;
    padding-right: 15px;
    padding-top: 5px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
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