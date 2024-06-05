import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import userIcon from './../../assets/brand/User.jpg';
import logo from './../../assets/brand/EYLogo.jpg';
import avatar8 from './../../assets/images/avatars/8.jpg'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const AppHeaderDropdown = () => {
  const hasReloaded = localStorage.getItem('hasReloaded');
  useEffect(() => {
    if(hasReloaded === null){
      localStorage.setItem('hasReloaded', false);
    
    }
  }, []);
  
  // useEffect(() => {
  //   if (userdetails === null) {
  //     navigate('/login');
  //   }
  // }, [userdetails]);
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem('userdetails'));
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);


  
  const handleShow = () => setShow(true);


  const handleLogout = () => {
    localStorage.removeItem('userdetails');
    navigate('/');
  };
  return (
    <>
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <img src={userIcon} alt="Bank Logo" className="logo" onClick={handleShow}  height={"100px"} width={"100px"}/>
      </CDropdownToggle>
      {/* <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu> */}
    </CDropdown>


<Modal show={show} onHide={handleClose} className="custom-modal">
<Modal.Header closeButton className="custom-modal-header" style={{backgroundColor:"black"}} >
  <img src={logo} alt="Bank Logo" className="logo"  height={"100px"} width={"100px"}/>
  <Modal.Title className="custom-modal-title" style={{color:"yellow"}}>User Details</Modal.Title>
</Modal.Header>
{userdetails !== null && userdetails !== undefined && (
  <Modal.Body>
    <p><strong>Name:</strong> {userdetails.username}</p>
    <p><strong>Email:</strong> {userdetails.email}</p>
    <p><strong>EmployeeId:</strong> {userdetails.employeeid}</p>
    <p><strong>Position:</strong> {userdetails.position}</p>
  </Modal.Body>
)}
<Modal.Footer>
  <Button variant="secondary" style={{backgroundColor:"black"}} onClick={handleLogout}>
    Logout
  </Button>
</Modal.Footer>
</Modal>
</>
  )
}

export default AppHeaderDropdown
