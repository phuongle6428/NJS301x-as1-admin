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
         title: 'Name',
         dataIndex: 'name',
         key: 'name'
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type'
      },
      {
         title: 'Title',
         dataIndex: 'title',
         key: 'title'
      },
      {
         title: 'City',
         key: 'city',
         dataIndex: 'city'
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