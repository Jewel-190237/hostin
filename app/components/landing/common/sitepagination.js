"use client";

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";



const SitePagination = ({
  data,
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    totalDocs = 0,
    limit = 10,
  } = data?.data || {};

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      current={currentPage}
      total={totalDocs}
      pageSize={limit}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
};

export default SitePagination;
