import { G } from '@mobily/ts-belt';

type Env = 'REACT_APP_API';

export const checkEnvs = (envs: Env[]) => {
  envs.forEach((env) => {
    if (G.isNullable(process.env[env])) {
      throw new Error(`${env} env var not declared.`);
    }
  });
};

export const getEnv = (env: Env) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return process.env[env]!;
};
