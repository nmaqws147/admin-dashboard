import React, { useState, useEffect } from 'react';
import '../style/navbar.css';
import { useSideBar } from './sidebar';
import { Navbar, Nav, Container, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const MyNavbar = () => {
  const { toggleSidebar } = useSideBar();
  const { isOpen } = useSideBar();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    } catch {
      return false;
    }
  });

  // Dark mode toggle function
  const handleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
    try {
      localStorage.setItem('darkMode', JSON.stringify(!darkMode));
      document.body.classList.toggle('dark', !darkMode);
    } catch (error) {
      console.error('Error persisting dark mode:', error);
    }
  };

  return (
    <Navbar
  variant={'light'}
  className={`navbar p-3 ${isOpen ? 'sidebar-open' : ''}`}
  style={{transition:"0.5s ease all"}}
>

      <Container fluid>
        <GiHamburgerMenu cursor={'pointer'} className="humbrger-icon ms-3" onClick={toggleSidebar}/>
        <Nav className="ms-auto">
          <Nav.Item className="d-flex align-items-center flex-row-reverse">

            {/* Admin Image and Info */}
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id="popover-admin-details">
                  <Popover.Header className="d-flex align-items-center justify-content-center p-5 bg-primary">
                    <img
                      src="./img/avatar2.png" 
                      alt="Admin Profile"
                      className="rounded-circle me-2"
                      style={{ width: '120px', height: '120px' }}
                    />
                  </Popover.Header>
                  <Popover.Body>
                    <div className="d-flex flex-column">
                      <div className="mb-2">
                        <strong>Name:</strong> Hassan Osama
                      </div>
                      <div className="mb-2">
                        <strong>Email:</strong> hassasenbbbh@gmail.com
                      </div>
                      <div>
                        <strong>Role:</strong> Front-end Developer
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <img
                src="./img/avatar3.png"
                alt="Admin"
                className="navbar-img rounded-circle me-2"
                style={{ cursor: 'pointer', width: '40px', height: '40px' }}
              />
            </OverlayTrigger>
            
            {/* Dark Mode Toggle */}
            <Button variant="link" onClick={handleDarkMode}>
              {darkMode ?
                <FaSun className='dark-mode text-warning' style={{ height: '20px', width: '20px' }} /> :
                <FaMoon className='light-mode text-primary' style={{ height: '20px', width: '20px' }} />
              }
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
