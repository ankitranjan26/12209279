import axios from 'axios';

const LOG_URL = 'http://29.244.56.144/evaluation-service/logs';

export async function Log(
  stack: 'frontend',
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  pkg: 'component' | 'page' | 'hook' | 'state' | 'style' | 'api' | 'auth' | 'config' | 'middleware' | 'utils',
  message: string
) {
  try {
    await axios.post(LOG_URL, {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
      }
    });
  } catch (err) {
    console.error('Logging failed:', err);
  }
}
