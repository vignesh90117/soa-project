'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Plus,
  Minus,
  Star,
  MapPin,
  Clock,
  ShoppingBag
} from 'lucide-react';

export function RestaurantMenuModal() {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    cart,
    addToCart,
    updateQuantity,
    setIsCartOpen
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!selectedRestaurant) return null;

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

  const filteredMenu = selectedRestaurant.menu.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const getItemCartQty = (itemId: number) => {
    const itemInCart = cart.find((i) => i.item.itemId === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="relative h-48 sm:h-64 w-full bg-slate-800 flex-shrink-0">
          <img
            src={selectedRestaurant.image}
            alt={selectedRestaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

          <button
            onClick={() => setSelectedRestaurant(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700 backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
                  Service S1 Catalog
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {selectedRestaurant.cuisine}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedRestaurant.name}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  {selectedRestaurant.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {selectedRestaurant.deliveryTimeMins} mins
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                <span>{selectedRestaurant.rating}</span>
                <span className="text-[10px] text-emerald-100 font-normal">
                  ({selectedRestaurant.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-6 py-3 border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={'px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ' +
                (activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60')}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenu.map((item) => {
              const qty = getItemCartQty(item.itemId);
              return (
                <div
                  key={item.itemId}
                  className="flex gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition justify-between"
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={'w-4 h-4 rounded-sm border p-0.5 flex items-center justify-center ' +
                          (item.isVeg ? 'border-emerald-500' : 'border-rose-500')}
                        title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={'w-2 h-2 rounded-full ' +
                            (item.isVeg ? 'bg-emerald-500' : 'bg-rose-500')}
                        ></span>
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        {item.category}
                      </span>
                      {item.calories && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-100 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-sm font-extrabold text-orange-400 pt-1">
                      ₹{item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between w-28 flex-shrink-0">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full mt-2">
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(selectedRestaurant, item)}
                          className="w-full py-1.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-orange-600/20 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-800 border border-orange-500/40 rounded-xl p-1 text-xs">
                          <button
                            onClick={() => updateQuantity(item.itemId, -1)}
                            className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-orange-400 px-1">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.itemId, 1)}
                            className="p-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {totalCartCount > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white text-sm">{totalCartCount} items</span> added to Cart
            </div>
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                setIsCartOpen(true);
              }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-600/25 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Review Order & Checkout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}