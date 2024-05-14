import vue from '@vitejs/plugin-vue';
import { configImageminPlugin } from './imagemin';

export const createVitePlugins=(viteEnv,isBuild)=>{
  const {
    VITE_USE_IMAGEMIN,
  } = viteEnv;
  const vitePlugins=[
    vue(),
  ]
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
  }

  return vitePlugins;
}