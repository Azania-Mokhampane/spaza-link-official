import Business from "./app/screens/Business";
import BusinessProfile from "./app/screens/BusinessProfile";
import Customer from "./app/screens/Customer";
import Home from "./app/screens/Home";
import SpendConfirmation from "./app/screens/SpendConfirmation";

export const ROUTES = {
  HOME: "/",
  BUSINESS: "/business",
  BUSINESS_PROFILE: "/customer/business/:id",
  CUSTOMER: "/customer",
  SPEND_CONFIRMATION: "/customer/spend",
  WALLET: "/customer/wallet",
  BUSINESS_DASHBOARD: "/business/dashboard",
  BUSINESS_REGISTRATION: "/business/register",
  BUSINESS_STATUS: "/business/status",
} as const;

export const routes = [
  {
    path: ROUTES.HOME,
    element: Home,
  },
  {
    path: ROUTES.BUSINESS,
    element: Business,
  },
  {
    path: ROUTES.CUSTOMER,
    element: Customer,
  },
  {
    path: ROUTES.BUSINESS_PROFILE,
    element: BusinessProfile,
  },
  {
    path: ROUTES.SPEND_CONFIRMATION,
    element: SpendConfirmation,
  },
];

// Helper function for dynamic routes
export const getBusinessProfilePath = (id: string | number) =>
  `/customer/business/${id}`;
