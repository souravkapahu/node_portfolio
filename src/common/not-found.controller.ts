import { Request, Response, NextFunction } from 'express';

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).send(`
    <html>
      <head><title>404 - Not Found</title></head>
      <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <img src="https://i.ibb.co/nNhsZ9n6/OBJECTS.png" alt="Portfolio Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p><strong>Portfolio</strong> - The page "${req.url}" doesn't exist.</p>
      </body>
    </html>
  `);
}