import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'

const Hero = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Welcome to Home Page</h1>
          <h2 className='text-center mb-4'>
             {userInfo? `Hello ${userInfo.name}`: ''}
          </h2>

        </Card>
      </Container>
    </div>
  );
};

export default Hero;