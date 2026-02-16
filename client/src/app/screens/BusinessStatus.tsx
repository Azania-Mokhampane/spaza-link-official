import RegistrationStatus from "@/components/business/RegistrationStatus";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";
import { useNavigate } from "react-router-dom";

const BusinessStatus = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.BUSINESS} />
      <div className="mx-auto w-full max-w-screen-sm">
        <RegistrationStatus
          onContinue={() => navigate(ROUTES.BUSINESS_DASHBOARD)}
        />
      </div>
    </main>
  );
};

export default BusinessStatus;
