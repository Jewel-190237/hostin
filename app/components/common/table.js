'use client'
import React, { useState } from "react";
import { FaEye, FaPencilAlt, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Empty, message, Modal } from "antd";

import Image from "next/image";
import { useActionConfirm } from "@/app/helpers/hooks";
import SearchInput from "./search";
import { Loader } from "./loader";
import Pagination from "./pagination";
import { useI18n } from "@/app/context/i18n";

const Table = ({
  columns,
  data,
  indexed,
  loading = false,
  noActions,
  actions,
  action,
  onView,
  onEdit,
  onDelete,
  onReload,
  pagination = false,
  shadow = true,
  title,
  noHeader = false,
  afterSearch,
  onSearchChange,
}) => {
  const isDemo = "live";

  // const [searchTerm, setSearchTerm] = useState("");
  const handleEditClick = (data) => {
    onEdit(data);
  };
  const i18n= useI18n();
  const handleDeleteClick = async (data) => {
    if (isDemo === "demo") {
      message.warning("You cannot delete in demo version");
    } else if (onDelete) {
      await useActionConfirm(
        onDelete,
        { _id: data._id },
        onReload,
        "Are you sure you want to delete this data?",
        "Yes, Delete"
      );
    }
  };

  const cols = noActions
    ? columns
    : [
        ...columns,
        {
          text: "Action",
          dataField: "no_actions",
          className: "w-44 text-right",
          formatter: (noActions, data) => {
            return (
              <div className="flex justify-end gap-2.5">
                {actions && actions(data)}
                {onView && (
                  <button
                    className="p-2 text-green-700 transition border border-green-700 rounded-full hover:bg-green-700 hover:text-white focus:shadow-none"
                    title="View"
                    onClick={() => onView(data)}
                  >
                    <FaEye />
                  </button>
                )}
                {onEdit && data?.disableEdit !== 1 && (
                  <button
                    className="p-2 text-indigo-700 transition border border-indigo-700 rounded-full hover:bg-indigo-700 hover:text-white focus:shadow-none"
                    title="Edit"
                    onClick={() => handleEditClick(data)}
                  >
                    <FaPencilAlt size={12} />
                  </button>
                )}
                {onDelete && data?.disableDelete !== 1 && (
                  <button
                    className="p-2 text-red-600 transition border border-red-700 rounded-full hover:bg-red-700 hover:text-white focus:shadow-none"
                    title="Delete"
                    onClick={() => handleDeleteClick(data)}
                  >
                    <FaTrashAlt size={12} />
                  </button>
                )}
              </div>
            );
          },
        },
      ];

  return (
    <div
      className={`table-arabic w-full bg-white ${
        shadow ? "shadow-lg" : ""
      } rounded-md mb-6`}
    >
      {!noHeader && (
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 pt-4 pb-3 border-b border-gray-200">
          {title ? (
            <h4 className="text-xl font-semibold text-[#003049]">
              {(title)}
            </h4>
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              <SearchInput
                className="w-56"
                onChange={(e) => {
                  const search = e.target.value;
                  onReload({ search,page: 1 });
                  onSearchChange && onSearchChange(search, );
                }}
              />
              {afterSearch}
            </div>
          )}
          {action}
        </header>
      )}
      <div className="relative px-6 py-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-xs font-semibold text-left text-gray-500 uppercase bg-gray-50">
              <tr>
                {indexed && (
                  <th className="p-3 whitespace-nowrap">
                    <div className="font-semibold">#</div>
                  </th>
                )}
                {cols?.map((column, index) => (
                  <th
                    className={`p-3 whitespace-nowrap ${
                      column?.className || ""
                    }`}
                    key={index}
                  >
                    <div className="font-semibold">{(column.text)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={cols.length} className="py-16">
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                (pagination ? data?.docs : data)?.map((row, index) => (
                  <tr
                    key={index}
                    className="transition hover:bg-gray-100 hover:shadow-sm admin-switch"
                  >
                    {indexed && (
                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        {(pagination ? (data?.page - 1) * data.limit : 0) +
                          index +
                          1}
                      </td>
                    )}
                    {cols?.map((column, colIndex) => (
                      <td
                        className={`p-3 whitespace-nowrap ${
                          column?.className || ""
                        }`}
                        key={colIndex}
                      >
                        {column.formatter
                          ? column.formatter(row[column.dataField], row)
                          : row[column.dataField] || "-"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
              {!loading && data?.docs?.length === 0 && (
                <tr>
                  <td colSpan={cols.length} className="py-2">
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="pt-4 mt-4 border-t">
            <Pagination
              page={data?.page}
              total={data?.totalDocs}
              onSizeChange={(limit) => onReload({ limit,  })}
              limit={data?.limit}
              totalPages={data?.totalPages}
              onPageChange={(page) => onReload({ page,  })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

export const DetailTable = ({ data, columns, title, actions }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {!!title && (
        <div className="mb-4 text-lg text-[#3d3a4e] font-medium">{(title)}</div>
      )}
      <div className="body">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <tbody>
              {columns?.map((column, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{(column?.text)}</td>
                  <td className="px-4 py-2 text-sm">
                    {!!data
                      ? !!column?.formatter
                        ? column?.formatter(data[column.dataIndex], data)
                        : data[column.dataIndex]
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {actions}
      </div>
    </div>
  );
};

export const TableImage = ({ url }) => {
  const [image, setImage] = useState();
  return (
    <div className="h-8 w-14">
      <Image
        role="button"
        src={url}
        alt="Image"
        className="object-cover w-full h-full"
        onClick={() => setImage(url)}
        width={100}
        height={100}
        sizes="100%"
        // style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      <Modal
        width={800}
        open={image}
        onCancel={() => setImage(undefined)}
        footer={null}
        style={{ padding: 0, zIndex: 60 }}
        closeIcon={
          <FaTimes
            size={18}
            className="  rounded hover:!bg-none text-primary"
          />
        }
      >
        <div className="flex items-center justify-center">
          <Image
            className=""
            loading="lazy"
            width={400}
            height={400}
            src={image}
            alt=""
          />
        </div>
      </Modal>
    </div>
  );
};