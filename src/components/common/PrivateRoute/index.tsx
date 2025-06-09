import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface I_PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: I_PrivateRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Button onClick={handleLogoutClick} className="cursor-pointer">
          Logut
        </Button>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export default PrivateRoute;
