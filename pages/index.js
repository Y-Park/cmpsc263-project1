import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import Layout from "@/components/Layout"
import Image from "next/image"

export default function Home() {
  return (
    <>
        <Hero text={'BookNest'} />
        <ImageContainer>
          <Image
            src = "/img1.jpg"
            width = {600}
            height = {600}
          />
          <Image
            src = "/img2.png"
            width = {600}
            height = {600}
          />
          <Image
            src = "/img3.jpg"
            width = {600}
            height = {600}
          />
        </ImageContainer>
      <Footer/>
    </>
  )
}

const ImageContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px
`;

const Wrapper = styled.div`

`;