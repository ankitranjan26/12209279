import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOG_API_URL = 'http://29.244.56.144/evaluation-service/logs';

type Stack = 'backend' | 'frontend';
type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type Package =
  // Shared
  | 'auth' | 'config' | 'middleware' | 'utils'
  // Backend only
  | 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service'
  // Frontend only
  | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    const token = process.env.AUTH_TOKEN;

    if (!token) {
      console.error('Missing AUTH_TOKEN in environment variables');
      return;
    }

    await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    console.error('Log failed:', error.message);
  }
}
