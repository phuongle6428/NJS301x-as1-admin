import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { getColumns } from './hoteltable';
import './hotel.css'

export default function Hotel() {
  const [hotel, setHotel] = useState([])
  useEffect(() => {
    getHotel()
  }, [])
  async function getHotel() {
    let response = await fetch('http://localhost:5000/admin/hotel')
    let data = await response.json()
    if (data) {
      let tableData = data.map((value, index) => {
        return { ...value, key: index }
      })
      setHotel(tableData)
    }
  }
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
  const columns = getColumns(getHotel, 'hotel')
  return (
    <div className='hotel'>
      <Table
        columns={columns}
        dataSource={hotel}
        pagination={{ pageSize: 8 }}
        rowSelection={{ ...rowSelection }}
        title={() => {
          return (
            <>
              <span>Hotel List</span>
              <Button className='add-btn' href='/add/hotel'>
                Add New
              </Button>
            </>
          )
        }}
      />
    </div>
  )
}
