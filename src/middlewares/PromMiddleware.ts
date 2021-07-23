import * as client from "prom-client";
import httpContext from "express-http-context";
import {Request, Response, NextFunction} from "express";

const httpRequestTimer = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

const register = new client.Registry();
register.setDefaultLabels({
    app: 'nodejs-typeorm',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});
register.registerMetric(httpRequestTimer);

client.collectDefaultMetrics({register});


export function before(req: Request, res: Response, next: NextFunction) {
  const timer = httpRequestTimer.startTimer();
  httpContext.set('timer', timer);
  next();
}

export function after(req: Request, res: Response, next: NextFunction) {
  const timer = httpContext.get('timer');
  if (timer) {
    const route = req.baseUrl;
    timer({ route, code: res.status, method: req.method });
  }
  next();
}

export {
    httpRequestTimer,
    register
};