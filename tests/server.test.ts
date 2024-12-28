import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import createServer from '../src/factory';

let server: ReturnType<typeof createServer>;

beforeAll(() => {
  server = createServer();
});

describe('Health route', () => {
  it('health route is running', async (): Promise<void> => {
    const response = await request(server['app']).get('/health');

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      message: 'Server is listening and running!',
      status: 200,
      success: true,
    });
  });
});
