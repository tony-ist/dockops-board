import dotenv from 'dotenv';

function loadDotEnv(dotEnvFilePath: string) {
  dotenv.config({ path: dotEnvFilePath });
}

if (process.env.NODE_ENV !== 'PRODUCTION') {
  // Load development config by default
  loadDotEnv('.env.local');
}

if (process.env.TEMPORARY_DIRECTORY_PATH === undefined) {
  throw new Error('Set TEMPORARY_DIRECTORY_PATH environment variable before running dockops-board.');
}

function getValueOrDefault(envVar: string | undefined | null, defaultValue: boolean) {
  if (envVar === null || envVar === undefined) {
    return defaultValue;
  }

  return envVar === 'TRUE';
}

export const config = {
  dockerSockPath: process.env.DOCKER_SOCK_PATH ?? '/var/run/docker.sock',
  port: parseInt(process.env.PORT ?? '3000'),
  nodeEnv: process.env.NODE_ENV,
  sqliteURL: process.env.SQLITE_URL,
  shouldServeStatic: getValueOrDefault(process.env.SERVE_STATIC, true),
  temporaryDirectoryPath: process.env.TEMPORARY_DIRECTORY_PATH,
  frontendURL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  secret: process.env.SECRET,
  bcryptSaltWorkFactor: parseInt(process.env.BCRYPT_SALT_WORK_FACTOR ?? '12'),
  jwtExpiration: process.env.JWT_EXPIRATION ?? '30d',
  shouldListenDockerEvents: getValueOrDefault(process.env.SHOULD_LISTEN_DOCKER_EVENTS, true),
};
