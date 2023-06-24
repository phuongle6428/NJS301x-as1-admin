import React, { useEffect, useState } from 'react'
import './addhotel.css'
import { TextField, Box, MenuItem, Button } from '@mui/material';

export default function AddHotel() {
  const [rooms, setRooms] = useState([])
  const [hotelForm, setHotelForm] = useState({
    rooms: [], featured: false, name: '', type: '', city: '',
    address: '', distance: '', title: '', desc: '', cheapestPrice: '',
    photos: ''
  })

  useEffect(() => {
    async function getRooms() {
      const response = await fetch('http://localhost:5000/admin/rooms')
      let data = await response.json()
      setRooms(data)
    }
    getRooms()
    return () => {
    }
  }, [])
  let roomList
  if (rooms.length > 0) {
    roomList = rooms.map((room, key) => {
      return (
        <option value={room._id} key={key}> {room.title} </option >
      )
    })
  }

  const handleChange = (event) => {
    const { options } = event.target;
    const { target: { value, name } } = event
    if (options) {
      const roomsSelected = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          roomsSelected.push(options[i].value);
        }
      }
      setHotelForm({ ...hotelForm, [name]: roomsSelected })
    } else {
      setHotelForm({ ...hotelForm, [name]: value })
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
    let response = await fetch('http://localhost:5000/admin/add/hotel', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hotelForm)
    })
    let data = await response.json()
    if (data) {
      setHotelForm({
        rooms: [], featured: false, name: '', type: '', city: '',
        address: '', distance: '', title: '', desc: '', cheapesPrice: '',
        photos: ''
      })
    }
  }
  return (
    <div className='add-hotel'>
      <h5 className='title'>Add New Product</h5>
      <div className='add-hotel__form'>
        <Box
          component="form"
          className='material-form'
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="name" label="Name"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.name}
          />
          <TextField
            name="type" label="Type"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.type}
          />
          <TextField
            name="city" label="City"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.city}
          />
          <TextField
            name="address" label="Address"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.address}
          />
          <TextField
            name="distance" label="Distance form City Center"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.distance}
          />
          <TextField
            name="title" label="Title"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.title}
          />
          <TextField
            name="desc" label="Description"
            variant="standard" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.desc}
          />
          <TextField
            name="cheapestPrice" label="Price"
            variant="standard" type="number"
            size="small" fullWidth onChange={handleChange}
            value={hotelForm?.cheapestPrice}
          />
          <TextField
            name="photos" label="Images"
            variant="outlined" size="small"
            fullWidth onChange={handleChange}
            value={hotelForm?.photos}
          />
          <TextField
            name="featured" label="Featured"
            variant="standard" size="small"
            value={hotelForm?.featured || false} fullWidth select
            onChange={handleChange}
          >
            <MenuItem value={false}> No </MenuItem>
            <MenuItem value={true}> Yes </MenuItem>
          </TextField>
          {roomList &&
            <TextField
              name="rooms" label="Rooms"
              size="small" fullWidth select
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                multiple: true,
                value: [...hotelForm.rooms],
                native: true,
              }}
              onChange={handleChange}
            >
              {roomList}
            </TextField>
          }
          <Button type='submit' variant="contained" color="success">Send </Button>
        </Box>
      </div>
    </div>
  )
}
