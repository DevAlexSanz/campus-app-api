import { startServer } from './factory';

(() => {
  try {
    startServer();
  } catch (error) {
    console.error('Failed to start application:', error);

    process.exit(1);
  }
})();
