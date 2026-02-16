import BusinessRegistrationForm from "@/components/business/BusinessRegistrationForm";
import BackButton from "@/components/navigation/BackButton";
import { ROUTES } from "@/routes";
import { useNavigate } from "react-router-dom";

const BusinessRegister = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-1 flex-col bg-background px-4 py-6">
      <BackButton fallback={ROUTES.BUSINESS} />
      <div className="mx-auto w-full max-w-screen-sm">
        <BusinessRegistrationForm
          onSubmit={() => navigate(ROUTES.BUSINESS_STATUS)}
        />
      </div>
    </main>
  );
};

export default BusinessRegister;
