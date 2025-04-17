"use client";

import { createContext } from "react";

import type { TAppContext } from "@/types";

export const AppContext = createContext<TAppContext | null>(null);
