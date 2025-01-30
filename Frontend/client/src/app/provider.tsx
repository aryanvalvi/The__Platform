"use client";
import { Provider } from "react-redux";
import { store } from "@/ReduxStore/store/store";

interface Children {
  children: React.ReactNode;
}
const Providers = ({ children }: Children) => {
  return <Provider store={store}>{children}</Provider>;
};
export default Providers;
