'use client';
import TitleBar from '@/app/components/admin/common/title-bar';
import Table, { TableImage } from '@/app/components/common/table';
import { fetchVendor } from '@/app/helpers/backend';
import { useFetch } from '@/app/helpers/hooks';
import React from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(fetchVendor);
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (_, d) => <TableImage url={d?.image || "/default.png"} alt="vendor" />
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
        <TitleBar title="Vendors List" />
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
