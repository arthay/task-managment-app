import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import reducer from "@/store/rootReducer";

const store = configureStore({
  reducer,
});

interface I_StoreProviderWrapperProps {
  children: ReactNode;
}

function StoreProviderWrapper({ children }: I_StoreProviderWrapperProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProviderWrapper;
