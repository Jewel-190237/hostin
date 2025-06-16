import BrandCard from "@/app/components/landing/cards/brandcard";
import SitePagination from "@/app/components/landing/common/sitepagination";

async function getBrandData(page = 1) {
  const res = await fetch(`${process.env.backend_url}api/v1/product-brand/site?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) return {};
  return res.json();
}

const Brands = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const data = await getBrandData(page);

  return (
    <div className="container mx-auto md:p-8 p-4">
      <h1 className="text-[28px] font-roboto font-bold text-textMain mb-6">
        Your Favorite <span className="text-primary">Brands</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {data?.data?.docs?.map((brand) => (
          <BrandCard key={brand._id} data={brand} />
        ))}
      </div>
      <div className="flex justify-center mt-8 ant_pagi">
        <SitePagination
          data={data}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default Brands;
