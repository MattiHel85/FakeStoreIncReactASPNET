import React from 'react';
import Header from './Header';


const Home: React.FC = ( ) => {

  return (
    <>
        <Header title={'for all your fake purchases!'} body={"you've come to the right place"}/>
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src={require('./images/logo.png')} 
            alt='Fakestore Inc logo'
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
    </>
  )
}

export default Home