import React, { useState } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [input, setInput] = useState({
    search: '',
  })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("I'm here <3")
    setInput({ ...input, search: '' })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="nav-style mr-auto ml-5">
        <Link to="/">WWYL</Link>
      </Navbar.Brand>
      <Form
        inline
        onSubmit={handleSubmit}
        className="mr-5"
        style={{ width: '400px' }}
      >
        <FormControl
          type="text"
          placeholder="WhatWouldYouLike..."
          onChange={handleChange}
          name="search"
          value={input.search}
          style={{ width: '75%' }}
          className="mr-sm-4"
        />
        <Button type="submit" className="button-submit" variant="light-blue">
          Search
        </Button>
      </Form>
    </Navbar>
  )
}

export default NavBar
