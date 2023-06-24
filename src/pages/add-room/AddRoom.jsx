import { Box, TextField, MenuItem, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './addroom.css'
import { API_URL } from '../../ultis/env'

export default function AddRoom() {
  const [hotels, setHotels] = useState([])
  const [roomForm, setRoomForm] = useState({
    title: '', desc: '', price: '',
    maxPeople: '', roomNumbers: '', hotelId: ''
  })

  useEffect(() => {
    async function getHotels() {
      const response = await fetch(`${API_URL}/admin/hotel`)
      let data = await response.json()
      setHotels(data)
    }
    getHotels()
    return () => {
    }
  }, [])
  let hotelList
  if (hotels.length > 0) {
    hotelList = hotels.map((hotel, key) => {
      return (
        <MenuItem value={hotel._id} key={key}> {hotel.title} </MenuItem >
      )
    })
  }

  const handleChange = (event) => {
    const { options } = event.target;
    const { target: { value, name } } = event
    if (options) {
      const hotelSelected = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          hotelSelected.push(options[i].value);
        }
      }
      setRoomForm({ ...roomForm, [name]: hotelSelected })
    } else {
      setRoomForm({ ...roomForm, [name]: value })
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputs = [...e.target.querySelectorAll('input')]
    const select = [...e.target.querySelectorAll('select')]
    console.log(inputs)
    let check1 = inputs.some((input) => {
      if (!input.value) {
        return true
      }
    })
    let check2 = select.some((select) => {
      if (select.selectedOptions.length <= 0) {
        return true
      }
    })
    if (check1 || check2) {
      alert("Missing input field")
      return
    }
    let response = await fetch(`${API_URL}/admin/add/room`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomForm)
    })
    let data = await response.json()
    if (data) {
      setRoomForm({
        title: '', desc: '', price: '',
        maxPeople: '', roomNumbers: '', hotelId: ''
      })
    }
  }
  return (
    <div className='add-room'>
      <h5 className='title'>Add New Room</h5>
      <div className='add-room__form'>
        <Box
          component="form"
          className='material-form'
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="title" label="Title"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={roomForm?.title}
          />
          <TextField
            name="desc" label="Description"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={roomForm?.desc}
          />
          <TextField
            name="price" label="Price"
            variant="standard" type="number"
            size="small" fullWidth onChange={handleChange}
            value={roomForm?.price}
          />
          <TextField
            name="maxPeople" label="Max People"
            variant="standard" type="number"
            size="small" fullWidth onChange={handleChange}
            value={roomForm?.maxPeople}
          />
          <TextField
            name="roomNumbers" label="Rooms"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={roomForm?.roomNumbers}
          />
          {hotelList &&
            <TextField
              name="hotelId" label="Choose a hotel"
              variant="standard" size="small"
              value={roomForm?.hotelId || ''} fullWidth select
              onChange={handleChange}
            >
              {hotelList}
            </TextField>
          }
          <Button type='submit' variant="contained" color="success"> Send </Button>
        </Box>
      </div>
    </div>
  )
}
