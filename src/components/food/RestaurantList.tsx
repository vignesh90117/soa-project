'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Clock,
  MapPin,
  Search,
  Flame,
  ChevronRight,
  Sparkles,
  Play,
  Loader2,
  Tag
} from 'lucide-react';

export function RestaurantList() {
  const {
    restaurants,
    setSelectedRestaurant,
    selectedCuisine,
    setSelectedCuisine,
    searchQuery,
    setSearchQuery,
    vegOnly,
    setVegOnly,
    runFullDemoFlow,
    isDemoRunning
  } = useApp();

  const cuisines = ['All', 'North Indian', 'Italian', 'Japanese', 'American'];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesCuisine =
      selectedCuisine === 'All' || r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || r.menu.some((item) => item.isVeg);
    return matchesCuisine && matchesSearch && matchesVeg;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner with 1-Click Automated SOA Simulation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border border-orange-500/20 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Service S1: Restaurant Catalog & Menu Management</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Order Food from Top Rated Kitchens
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Select a verified restaurant, inspect their live menu catalog, and trigger decoupled microservice workflows in real time.
          </p>
        </div>

        {/* 1-Click Interactive Demo Button */}
        <div className="relative z-10 flex-shrink-0">
          <button
            onClick={runFullDemoFlow}
            disabled={isDemoRunning}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white font-bold text-sm shadow-xl shadow-orange-600/30 ring-2 ring-orange-400/50 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            {isDemoRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Running Full SOA Demo...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current text-white" />
                <span>1-Click Full SOA Flow Demo</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-1.5 font-mono">
            Auto-runs S1 ➔ S2 ➔ S3 ➔ S4 ➔ S5
          </p>
        </div>

        <div className="absolute right-[-20px] bottom-[-20px] opacity-15 text-9xl select-none pointer-events-none">
          🍱
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, cuisines, dishes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={'px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ' +
                (selectedCuisine === c
                  ? 'bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700')}
            >
              {c}
            </button>
          ))}

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={'flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition ' +
              (vegOnly
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-300')}
          >
            <span className="w-2.5 h-2.5 rounded-full border border-emerald-400 flex items-center justify-center p-0.5">
              <span className={'w-1.5 h-1.5 rounded-full ' + (vegOnly ? 'bg-emerald-400' : 'bg-transparent')}></span>
            </span>
            <span>Pure Veg</span>
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantId}
            onClick={() => setSelectedRestaurant(restaurant)}
            className="group relative flex flex-col bg-slate-900/70 border border-slate-800 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer"
          >
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-800">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  REST-ID: #{restaurant.restaurantId}
                </span>
                {restaurant.isOpen && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Open Now
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-semibold text-slate-200 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{restaurant.deliveryTimeMins} mins</span>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-600/95 text-white text-xs font-bold shadow-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{restaurant.rating}</span>
                <span className="text-[10px] font-normal text-emerald-100">({restaurant.reviewCount})</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                  {restaurant.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
                  {restaurant.cuisine}
                </p>
                <div className="flex items-center space-x-1 text-xs text-slate-400 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{restaurant.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-200 font-semibold">{restaurant.menu.length} Items</span> on Menu
                </div>
                <div className="flex items-center space-x-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition">
                  <span>Explore Menu</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}