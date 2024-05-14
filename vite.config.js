import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { wrapperEnv,createProxy ,OUTPUT_DIR} from './build/utils';
import { createVitePlugins } from './build/vite/plugin';


function pathResolve(dir) {
    // eslint-disable-next-line no-undef
  return resolve(process.cwd(), '.', dir);
}


// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=>{
  // eslint-disable-next-line no-undef
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return{
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv,isBuild),
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: OUTPUT_DIR,
    },
    resolve: {
      alias: 
        {
        '@': pathResolve('src'),
        }
      ,
      extensions: ['.js', '.vue', '.json']
    },
  }
})
