/* eslint-disable no-undef */
export const OUTPUT_DIR = 'dist';

const httpsRE = /^https:\/\//;

export const createProxy=(list = [])=> {
  const ret = {};
  for (const [prefix, target, isReplace] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: function (path) {
        if (isReplace) {
          return path.replace(new RegExp(`^${prefix}`), '');
        }
        return path;
      },
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}

export const wrapperEnv=(envConf)=> {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
