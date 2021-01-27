'use strict';

import { ReverseProxy } from './lib/reverse-proxy';

new ReverseProxy({
  customPath: process.env.CUSTOM_PATH,
  targetHost: process.env.TARGET_HOST,
  targetPort: parseInt(process.env.TARGET_PORT || '3000'),
}).listen();
