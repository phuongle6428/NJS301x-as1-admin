import React, { useState } from 'react';
import { Tag } from 'antd';

const columns = [
   {
      title: 'ID',
      dataIndex: '_id',
      key: 'id'
   },
   {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (value) => {
         return value.fullName
      }
   },
   {
      title: 'Hotel',
      key: 'hotel',
      render: (_, record) => {
         return record.hotel.title
      }
   },
   {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      render: (room) => {
         let roomNumbers = room.map((value) => value.roomNumbers)
         return [].concat(...roomNumbers).join(', ')
      }
   },
   {
      title: 'Date',
      key: 'date',
      render: (_, record) => {
         let dateStart = new Date(record.dateStart)
         dateStart.setMinutes(dateStart.getMinutes() + dateStart.getTimezoneOffset())
         let dateEnd = new Date(record.dateEnd)
         dateEnd.setMinutes(dateEnd.getMinutes() + dateEnd.getTimezoneOffset())
         return dateStart.toLocaleDateString() + " - " + dateEnd.toLocaleDateString()
      }
   },
   {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (price) => "$" + price
   },
   {
      title: 'Payment Method',
      key: 'payment',
      dataIndex: 'payment'
   },
   {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
         let color
         if (status === 'Booked') {
            color = 'red';
         }
         if (status === 'Checkin') {
            color = 'green'
         }
         if (status === 'Checkout') {
            color = 'geekblue'
         }
         return (
            <Tag color={color} key={status}>
               {status.toUpperCase()}
            </Tag>
         );
      }
   },
];

export {columns};