import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Delete from '../../components/delete/Delete';

const getColumns = (callData, api) => {
   const columns = [
      {
         title: 'ID',
         dataIndex: '_id',
         key: 'id'
      },
      {
         title: 'Title',
         dataIndex: 'title',
         key: 'title'
      },
      {
         title: 'Description',
         dataIndex: 'desc',
         key: 'desc'
      },
      {
         title: 'Price',
         dataIndex: 'price',
         key: 'price'
      },
      {
         title: 'Max People',
         key: 'maxPeople',
         dataIndex: 'maxPeople'
      },
      {
         title: 'Action',
         key: 'action',
         render: (record) => {
            return <Delete {...record} callData={callData} api={api} />
         } 
      },
   ];
   return columns
} 


export { getColumns };

