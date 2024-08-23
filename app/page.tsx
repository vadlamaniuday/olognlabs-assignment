"use client";
import SearchInput from "@/components/SearchInput";
import { Provider } from "react-redux";
import { store } from "@/store";
export default function Home() {
  return (
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );
}
