import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'electron.notoil.com',
  appName: 'no-toil',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
