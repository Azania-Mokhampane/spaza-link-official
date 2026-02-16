import Business from "./app/screens/Business";
import BusinessDashboard from "./app/screens/BusinessDashboard";
import BusinessProfile from "./app/screens/BusinessProfile";
import BusinessRegister from "./app/screens/BusinessRegister";
import BusinessStatus from "./app/screens/BusinessStatus";
import Customer from "./app/screens/Customer";
import Home from "./app/screens/Home";
import RedeemReward from "./app/screens/RedeemReward";
import RewardEarned from "./app/screens/RewardEarned";
import SpendConfirmation from "./app/screens/SpendConfirmation";
import Wallet from "./app/screens/Wallet";

export const ROUTES = {
  HOME: "/",
  // business
  BUSINESS: "/business",
  BUSINESS_DASHBOARD: "/business/dashboard",
  BUSINESS_REGISTRATION: "/business/register",
  BUSINESS_STATUS: "/business/status",
  // customer
  BUSINESS_PROFILE: "/customer/business/:id",
  CUSTOMER: "/customer",
  SPEND_CONFIRMATION: "/customer/spend",
  WALLET: "/customer/wallet",
  REWARD_EARNED: "/customer/reward-earned",
  REDEEM_REWARD: "/customer/redeem/:rewardId",
} as const;

export const routes = [
  {
    path: ROUTES.HOME,
    element: Home,
  },
  // customer rooutes
  {
    path: ROUTES.CUSTOMER,
    element: Customer,
  },
  { path: ROUTES.REWARD_EARNED, element: RewardEarned },
  {
    path: ROUTES.SPEND_CONFIRMATION,
    element: SpendConfirmation,
  },
  { path: ROUTES.WALLET, element: Wallet },
  { path: ROUTES.REDEEM_REWARD, element: RedeemReward },
  // business routes
  {
    path: ROUTES.BUSINESS,
    element: Business,
  },
  {
    path: ROUTES.BUSINESS_PROFILE,
    element: BusinessProfile,
  },
  { path: ROUTES.BUSINESS_DASHBOARD, element: BusinessDashboard },
  { path: ROUTES.BUSINESS_REGISTRATION, element: BusinessRegister },
  { path: ROUTES.BUSINESS_STATUS, element: BusinessStatus },
];

// Helper function for dynamic routes
export const getBusinessProfilePath = (id: string | number) =>
  `/customer/business/${id}`;
