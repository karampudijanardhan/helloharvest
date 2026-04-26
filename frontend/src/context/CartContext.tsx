import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Product } from "@/data/mockProducts";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; weight: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; weight: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; weight: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product, weight: string, quantity: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
} | null>(null);

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, subtotal };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, weight, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            product,
            quantity,
            selectedWeight: weight,
            price: product.prices[weight],
          },
        ];
      }

      return { items: newItems, ...calculateTotals(newItems) };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) =>
          !(item.product.id === action.payload.productId && item.selectedWeight === action.payload.weight)
      );
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case "UPDATE_QUANTITY": {
      const { productId, weight, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) => !(item.product.id === productId && item.selectedWeight === weight)
        );
        return { items: newItems, ...calculateTotals(newItems) };
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId && item.selectedWeight === weight
          ? { ...item, quantity }
          : item
      );
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case "CLEAR_CART":
      return { items: [], totalItems: 0, subtotal: 0 };

    case "LOAD_CART":
      return { items: action.payload, ...calculateTotals(action.payload) };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    subtotal: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (e) {
        console.error("Failed to load cart from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, weight: string, quantity: number) => {
    dispatch({ type: "ADD_ITEM", payload: { product, weight, quantity } });
  };

  const removeFromCart = (productId: string, weight: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, weight } });
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, weight, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemCount = () => state.totalItems;

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart, getItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
