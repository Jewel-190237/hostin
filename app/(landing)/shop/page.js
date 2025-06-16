'use client';
import ProductCard from "@/app/components/landing/cards/productCard"
import { Pagination, Drawer } from "antd"
import { BsFillFilterCircleFill, BsFillGrid3X2GapFill } from "react-icons/bs";
import { useState } from "react";

import { BiX } from "react-icons/bi";
import { RiLayout2Fill } from "react-icons/ri";
import { useFetch } from "@/app/helpers/hooks";
import { fetchpublicProducts } from "@/app/helpers/backend";


const Shop = () => {
  const [data, getData] = useFetch(fetchpublicProducts);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  const categories = ["Home Appliances", "Clothing", "Women Fashion", "Electronic", "Babies & Toys", "Health & Beauty"];
  const [selectedSize, setSelectedSize] = useState("L")
  const colors = [
    { name: "purple", class: "bg-purple-600" },
    { name: "black", class: "bg-black" },
    { name: "navy", class: "bg-blue-900" },
    { name: "pink", class: "bg-pink-300" },
    { name: "violet", class: "bg-violet-600" },
    { name: "gray", class: "bg-gray-300" },
    { name: "white", class: "bg-white border border-gray-300" },
  ];
  const materials = ["Cotton", "Cotton", "Cotton"];
  const sizes = ["L", "X", "XL"];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="container my-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="md:hidden flex items-end my-4 justify-end">

       <button className="md:hidden flex items-end justify-end" onClick={showDrawer}>
                  <BsFillFilterCircleFill  className="w-6 h-6 text-gray-500" />
                </button>
          </div>

          {/* Product Grid */}
           <div className={`grid grid-cols-1 sm:grid-cols-2 lg:px-0  px-4 lg:grid-cols-${gridCols} gap-4`}>
            {data?.docs?.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>

          {/* Pagination */}
           <div className="flex justify-center items-center mt-3 mb-6 border-t ant_pagi">
                  <Pagination
    current={data?.page || 1}
    total={data?.totalDocs || 0}
    pageSize={data?.limit || 10}
    onChange={(page) => getData({ page })}
  />
                </div>
        </div>

<div className="w-full md:w-1/4 md:block hidden border rounded shadow-sm font-sans h-fit bg-white">
      <div className="flex justify-between flex-wrap gap-2 items-center p-2 border-b">
        <div className="flex items-center text-sm">
          <span className="mr-2 whitespace-pre text-textBody font-roboto">Sort By:</span>
          <select className="border rounded  py-1 text-xs bg-white">
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Newest</option>
            <option>Popular</option>
          </select>
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-2 text-textBody font-roboto">Showing:</span>
<div className="flex gap-1">
  <button
    className={` rounded ${gridCols === 3 ? "" : ""}`}
    onClick={() => setGridCols(3)}
    aria-label="3 columns"
  >
    <BsFillGrid3X2GapFill className={`w-6 h-6 ${gridCols === 3 ? "text-textMain" : "text-gray-300"}`} />
  </button>
  <button
    className={` rounded ${gridCols === 2 ? "" : ""}`}
    onClick={() => setGridCols(2)}
    aria-label="2 columns"
  >
    <RiLayout2Fill className={`w-6 h-6 ${gridCols === 2 ? "text-textMain" : "text-gray-300"}`} />
  </button>
</div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="border-b pb-3 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-800">Filters</h2>
            <button className="text-xs text-textMain  flex items-center">
              Clear all
              <BiX className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">Related Categories</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="text-sm font-normal text-textBody font-roboto">
                {category}
              </li>
            ))}
            <li className="text-sm text-textMain  cursor-pointer">See All</li>
          </ul>
        </div>

        {/* Price Range */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">Price Range</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1">
              <label className="text-xs text-textBody font-roboto mb-1 block">Min:</label>
              <input type="text" className="w-full border rounded p-1.5 text-sm" placeholder="0" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-textBody font-roboto mb-1 block">Max:</label>
              <input type="text" className="w-full border rounded p-1.5 text-sm" placeholder="0" />
            </div>
          </div>
          <button className="w-full bg-gray-100 text-sm py-1.5 rounded mt-2 text-textBody font-roboto border">Update</button>
        </div>

        {/* B2B Products */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">B2B Products</h3>
          <div className="text-sm bg-gray-100 border rounded p-2 text-textBody font-roboto">B2B Products Only</div>
        </div>

        {/* Color */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">Color</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full ${color.class} border border-gray-200`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
          <button className="text-sm text-textMain ">See All</button>
        </div>

        {/* Material */}
        <div className="border-b pb-4 mb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">Material</h3>
          <div className="flex gap-2">
            {materials.map((material, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" id={`material-${index}`} className="mr-1 h-4 w-4 border-gray-300 rounded" />
                <label htmlFor={`material-${index}`} className="text-sm text-textBody font-roboto">
                  {material}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="pb-4">
          <h3 className="font-medium text-textMain text-lg leading-7 mb-3  border-b  border-b-textMain w-fit font-roboto">Size</h3>
          <div className="flex gap-2">
        {sizes.map((size, index) => (
  <div key={index}>
    <input
      type="checkbox"
      checked={selectedSize === size}
      onChange={() => setSelectedSize(size)}
      className="mr-1 accent-primary h-3 w-3 cursor-pointer"
      />
    <span className="text-sm text-textBody font-roboto ">{size}</span>
  </div>
))}
          </div>
        </div>
      </div>
    </div>
        {/* Filters Sidebar */}
        <Drawer
          title="Filters"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          width={300}
        >
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Filters</h2>
              <button className="text-xs text-blue-600">Clear all</button>
            </div>
          </div>

          {/* Categories */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Related Categories</h3>
            <ul className="space-y-2">
              {categories?.map((category, index) => (
                <li key={index} className="text-sm">
                  {category}
                </li>
              ))}
              <li className="text-sm text-blue-600">See All</li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min</label>
                <input type="text" className="w-full border rounded p-1 text-sm" placeholder="0" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max</label>
                <input type="text" className="w-full border rounded p-1 text-sm" placeholder="0" />
              </div>
            </div>
            <button className="w-full bg-gray-100 text-sm py-1 rounded mt-2">Update</button>
          </div>

          {/* B2B Products */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="text-sm">B2B Products Only</div>
          </div>

          {/* Color */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {colors?.map((color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full ${color.class}`}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
            <button className="text-sm text-blue-600">See All</button>
          </div>

          {/* Material */}
          <div className="border-b pb-4 mb-4">
            <h3 className="font-medium mb-2">Material</h3>
            <div className="flex gap-2">
              {materials.map((material, index) => (
                <button key={index} className="border rounded px-3 py-1 text-xs">
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="pb-4">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size, index) => (
                <button key={index} className="border rounded-full w-8 h-8 flex items-center justify-center text-xs">
                  {size}
                </button>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
export default Shop;