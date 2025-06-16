'use client';
import React from 'react'
import TitleBar from '@/app/components/admin/common/title-bar';
import Table, { TableImage } from '@/app/components/common/table';
import { fetchUsers } from '@/app/helpers/backend'
import { useFetch } from '@/app/helpers/hooks'

const Page = () => {
    const [data, getData,{loading}] = useFetch(fetchUsers);
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (_, d) => <TableImage url={d?.image || "/default.png"} alt="user" />
        },
        {
            text: "Name",
            dataField: "name",
            formatter: (_, d) => <span className='capitalize'>{d?.first_name},{d?.last_name}</span>
        },
        {
            text: "Email",
            dataField: "email",
            formatter: (_, d) => <span className='capitalize'>{d?.email}</span>
        },
        {
            text: "Phone",
            dataField: "phone",
            formatter: (_, d) => <span className='capitalize'>{d?.phone}</span>
        },
    ]
  return (
    <div>
        <TitleBar title="Users List" />
        <Table 
        columns={columns}
        data={data}
        onReload={getData}
        noActions={true}
        loading={loading}
        indexed
        pagination
        />
    </div>
  )
}

export default Page