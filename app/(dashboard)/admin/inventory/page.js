'use client';
import Button from '@/app/components/admin/common/button';
import TitleBar from '@/app/components/admin/common/title-bar';
import Table, { TableImage } from '@/app/components/common/table';
import { useI18n } from '@/app/context/i18n';
import { fetchProduct,deleteProduct,updateProduct } from '@/app/helpers/backend';
import { useActionConfirm, useFetch } from '@/app/helpers/hooks';
import {  columnFormatter, columnFormatter1 } from '@/app/helpers/utils';
import {  Switch } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
    const [data, getData, { loading }] = useFetch(fetchProduct);

    const { langCode } = useI18n();
    const i18n = useI18n();
    const router = useRouter();
    const columns = [
        {
            text: "Image",
            dataField: "thumbnail",
            formatter: (d, _) => (
                <TableImage url={_?.thumbnail || "/default.png"} />
            ),
            
        },
        {
            text: "Product Name",
            dataField: "name",
            formatter: (d, _) => <span className="capitalize">{(_?.name[langCode])}</span>, 
        },
        {
            text: "owner",
            dataField: "owner",
            formatter: (d, _) => <span>{_?.owner?.first_name},{_?.owner?.last_name} </span>,
        },
        {
            text: "category",
            dataField: "category",
            formatter: (d, _) => <span>{(_?.category?.name[langCode])}</span>,
        },
        {
            text: "final price",
            dataField: "final_price",
            formatter: (d, _) => <span>{_?.final_price}</span>,
        },
        {
            text: "Status",
            dataField: "status",
            formatter: (d, _) => (
              <Switch 
                checkedChildren={"Active"}
                unCheckedChildren={"Inactive"}
                checked={_?.status}
                onChange={async (e) => {
                  const payload = {
                    body: {
                      status: e,
                      _id: _?._id,
                    },
                  };
                  await useActionConfirm(
                    updateProduct,
                    { ...payload, body: { status: e, _id: _?._id } },
                    () => {
                      getData();
                    }
                  );
                }}
                />
            ),
        },
    ];
    return (
        <div>
            <TitleBar title={"Product's"} />
            <Table data={data} 
            columns={columns} 
            action={
                <Button
                onClick={() => {
                    router.push('/admin/inventory/add')
                }}
            >
                {i18n.t("Add New")}
            </Button>
            }
            onEdit={(values) => {
                router.push(`/admin/inventory/edit/${values?._id}`)
            }}
            onReload={getData} 
            loading={loading} 
            onDelete={deleteProduct}
            pagination 
            indexed 
            />
        </div>
    );
};

export default page;