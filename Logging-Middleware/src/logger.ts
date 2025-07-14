import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOG_API_URL = 'http://29.244.56.144/evaluation-service/logs';

type Stack = 'backend' | 'frontend';
type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type Package =
  | 'auth' | 'config' | 'middleware' | 'utils'
  | 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service'
  | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    const res = await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );

    // Optional: Print log success (only during dev)
    // console.log('Log sent:', res.data.message);
  } catch (error) {
    console.error('Log error:', error.message);
  }
}
