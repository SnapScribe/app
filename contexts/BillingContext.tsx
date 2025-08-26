import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import Config from "react-native-config";

interface BillingContextProps {
  isAnonymous: boolean;
  userId: string | null;
  subscriptionActive: boolean;
  checkPaywall: () => Promise<boolean>;
}

const BillingContext = createContext<BillingContextProps>(
  {} as BillingContextProps,
);

export const BillingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  // get the latest details about the user (is anonymous, user id, has active subscription)
  const getUserDetails = async () => {
    setIsAnonymous(await Purchases.isAnonymous());
    setUserId(await Purchases.getAppUserID());

    const customerInfo = await Purchases.getCustomerInfo();
    setSubscriptionActive(
      typeof customerInfo.entitlements.active[Config.ENTITLEMENT_ID] !==
        "undefined",
    );
  };

  const checkPaywall = useCallback(async () => {
    try {
      const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: Config.ENTITLEMENT_ID,
      });

      if (
        paywallResult === PAYWALL_RESULT.PURCHASED ||
        paywallResult === PAYWALL_RESULT.RESTORED
      ) {
        console.log("User has access to pro features");
        return true;
      }
    } catch (error) {
      console.error("Error presenting paywall:", error);
    }

    return false;
  }, []);

  useEffect(() => {
    // Get user details when component first mounts
    getUserDetails();
  }, []);

  useEffect(() => {
    // Subscribe to purchaser updates
    Purchases.addCustomerInfoUpdateListener(getUserDetails);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(getUserDetails);
    };
  }, []);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: Config.REVENUECAT_APPSTORE_API_KEY });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: Config.REVENUECAT_PLAYSTORE_API_KEY });
    }
  }, []);

  const value = useMemo(() => {
    return {
      isAnonymous,
      userId,
      subscriptionActive,
      checkPaywall,
    };
  }, [isAnonymous, userId, subscriptionActive, checkPaywall]);

  return (
    <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
  );
};

export const useBilling = () => useContext(BillingContext);
