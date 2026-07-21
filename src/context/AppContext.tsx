"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { featuredGames, deals, upcomingGames, accountsInventory } from "@/data/gameData";

export interface PurchaseRecord {
  id: string;
  gameId: number;
  gameTitle: string;
  gameImage: string;
  platform: string;
  price: number;
  purchasedAt: string;
  playMode: "offline" | "online";
  accountUser: string;
  accountPass: string;
  key: string; // Fallback for backward compatibility
  verificationCode?: string;
  extraDetails?: string;
}

export interface User {
  email: string;
  name: string;
  password?: string; // Optional so we don't leak it in context unnecessarily
  library: PurchaseRecord[];
}

export interface CartItem {
  gameId: number;
  quantity: number;
  playMode: "offline" | "online";
}

interface AppContextType {
  user: User | null;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  registerUser: (name: string, email: string, password: string) => { success: boolean; error?: string };
  loginUser: (email: string, password: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  addToCart: (gameId: number, playMode?: "offline" | "online") => void;
  removeFromCart: (gameId: number, playMode: "offline" | "online") => void;
  updateCartQuantity: (gameId: number, quantity: number, playMode: "offline" | "online") => void;
  clearCart: () => void;
  checkout: () => { success: boolean; keys?: PurchaseRecord[]; error?: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to find game details across datasets
export function findGameById(id: number) {
  const g1 = featuredGames.find((g) => g.id === id);
  if (g1) return { ...g1, price: g1.price, image: g1.image, title: g1.title, platform: g1.platform };
  
  const g2 = deals.find((g) => g.id === id);
  if (g2) return { ...g2, price: g2.dealPrice, image: g2.image, title: g2.title, platform: g2.platform };

  const g3 = upcomingGames.find((g) => g.id === id);
  if (g3) return { ...g3, price: g3.preorderPrice || 399, image: g3.image, title: g3.title, platform: g3.platform };

  return null;
}

// Generate random login credentials
function generateAccountCredentials(gameTitle: string, platform: string, playMode: "offline" | "online") {
  const cleanTitle = gameTitle.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const accountUser = `raider_${platform}_${cleanTitle}_${randomSuffix}`;
  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
  const passLength = 10;
  const accountPass = Array.from({ length: passLength }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  
  return { accountUser, accountPass };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load initial state on mount
  useEffect(() => {
    setMounted(true);
    
    // Load active user session
    const activeSession = localStorage.getItem("millennium_games_active_user");
    if (activeSession) {
      try {
        const currentUser = JSON.parse(activeSession) as User;
        // Fetch fresh copy from database to get latest library
        const usersDb = localStorage.getItem("millennium_games_users");
        if (usersDb) {
          const users = JSON.parse(usersDb) as User[];
          const freshUser = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
          if (freshUser) {
            setUser({ email: freshUser.email, name: freshUser.name, library: freshUser.library });
            localStorage.setItem("millennium_games_active_user", JSON.stringify(freshUser));
          } else {
            setUser(currentUser);
          }
        } else {
          setUser(currentUser);
        }
      } catch (e) {
        console.error("Failed to load active user session", e);
      }
    }

    // Load cart
    const savedCart = localStorage.getItem("millennium_games_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Sync cart to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("millennium_games_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // Auth Operations
  const registerUser = useCallback((name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      return { success: false, error: "Please fill in all fields" };
    }

    const usersDbStr = localStorage.getItem("millennium_games_users") || "[]";
    let users: User[] = [];
    try {
      users = JSON.parse(usersDbStr);
    } catch {
      users = [];
    }

    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: "An account with this email already exists" };
    }

    const newUser: User & { password?: string } = {
      name,
      email,
      password, // Save password in DB
      library: [],
    };

    users.push(newUser);
    localStorage.setItem("millennium_games_users", JSON.stringify(users));

    // Automatically log in
    const sessionUser: User = { name, email, library: [] };
    setUser(sessionUser);
    localStorage.setItem("millennium_games_active_user", JSON.stringify(sessionUser));

    return { success: true };
  }, []);

  const loginUser = useCallback((email: string, password: string) => {
    if (!email || !password) {
      return { success: false, error: "Please enter your email and password" };
    }

    const usersDbStr = localStorage.getItem("millennium_games_users") || "[]";
    let users: any[] = [];
    try {
      users = JSON.parse(usersDbStr);
    } catch {
      users = [];
    }

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      return { success: false, error: "Invalid email or password" };
    }

    const sessionUser: User = {
      name: matchedUser.name,
      email: matchedUser.email,
      library: matchedUser.library || [],
    };

    setUser(sessionUser);
    localStorage.setItem("millennium_games_active_user", JSON.stringify(sessionUser));

    return { success: true };
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("millennium_games_active_user");
  }, []);

  // Cart Operations
  const addToCart = useCallback((gameId: number, playMode: "offline" | "online" = "offline") => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.gameId === gameId && item.playMode === playMode);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      } else {
        return [...prev, { gameId, quantity: 1, playMode }];
      }
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((gameId: number, playMode: "offline" | "online") => {
    setCart((prev) => prev.filter((item) => !(item.gameId === gameId && item.playMode === playMode)));
  }, []);

  const updateCartQuantity = useCallback((gameId: number, quantity: number, playMode: "offline" | "online") => {
    if (quantity <= 0) {
      removeFromCart(gameId, playMode);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.gameId === gameId && item.playMode === playMode ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Checkout Operation
  const checkout = useCallback(() => {
    if (!user) {
      return { success: false, error: "Please sign in to make a purchase." };
    }
    if (cart.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    // Load registered users database
    const usersDbStr = localStorage.getItem("millennium_games_users") || "[]";
    let users: any[] = [];
    try {
      users = JSON.parse(usersDbStr);
    } catch {
      return { success: false, error: "Database error. Please try again." };
    }

    const userIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (userIdx === -1) {
      return { success: false, error: "Active account not found in system." };
    }

    // Process each cart item and create purchase records
    const newPurchases: PurchaseRecord[] = [];
    const dateStr = new Date().toISOString();

    for (const item of cart) {
      const gameDetails = findGameById(item.gameId);
      if (!gameDetails) continue;

      const basePrice = gameDetails.price;
      const finalPrice = item.playMode === "online" ? Math.round(basePrice * 2.5) : basePrice;

      for (let i = 0; i < item.quantity; i++) {
        const invAccount = accountsInventory.find((acc) => acc.games.includes(item.gameId));
        
        let accountUser = "";
        let accountPass = "";
        let extraDetails = "";

        if (invAccount) {
          accountUser = invAccount.accountUser;
          accountPass = invAccount.accountPass;
          extraDetails = invAccount.extraDetails || "";
        } else {
          const generated = generateAccountCredentials(gameDetails.title, gameDetails.platform, item.playMode);
          accountUser = generated.accountUser;
          accountPass = generated.accountPass;
        }

        const purchase: PurchaseRecord = {
          id: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          gameId: item.gameId,
          gameTitle: gameDetails.title,
          gameImage: gameDetails.image,
          platform: gameDetails.platform,
          price: finalPrice,
          accountUser,
          accountPass,
          playMode: item.playMode,
          key: `${accountUser}:${accountPass}`, // Keep as fallback to avoid TS issues
          purchasedAt: dateStr,
          extraDetails,
        };
        newPurchases.push(purchase);
      }
    }

    // Add to library and save database
    if (!users[userIdx].library) {
      users[userIdx].library = [];
    }
    users[userIdx].library = [...newPurchases, ...users[userIdx].library];
    localStorage.setItem("millennium_games_users", JSON.stringify(users));

    // Update session user state
    const updatedUser: User = {
      ...user,
      library: users[userIdx].library,
    };
    setUser(updatedUser);
    localStorage.setItem("millennium_games_active_user", JSON.stringify(updatedUser));

    // Clear cart
    clearCart();

    return { success: true, keys: newPurchases };
  }, [user, cart, clearCart]);

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        cartOpen,
        setCartOpen,
        registerUser,
        loginUser,
        logoutUser,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
