import { createContext } from "react";
import { ProfileInterface } from "../flat/Profile/interface";

export const ProfileContext = createContext({
  index: 0,
  profiles: [] as ProfileInterface[],
  setIndex: (index: number) => {},
});
