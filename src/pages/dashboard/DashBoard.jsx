import React, { useEffect, useState } from 'react'
import { MdOutlineAccountBalanceWallet, MdOutlineMonetizationOn, MdOutlineShoppingCart, MdPersonOutline } from 'react-icons/md'
import { Table } from 'antd';
import './dashboard.css'
import { columns } from './dashboardtable';
import { API_URL } from '../../ultis/env';

export default function DashBoard() {
  const [transaction, setTransaction] = useState([])
  useEffect(() => {
    async function getTransaction() {
      const user = JSON.parse(localStorage.getItem('user'))
      let response = await fetch(`${API_URL}/admin/transaction?limit=8`)
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div className='dashboard'>
      <div className='infoboard'>
        <div className='infoboard-item'>
          <h5 className='title'>USER</h5>
          <p>100</p>
          <MdPersonOutline fill='red' style={{ "background": "#ff00002b" }} viewBox="0 0 25 25" />
        </div>
        <div className='infoboard-item'>
          <h5 className='title'>ORDER</h5>
          <p>100</p>
          <MdOutlineShoppingCart fill='darkgoldenrod' style={{ "background": "#b8860b30" }} viewBox="0 0 25 25" />
        </div>
        <div className='infoboard-item'>
          <h5 className='title'>EARNINGS</h5>
          <p>$100</p>
          <MdOutlineMonetizationOn fill='green' style={{ "background": "#00800036" }} viewBox="0 0 25 25" />
        </div>
        <div className='infoboard-item'>
          <h5 className='title'>BALANCE</h5>
          <p>$100</p>
          <MdOutlineAccountBalanceWallet fill='purple' style={{ "background": "#80008040" }} viewBox="0 0 25 25" />
        </div>
      </div>
      <div className='tableboard'>
        <Table
          columns={columns}
          dataSource={transaction}
          pagination={{pageSize: 8}}
          rowSelection={{ ...rowSelection }}
          title={() => "Latest Transactions"}
        />
      </div>
    </div>
  )
}
