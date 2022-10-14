// For info / context, see
// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window
export {};

declare global {
  interface Window {
    env: {
      AUTH0_CLIENTID: string;
      AUTH0_DOMAIN: string;
      AUTH0_AUDIENCE: string;
      GRAPHQL_ENDPOINT: string;
      WAREHOUSES_URL: string;
      MAPBOX_TOKEN: string;
      BOUNDARIES_API_KEY: string;
    };
  }
}