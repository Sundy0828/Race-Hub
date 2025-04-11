import { logEvent } from "firebase/analytics";
import { analytics } from "../firebaseConfig"; // adjust the import to your setup
import { useFirebaseAuth } from "../providers/AuthContext"; // adjust based on your actual auth hook

type PageViewParams = {
  page: string;
  subPage?: string;
};

type CustomEventParams = {
  name: string;
  data?: Record<string, unknown>;
};

const APPLICATION = "web";

export function useAnalyticsLogger() {
  const { user } = useFirebaseAuth();

  const getCommonProps = () => ({
    user: user ? { uid: user.uid, email: user.email } : null,
    application: APPLICATION,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  });

  const logPageView = ({ page, subPage }: PageViewParams) => {
    if (!analytics) return;

    logEvent(analytics, "page_view", {
      ...getCommonProps(),
      page,
      sub_page: subPage ?? null,
    });
  };

  const logCustomEvent = ({ name, data }: CustomEventParams) => {
    if (!analytics) return;

    logEvent(analytics, name, {
      ...getCommonProps(),
      ...data,
    });
  };

  return {
    logPageView,
    logCustomEvent,
  };
}
