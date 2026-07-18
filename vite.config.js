import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), localApiPlugin()],
  };
});

function localApiPlugin() {
  return {
    name: 'clerify-local-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        const handler = await getApiHandler(pathname);

        if (!handler) {
          next();
          return;
        }

        try {
          request.body = await readJsonBody(request);
          await handler(request, createVercelLikeResponse(response));
        } catch (error) {
          if (!response.headersSent) {
            response.statusCode = error.status || 500;
            response.setHeader('Content-Type', 'application/json');
            response.end(
              JSON.stringify({
                error: {
                  message: error.message || 'The local API request failed.',
                },
              }),
            );
          }
        }
      });
    },
  };
}

async function getApiHandler(pathname) {
  if (pathname === '/api/audit') {
    return (await import('./api/audit.js')).default;
  }

  if (pathname === '/api/contact') {
    return (await import('./api/contact.js')).default;
  }

  return null;
}

function createVercelLikeResponse(response) {
  return {
    setHeader(name, value) {
      response.setHeader(name, value);
      return this;
    },
    status(code) {
      response.statusCode = code;
      return this;
    },
    json(payload) {
      if (!response.headersSent) {
        response.setHeader('Content-Type', 'application/json');
      }
      response.end(JSON.stringify(payload));
      return this;
    },
  };
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    if (!['POST', 'PUT', 'PATCH'].includes(request.method || '')) {
      resolve({});
      return;
    }

    let rawBody = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      rawBody += chunk;
    });
    request.on('end', () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(Object.assign(new Error('Invalid JSON request body.'), { status: 400 }));
      }
    });
    request.on('error', reject);
  });
}
