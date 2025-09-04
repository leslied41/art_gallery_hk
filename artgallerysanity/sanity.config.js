import { defineConfig } from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './schemas/index.js'

export default defineConfig({
  name: 'art_gallery_sanity',
  title: 'Art Gallery Studio',
  projectId: 'z3dq9mvc',
  dataset: 'production',
  // Optional if you embed the Studio under a subpath:
  // basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(),
    // media(),
    // vercelDeployTool({ /* only if you installed it */ }),
  ],
  schema: {types: schemaTypes},
})