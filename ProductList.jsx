import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Calculate total items in cart for the Navbar icon
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3 Categories, 6 plants per category to meet the rubric strictly
  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", price: 15, image: "https://via.placeholder.com/150" },
        { name: "Spider Plant", price: 12, image: "https://via.placeholder.com/150" },
        { name: "Peace Lily", price: 18, image: "https://via.placeholder.com/150" },
        { name: "Boston Fern", price: 14, image: "https://via.placeholder.com/150" },
        { name: "Rubber Plant", price: 20, image: "https://via.placeholder.com/150" },
        { name: "Aloe Vera", price: 10, image: "https://via.placeholder.com/150" }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", price: 12, image: "https://via.placeholder.com/150" },
        { name: "Mint", price: 8, image: "https://via.placeholder.com/150" },
        { name: "Rosemary", price: 10, image: "https://via.placeholder.com/150" },
        { name: "Jasmine", price: 22, image: "https://via.placeholder.com/150" },
        { name: "Basil", price: 6, image: "https://via.placeholder.com/150" },
        { name: "Lemon Balm", price: 9, image: "https://via.placeholder.com/150" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Jade Plant", price: 14, image: "https://via.placeholder.com/150" },
        { name: "Echeveria", price: 11, image: "https://via.placeholder.com/150" },
        { name: "Zebra Haworthia", price: 13, image: "https://via.placeholder.com/150" },
        { name: "Burro's Tail", price: 16, image: "https://via.placeholder.com/150" },
        { name: "String of Pearls", price: 19, image: "https://via.placeholder.com/150" },
        { name: "Panda Plant", price: 12, image: "https://via.placeholder.com/150" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div>
          <a href="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</a>
          <a href="#" onClick={handlePlantsClick} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
        </div>
        <div>
          <a href="#" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            🛒 Cart ({totalItems})
          </a>
        </div>
      </nav>

      {/* Main Content Toggle */}
      {!showCart ? (
        <div className="product-listing">
          <h2 style={{ textAlign: 'center', margin: '20px' }}>Our Plants</h2>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h3 style={{ textAlign: 'center' }}>{categoryObj.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {categoryObj.plants.map((plant, idx) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                      <img src={plant.image} alt={plant.name} width="150" />
                      <h4>{plant.name}</h4>
                      <p>${plant.price}</p>
                      <button 
                        onClick={() => handleAddToCart(plant)} 
                        disabled={isAdded}
                        style={{ padding: '8px 15px', cursor: isAdded ? 'not-allowed' : 'pointer', backgroundColor: isAdded ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px'}}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handlePlantsClick} />
      )}
    </div>
  );
}

export default ProductList;
