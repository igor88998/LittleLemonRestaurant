'use client'
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice
    if (cartProduct.size) {
        price += cartProduct.size.price
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price
        }
    }
    if (cartProduct.count) {
        price *= cartProduct.count
    }

    return price
}

export function AppProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([])
    const [productCounts, setProductCounts] = useState({});

    const localStorage = typeof window !== 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [localStorage])

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }

    function addToCart(product, size = null, extras = [], count) {

        setCartProducts(prevProducts => {
            const exist = prevProducts.find(p => p._id === product._id && p.size?.name === size?.name && p.extras === extras)

            if (exist) {
                const newProducts = prevProducts.map(p => {
                    if (p._id === product._id && p.size?.name === size?.name && p.extras === extras) {
                        return { ...p, size, extras, count: p.count + count };
                    }
                    return p;
                });
                return newProducts;
            } else {
                const cartProduct = { ...product, size, extras, count: count };
                const newProducts = [...prevProducts, cartProduct];
                saveCartProductsToLocalStorage(newProducts);
                return newProducts;
            }
        });
    }

    function removeCartProducts(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts
        })
        toast.success('Product removed')
    }

    function saveCartProductsToLocalStorage(cartProducts) {
        if (localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function increaseCount(index) {
        setCartProducts(prevProducts => {
            const newProducts = [...prevProducts];
            newProducts[index] = { ...newProducts[index], count: newProducts[index].count + 1 }; 
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }
    
    function decreaseCount(index) {
        setCartProducts(prevProducts => {
            const newProducts = [...prevProducts];
            if (newProducts[index].count > 1) {
                newProducts[index] = { ...newProducts[index], count: newProducts[index].count - 1 };
                saveCartProductsToLocalStorage(newProducts);
            }
            return newProducts;
        });
    }
    
    function getProductCount(productId) {
        return productCounts[productId] || 1; 
    }

    function setProductCount(productId, count) {
        setProductCounts(prevCounts => ({
            ...prevCounts,
            [productId]: count
        }));
    }

    return (
        <SessionProvider>
            <CartContext.Provider
                value={{
                    cartProducts, setCartProducts, addToCart, removeCartProducts, clearCart,
                    increaseCount, decreaseCount, getProductCount, setProductCount
                }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}