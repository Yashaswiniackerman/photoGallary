import React from 'react'
import { Navbar, Container, NavbarBrand, NavItem, NavLink, Nav, Button } from 'reactstrap'
import { useNavigate } from "react-router-dom"





export default function Header() {
  const navigate = useNavigate()
  function handleNavigate(route) {
    navigate(route)
  }


  const token = localStorage.getItem('token')

  console.log(token)
  async function handleLogOut() {
    var response = await fetch('http://127.0.0.1:8000/profiles/logout/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
    })
    if (response.status === 500) {
      alert("server error")
    }
    if (response.status === 200 || response.status === 201) {
      var data = await response.json()
      localStorage.clear()
      alert("logged out successfully")
      handleNavigate("/signin")

    }
    else {
      var data = await response.json()
      alert(JSON.stringify(data))
    }




  }



  return (
    <Navbar
      color="light"
      light
    >
      <NavbarBrand>
        <h4>PicScore</h4>

      </NavbarBrand>
      {/* <NavbarBrand href="/"> */}
      <Button onClick={() => handleNavigate("/community")}>Community</Button>
      <Button onClick={() => handleNavigate("/mygallory")}>My Gallary</Button>
      
      <Button onClick={() => handleLogOut("/logout")}>Log out</Button>
      {/* </NavbarBrand> */}
      {/* <NavbarBrand href="/">
    
    </NavbarBrand> */}
    </Navbar>


  )
}
