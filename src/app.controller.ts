// app.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Req() req: Request, @Res() res: Response): void {

    res.status(404).send(`
      <html>
        <head><title>Portfolio</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
          <img src="https://i.ibb.co/nNhsZ9n6/OBJECTS.png" alt="Portfolio Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
          <h1>Portfolio</h1>
          <h2 style="color: red;">Server is running</h2>
        </body>
      </html>
    `);
  }
}