import { registerSW } from "virtual:pwa-register";

export const unregisterSW = registerSW({
  immediate: true,
});
