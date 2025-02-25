import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link'


const Hero = ({text}) => {
  const [user, setUser] = useState(null);
  return (
    <Section>
          <Wrapper>
            <Header href="/">{text}</Header>
            <ButtonContainer>
              <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
              <ButtonLink href="/auth/login">Log in</ButtonLink>
            </ButtonContainer>
          </Wrapper>
          <StyleDiv>Your Go-To Platform for Books</StyleDiv>
    </Section>
  );
};

const Section = styled.section`
background-color: orange;
width: 100%;
height:10vh;
`;

const Overlay = styled.div`
`;

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Header = styled(Link)`
  font-family: 'Arial', sans-serif;
  font-size: 40px;
  text-decoration: none;
  color: white;
  background-color: orange;
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
`;

const ButtonContainer = styled.nav`
  display: flex;
  gap: 15px;
  margin-left: auto;
  margin-right: 20px;
`;

const Highlight = styled.span`
`;

const SubHeader = styled.h2`
font-family: 'Times New Roman', serif;
font-size: 25px;
text-align: left;
`;




export default Hero;
