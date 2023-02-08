import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import preact from '@preact/preset-vite'
import WindiCSS from 'vite-plugin-windicss'
import { defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  name: 'Kepo',
  description:
    'This extension displays your public IP address, ISP name and quickly view information for the current page.',
  version: '0.1.0',
  manifest_version: 3,
  host_permissions: ['http://*/*', 'https://*/*'],
  icons: {
    '16': 'img/logo-16.png',
    '32': 'img/logo-34.png',
    '48': 'img/logo-48.png',
    '128': 'img/logo-128.png',
  },
  action: {
    default_title: 'Kepo',
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'tabs', 'activeTab', 'webRequest'],
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },

    plugins: [crx({ manifest }), preact(), WindiCSS()],
  }
})
