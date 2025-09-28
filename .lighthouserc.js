module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'], // Replace with your actual deployed URL in CI
      startServerCommand: 'npm run start',
      startServerReadyTimeout: 10000,
    },
    assert: {
      assertions: {
        'categories.performance': ['warn', { minScore: 0.8 }],
        'categories.accessibility': ['error', { minScore: 0.9 }],
        'categories.best-practices': ['warn', { minScore: 0.8 }],
        'categories.seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
