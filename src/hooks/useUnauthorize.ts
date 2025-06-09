import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "@/hooks/useAppDispatch";
import taskSlice from "@/store/task";
import projectSlice from "@/store/project";

const useUnauthorize = (error?: Error) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.message === "Unauthorized") {
      navigate("/login");
      dispatch(taskSlice.actions.resetState());
      dispatch(projectSlice.actions.resetState());
    }
  }, [dispatch, error, navigate]);
};

export default useUnauthorize;
