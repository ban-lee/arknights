import pino from 'pino';

export const logger = pino({
  name: 'ban-tools',
  level: 'debug',
});
