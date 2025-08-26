declare module 'react-native-config' {
  export interface NativeConfig {
    REVENUECAT_APPSTORE_API_KEY: string;
    REVENUECAT_PLAYSTORE_API_KEY: string;
    ENTITLEMENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
