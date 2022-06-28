export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events

export const gaEvent = (action: string, parameters: object) => {
  window.gtag('event', action, parameters);
};
