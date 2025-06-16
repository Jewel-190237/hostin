'use client'
import TitleBar from '@/app/components/admin/common/title-bar';
import Table from '@/app/components/common/table';
import { deleteSubscribe, fetchSubscribe } from '@/app/helpers/backend';
import { useFetch } from '@/app/helpers/hooks';
import dayjs from 'dayjs';
import React from 'react'

const Page = () => {
  
  const [data, getData, {loading}] = useFetch(fetchSubscribe);
    const columns = [
        {
          text: "Created At",
          dataField: "createdAt",
            formatter: (value) => {
                return new dayjs(value).format("DD-MMM-YYYY");
            },
        },
    {
      text: "Email",
      dataField: "email",
    },
]
    return (
    <div>
        <TitleBar title="Subscribers" />
        <Table data={data} getData={getData} loading={loading} indexed onDelete={deleteSubscribe} pagination columns={columns}/>
    </div>
  )
}

export default Page