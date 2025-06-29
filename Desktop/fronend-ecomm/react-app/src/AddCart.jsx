import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navigation';
import { ClothesContext } from './Context/ClothesContext';

const AddCart = () => {
  
  const {clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes} = useContext(ClothesContext)
  // console.log(cartProducts)
  // console.log(clothes)

  const deleteProduct = (id) => {

    if (clothes[id-1].quantity > 1) {

      setcartProducts(prev => {
        return prev.map((item)=> item.id === id ? {...item, quantity: item.quantity-1} : item)
      })

      setClothes(prev => {
        return prev.map((item)=> item.id === id ? {...item, quantity: item.quantity-1} : item)
      })

    }
    else{
      setClothes(prev => {
        return prev.map((item)=> item.id === id ? {...item, quantity: 0} : item)
      })
      const newarr=cartProducts.filter((item) => item.id !== id )
      setcartProducts(newarr)
    }
  }

  const addProduct = (id) => {
      setcartProducts(prev => {
        return prev.map((item)=> item.id === id ? {...item, quantity: item.quantity+1} : item)
      })

      setClothes(prev => {
        return prev.map((item)=> item.id === id ? {...item, quantity: item.quantity+1} : item)
      })
  }

  const total = cartProducts.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // console.log(total)

  const qty = cartProducts.reduce((sum,item) => sum + item.quantity, 0);

  // console.log(qty)
 

  return (
    <>
      {/* <Navigation /> */}
      <div className="px-6 py-8 ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{qty===0 ? "Nothing in the Cart!! Do Some Shopping" : "🛒 Your Cart" }</h1>
        <div className='flex justify-between items-center border-2 m-3.5 p-3 text-3xl bg-red-300 '>
          <span>Subtotal ({qty} items) - ₹ {total} /- </span>
          <button className='border-2 p-2 bg-green-300 rounded-3xl ' >Proceed to Buy</button>
        </div>

        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartProducts.map((i) => (
            <div
              key={i.id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <img
                src={i.image}
                alt={i.name}
                className="w-48 h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{i.name}</h2>
              <p className="text-sm text-gray-600 mt-1">ID: {i.id}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{i.price}</p>
              <div className='flex gap-4 mt-2 '>
                <button onClick={() => deleteProduct(i.id)} className=' flex justify-center items-end border-2 bg-red-400 w-8 text-5xl h-8 rounded-full '>-</button>
                <div className='text-xl'>{i.quantity}</div>
                <button onClick={() => addProduct(i.id)} className='flex justify-center items-end border-2 bg-green-400 w-8 text-4xl h-8 rounded-full '>+</button>
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddCart;
