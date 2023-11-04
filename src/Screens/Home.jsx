import React, { useContext, useEffect } from 'react'
import { StatesProvider } from '../States/states'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PostCard from '../Compontnts/Postcard';


export default function Home() {
  const navigate = useNavigate();
  const post={
    imageUrl:'https://source.unsplash.com/random/900×700/',
    caption:"vedushoindjvnoeirgbdfpsifoet;ngfnd"
  }

  function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const authToken = getCookie('authToken');
  const userEmail = decodeURIComponent(getCookie("userEmail"));


  if (!authToken && userEmail) {
    navigate('/login');
  }





  const { setTitle, socket } = useContext(StatesProvider);
  if (socket) {
    socket.emit('newUser', { name: userEmail });
  }
  setTitle("Home")
  return (
    <Container fluid>
    <Row>
      <Col md={3} className="sidebar">
        <Card>
          <Card.Body>
            <img
              src="profile-picture.jpg"
              alt="Profile"
              className="profile-picture"
            />
            <h5>Username</h5>
            <p>Followers: 1000</p>
            <p>Following: 500</p>
          </Card.Body>
        </Card>


        <Card className="mt-3">
          <Card.Body>
            <h5>Suggestions for You</h5>

          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className="feed">

        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />

      </Col>

      <Col md={3} className="sidebar">

        <Card>

          <Card.Body>
            <h5>Trending Now</h5>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}
