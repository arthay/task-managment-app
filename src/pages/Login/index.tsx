import { Card, CardHeader, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/common/forms/LoginForm";
import getRandomId from "@/utils/getRandomId";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  function handleSubmit() {
    localStorage.setItem("token", getRandomId());

    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Login</h1>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
