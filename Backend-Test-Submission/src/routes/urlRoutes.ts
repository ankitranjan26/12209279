import { Router } from 'express';
import { shortenUrl, resolveShortUrl, getStats } from '../controllers/urlController';

const router = Router();

router.post('/shorten', shortenUrl);
router.get('/resolve/:code', resolveShortUrl);
router.get('/stats', getStats);

export default router;
