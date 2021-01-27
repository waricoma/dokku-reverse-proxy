'use strict';

import { createServer, request, Server, IncomingMessage, ServerResponse } from 'http';

export class ReverseProxy {
  private server: Server;
  private customPath: string;
  private targetHost: string;
  private targetPort: number;

  public setCustomPath(customPath: string): void {
    this.customPath = customPath;
  }

  public setTargetHost(targetHost: string): void {
    this.targetHost = targetHost;
  }

  public setTargetPort(targetPort: number): void {
    this.targetPort = targetPort;
  }

  public getCustomPath(): string {
    return this.customPath;
  }

  public getTargetHost(): string {
    return this.targetHost;
  }

  public getTargetPort(): number {
    return this.targetPort;
  }

  constructor(ops: { customPath?: string; targetHost?: string; targetPort?: number }) {
    this.customPath = ops.customPath || '';
    this.targetHost = ops.targetHost || '127.0.0.1';
    this.targetPort = ops.targetPort || 3000;

    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const targetReq = request({
        host: this.targetHost,
        port: this.targetPort,
        method: req.method,
        path: this.customPath + req.url,
        headers: req.headers,
      })
        .on('error', () => res.writeHead(502).end())
        .on('timeout', () => res.writeHead(504).end())
        .on('response', (targetRes) => {
          res.writeHead(targetRes.statusCode, targetRes.headers);
          targetRes.pipe(res);
        });
      req.pipe(targetReq);
    });
  }

  public listen(port?: number): void {
    this.server.listen(port || 5000, () => console.log('listening on port: ' + (port || 5000)));
  }
}
