import { defineConfig } from 'sanity'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  // ...
  plugins: [
    // ...
    vercelDeployTool(),
  ],
})