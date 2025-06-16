import Image from "next/image"
import Link from "next/link"


const ProductItem = ({ name, category, price, sales, image }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      <div className="h-16 w-16 relative rounded bg-red-200 p-2 overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover h-full w-full" />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-blue-600">{category}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900">${price}</p>
        <p className="text-sm text-gray-500">{sales} Sales</p>
      </div>
    </div>
  )
}

export default function TopSellingCategory() {
  const products = [
    {
      id: 1,
      name: "Chair with Cushion",
      category: "Furniture",
      price: 124,
      sales: 260,
      image: "/chair.jpg",
    },
    {
      id: 2,
      name: "Hand Bag",
      category: "Accessories",
      price: 564,
      sales: 181,
      image: "/chair.jpg",
    },
    {
      id: 3,
      name: "Sneakers",
      category: "Sports",
      price: 964,
      sales: 134,
      image: "/chair.jpg",
    },
    {
      id: 4,
      name: "Ron Hoodie",
      category: "Fashion",
      price: 769,
      sales: 127,
      image: "/chair.jpg",
    },
    {
      id: 5,
      name: "Smart Watch",
      category: "Electronics",
      price: 999,
      sales: 108,
      image: "/chair.jpg",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Top-Selling Category</h2>
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="h-[350px] sidebar-scrollbar overflow-y-auto">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            sales={product.sales}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}
