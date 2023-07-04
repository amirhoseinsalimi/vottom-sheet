import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
// eslint-disable-next-line import/no-unresolved
import { configDefaults, defineConfig } from 'vitest/config'
// eslint-disable-next-line import/no-unresolved
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  })
)
