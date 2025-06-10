import type { T_AppDispatch } from "@/store/setup";
import { useDispatch } from "react-redux";

const useAppDispatch = () => useDispatch<T_AppDispatch>();

export default useAppDispatch;
