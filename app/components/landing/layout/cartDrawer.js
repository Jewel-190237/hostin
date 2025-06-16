import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user";
import { useI18n } from "@/app/context/i18n";
const CartDrawer = ({ setIsOpen }) => {
  const { allcartItem, updateItemQuantity, removeItem } = useUser();
  const router = useRouter();
  const { langCode } = useI18n();
  return (
    <div className="pt-[30px] pl-5 pr-3 font-roboto">
      <div className="flex justify-between items-center border-b border-textMain pb-[10px]">
        <p className="text-2xl font-medium text-textMain flex items-center gap-2">
          {" "}
          <RiShoppingCartLine size={28} /> Cart Items
        </p>
        <div onClick={() => setIsOpen(false)} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <p className="text-lg flex items-center  font-medium text-textMain">
              Close
            </p>
            <GoArrowRight className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="space-y-5 mt-3 h-[65vh] sidebar-scrollbar overflow-y-auto border-b  border-textMain">
        {allcartItem.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-[10px] border border-[#E0E0E0] px-[10px]"
          >
            <div className="w-[73px] h-[80px]">
              <Image
                src={item.thumbnail}
                alt={item.name.en}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex flex-col ">
                <p className="text-lg w-[100%] font-medium text-textMain line-clamp-1">
                  {item.name[langCode]}
                </p>
                <p className="text-xs text-tertialText">Price: ${item.price}</p>
                <p className="text-xs text-tertialText">Quantity: {item.quantity}</p>
              </div>
              <div className="text-textBody text-sm font-medium">
                <sub className="text-xs">5*</sub>8754512
              </div>
              <div className="">
                <RxCross2
                  size={25}
                  className="cursor-pointer text-primary font-medium"
                  onClick={() => removeItem(item._id)}
                />
              </div>
              <div className="flex flex-col">
                <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>
                  Increase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-3 flex text-lg font-medium justify-between text-textMain">
        <h3>Subtotal</h3>
        <h3>$982336555</h3>
      </div>

      <div className="mt-3 space-y-2 px-10 w-full">
        <button onClick={() => {router.push('/cart')
            setIsOpen(false)
        }} className="w-full py-4 text-lg font-medium hover:bg-primary text-textMain border">
          Vew Cart
        </button>
        <button className="w-full py-4 text-lg font-medium hover:bg-white bg-primary text-white hover:text-textMain border">
          Go To Checkout
        </button>
        <button className="flex items-center justify-center w-full text-[#B2B8BD] py-2 text-base font-normal">
        Clear all <RxCross2 />
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
