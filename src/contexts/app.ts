"use client";

import { createContext } from "react";

import type { AppContext as TAppContext } from "@types";

export const AppContext = createContext<TAppContext | null>(null);
