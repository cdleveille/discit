import type { TAppContext } from "@types";
import { createContext } from "react";

export const AppContext = createContext<TAppContext | null>(null);
