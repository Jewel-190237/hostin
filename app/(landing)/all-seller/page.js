
import SellerCard from "@/app/components/landing/cards/sellerCard"
import SitePagination from "@/app/components/landing/common/sitepagination";


async function getSellerData(page = 1) {
  const res = await fetch(`${process.env.backend_url}api/v1/user/seller/list?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) return {};
  return res.json();
}
const Sellers = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const data = await getSellerData(page);

  return (
    <div className="container mx-auto font-roboto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data?.data?.docs.map((brand, index) => (
          <SellerCard key={index} data={brand} />
        ))}
      </div>

      <div className="flex justify-center mt-10 mb-14 ant_pagi">
          <SitePagination
          data={data}
          currentPage={page}
        />
      </div>
    </div>
  )
}
export default Sellers