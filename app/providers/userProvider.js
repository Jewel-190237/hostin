"use client"

import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { fetchUser } from "../helpers/backend";
import UserContext from "../context/user";

const UserProviders = ({ children }) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const { data, success } = await fetchUser();
        if (success) {
            setUser(data);
        }
    };

    const [cart, setCart] = useState(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : { items: [] };
        }
        return { items: [] };
    });

    const [wishlist, setWishlist] = useState(() => {
        if (typeof window !== "undefined") {
            const savedWishlist = localStorage.getItem("wishlist");
            return savedWishlist ? JSON.parse(savedWishlist) : { items: [] };
        }
        return { items: [] };
    });

    const saveCartToLocalStorage = (cartData) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
        setCart(cartData);
    };

    const saveWishlistToLocalStorage = (wishData) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("wishlist", JSON.stringify(wishData));
        }
        setWishlist(wishData);
    };

    const addItem = (item) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || { items: [] }
      
        const existingIndex = cart.items.findIndex(i => i._id === item._id)
      
        if (existingIndex > -1) {
          cart.items[existingIndex].quantity += 1
        } else {
          cart.items.push({ ...item, quantity: 1 })
        }
      
        localStorage.setItem("cart", JSON.stringify(cart))
        saveCartToServer(cart);
    }

    const saveCartToServer = async (cartData) => {
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const response = await fetch("/api/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(cartData),
                });

                if (!response.ok) {
                    throw new Error("Failed to save cart items");
                }

                const result = await response.json();
                console.log("Cart items saved successfully:", result);
            } catch (error) {
                console.error("Error saving cart items:", error);
            }
        } else {
            console.warn("No user token found in local storage.");
        }
    };

    const removeItem = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
        cart.items = cart.items.filter((item) => item._id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
        saveCartToServer(cart);
    };

    const updateItemQuantity = (id, qty) => {
        const updatedCart = { ...cart };
        const itemIndex = updatedCart.items.findIndex((item) => item._id === id);
        const parsedQty = parseInt(qty, 10);
        
        if (itemIndex > -1) {
            updatedCart.items[itemIndex].quantity = parsedQty;
            if (parsedQty <= 0) {
                updatedCart.items.splice(itemIndex, 1);
            }
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
            saveCartToServer(updatedCart);
        }
    };

    const clearCart = () => {
        saveCartToLocalStorage({ items: [] });
        saveCartToServer({ items: [] });
    };

    const getCartItems = () => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            const parsedCart = savedCart ? JSON.parse(savedCart) : { items: [] };
            return parsedCart.items;
        }
        return [];
    };
    const allcartItem = getCartItems(); 

    const addToWishlist = (id) => {
        const updatedWishlist = { ...wishlist };
        const itemIndex = updatedWishlist.items.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            updatedWishlist.items.push({ id });
            saveWishlistToLocalStorage(updatedWishlist);
        }
    };

    const removeFromWishlist = (id) => {
        const updatedWishlist = { ...wishlist };
        updatedWishlist.items = updatedWishlist.items.filter((item) => item.id !== id);
        saveWishlistToLocalStorage(updatedWishlist);
    };

    const clearWishlist = () => {
        saveWishlistToLocalStorage({ items: [] });
    };

    return (
        <UserContext.Provider value={{
            user, setUser, getUser,
            cart, wishlist,
            addItem, removeItem, updateItemQuantity, clearCart,
            addToWishlist, removeFromWishlist, clearWishlist,
            getCartItems,allcartItem
        }}>
            <SkeletonTheme color="#0F172A" highlightColor="#444">
                {children}
            </SkeletonTheme>
        </UserContext.Provider>
    )
}

export default UserProviders;