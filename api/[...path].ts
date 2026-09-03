import app from '../server';

export default async function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'API function failed',
      message: error?.message || String(error),
    }));
  }
}
