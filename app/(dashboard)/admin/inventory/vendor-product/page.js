'use client';
import TitleBar from '@/app/components/admin/common/title-bar';
import Table, { TableImage } from '@/app/components/common/table';
import { useI18n } from '@/app/context/i18n';
import { allVendorProducts, updateProduct } from '@/app/helpers/backend';
import { useActionConfirm, useFetch } from '@/app/helpers/hooks';
import { Switch } from 'antd';
import React from 'react'

const Page = () => {
    const [data, getData, { loading }] = useFetch(allVendorProducts);
    const { langCode } = useI18n();
    const columns = [
        {
            text: "Image",
            dataField: "thumbnail",
            formatter: (_, d) => <TableImage url={d?.thumbnail || "/default.png"} alt="vendor" />
        },
        {
            text: "Product Name",
            dataField: "name",
            formatter: (_, d) => <span className='capitalize'>{d?.name[langCode]}</span>
        },
        {
            text: "owner",
            dataField: "owner",
            formatter: (_, d) => <span>{d?.owner?.first_name},{d?.owner?.last_name} </span>,
        },
        {
            text: "category",
            dataField: "category",
            formatter: (_, d) => <span>{(d?.category?.name[langCode])}</span>,
        },
        {
            text: "final price",
            dataField: "final_price",
            formatter: (_, d) => <span>{d?.final_price}</span>,
        },
        {
            text: "approval status",
            dataField: "is_approved",
             formatter: (d, _) => (
                             <Switch
                                 checkedChildren={"Approved"}
                                 unCheckedChildren={"Pending"}
                                 checked={_?.is_approved}
                                 onChange={async (e) => {
                                     const payload = {
                                         body: {
                                             is_approved: e,
                                             _id: _?._id,
                                         },
                                     };
                                     await useActionConfirm(
                                         updateProduct,
                                         { ...payload, body: { is_approved: e, _id: _?._id } },
                                         () => {
                                             getData();
                                         }
                                     );
                                 }}
                             />
                         ),
        },
    ]
  
    return (
    <div>
        <TitleBar title="Vendor Products List" />
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