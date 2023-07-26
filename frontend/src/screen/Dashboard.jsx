import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';

import {toast} from 'react-toastify'

function Dashborad() {
  const [users, setUsers] = useState([]);
  const [search,setSearch] = useState('')
  const [userDataToEdit, setUserDataToEdit] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const deleteUser = async(id,name)=>{
    const confirmDelete = window.confirm(`Are you sure you want to delete   ${name}`)
    if(confirmDelete){
      await axios.delete(`api/admin/removeUser/${id}`);
      setUsers((undeletedUsers)=>undeletedUsers.filter((user)=>user._id!==id));
      toast.success('user deleted successfully')
    }else{
      toast.error('user not deleted')
    }
  }
// edit user data
  const handleEditUser = (user) => {
    // Set the user data to the state when Edit button is clicked
    setUserDataToEdit(user);
    handleShow(); // Show the modal
  };


   // get user data
  useEffect(() => {
    axios
      .get('/api/admin')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))

  // Update user
  const handleSumbit = ()=>{
    const id = userDataToEdit._id
    axios.put(`/api/admin/updateUser/${id}`,{userDataToEdit}).then((res)=>{
      console.log(res.data);
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user._id === id) {
            return ({
              ...user,
              name: userDataToEdit.name, // Update the name property
              email: userDataToEdit.email, // Update the email property
            });
          }
          return user;
        });
    });
    toast.success("Successfully Updated User")
    }).catch((err)=>{
      console.log(err);
    })
    
    console.log('Edit userrrr');
  }

  return (
    <>
      <h1 className='m-5'>Admin Dashboard</h1>

      

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
        />
      </InputGroup>

      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th >Edit</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((user, index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="btn btn-primary" onClick={() => handleEditUser(user)}>
                        Edit
                    </a>
                </td>
                <td>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="delBtn btn btn-primary" onClick={()=>{deleteUser(user._id,user.name)}} >
                        Delete 
                    </a>
                </td>               
              </tr>
            ))}
        </tbody>
      </Table>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDataToEdit && ( // Check if userDataToEdit is not null
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  autoFocus
                  value={userDataToEdit.name} // Prepopulate the input with the user's name
                  onChange={(e) =>
                    setUserDataToEdit({
                      ...userDataToEdit,
                      name: e.target.value, // Update the name in the user data
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={userDataToEdit.email} // Prepopulate the input with the user's email
                  onChange={(e) =>
                    setUserDataToEdit({
                      ...userDataToEdit,
                      email: e.target.value, // Update the email in the user data
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
             handleSumbit()
              
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashborad;
