"use client";

import { useState } from "react";
import { Product } from "../../data/products";
import { useCart } from "../../contexts/CartContext";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-slate-700">
          数量:
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-10 w-16 rounded-lg border border-slate-300 text-center text-slate-900"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full rounded-xl px-6 py-4 font-semibold text-white transition-colors ${
          isAdded
            ? "bg-green-600"
            : "bg-slate-900 hover:bg-slate-800"
        }`}
      >
        {isAdded ? "✓ カートに追加しました" : "カートに追加"}
      </button>
    </div>
  );
}


