import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-primary">ISA AI</h1>
        <p className="text-xl text-muted-foreground">
          Inteligência artificial para gestão financeira pessoal
        </p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-3"
          onClick={() => navigate('/login')}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default Index;