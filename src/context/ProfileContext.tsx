import { createContext } from "react";

export const ProfileContext = createContext({ index: 0, setIndex: (index: number) => {} });
