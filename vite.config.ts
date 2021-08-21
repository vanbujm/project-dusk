import { defineConfig } from 'vite';
import ViteFonts from 'vite-plugin-fonts';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    ViteFonts({
      google: {
        preconnect: true,
        display: 'block',
        //
        // /**
        //  * values: auto, block, swap(default), fallback, optional
        //  * default: undefined
        //  */
        // text: 'ViteAwsom',

        /**
         * Fonts families lists
         */
        families: [
          {
            /**
             * Family name (required)
             */
            name: 'Gruppo',

            /**
             * Family styles
             */
            // styles: 'ital,wght@0,400;1,200',

            /**
             * enable non-blocking renderer
             *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
             * default: true
             */
            defer: true,
          },
          {
            /**
             * Family name (required)
             */
            name: 'Montserrat',

            /**
             * Family styles
             */
            styles: 'ital,wght@0,300;0,400;1,300;1,400',

            /**
             * enable non-blocking renderer
             *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
             * default: true
             */
            defer: true,
          },
          {
            /**
             * Family name (required)
             */
            name: 'VT323',

            /**
             * Family styles
             */
            // styles: 'ital,wght@0,300;0,400;1,300;1,400',

            /**
             * enable non-blocking renderer
             *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
             * default: true
             */
            defer: true,
          },
        ],
      },
    }),
  ],
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: 'import {jsx} from "theme-ui"',
  },
});
