import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './room.css'
import { getColumns } from './roomtable'

export default function Room() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    getRooms()
  }, [])
  async function getRooms() {
    let response = await fetch('http://localhost:5000/admin/rooms')
    let data = await response.json()
    if (data) {
      let tableData = data.map((value, index) => {
        return { ...value, key: index }
      })
      setRooms(tableData)
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
  const columns = getColumns(getRooms, 'room')
  return (
    <div className='room'>
      <Table
        columns={columns}
        dataSource={rooms}
        pagination={{ pageSize: 8 }}
        rowSelection={{ ...rowSelection }}
        title={() => {
          return (
            <>
              <span>Rooms List</span>
              <Button className='add-btn' href='/add/room'>
                Add New
              </Button>
            </>
          )
        }}
      />
    </div>
  )
}
