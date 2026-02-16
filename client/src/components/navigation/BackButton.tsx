import { ROUTES } from "@/routes";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ fallback = ROUTES.HOME }: { fallback?: string }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
  return (
    <button
      onClick={handleBack}
      className="mb-4 w-full inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
