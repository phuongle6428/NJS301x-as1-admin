import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import './transaction.css'
import { columns } from './transactiontable';
import { API_URL } from '../../ultis/env';

export default function Transaction() {
  const [transaction, setTransaction] = useState([])
  useEffect(() => {
    async function getTransaction() {
      const user = JSON.parse(localStorage.getItem('user'))
      let response = await fetch(`${API_URL}/admin/transaction`)
      let data = await response.json()
      if (data) {
        let tableData = data.map((value, index) => {
          return { ...value, key: index }
        })
        setTransaction(tableData)
      }
    }
    getTransaction()
  }, [])
  return (
    <div className='transaction'>
      <div className='tableboard'>
        <Table
          columns={columns}
          dataSource={transaction}
          pagination={{pageSize: 8}}
          title={() => "Transactions List"}
        />
      </div>
    </div>
  )
}
