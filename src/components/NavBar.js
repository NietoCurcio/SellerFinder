import React, { useState, useContext } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'

const NavBar = () => {
  const [input, setInput] = useState({
    search: '',
  })
  const { searchProduct } = useContext(AppContext)
  const history = useHistory()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchProduct(input.search)
    history.push('/search')
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
