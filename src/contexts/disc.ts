"use client";

import { createContext } from "react";

import type { DiscContext as TDiscContext } from "@types";

export const DiscContext = createContext<TDiscContext | null>(null);
