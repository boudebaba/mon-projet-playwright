import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests', // Répertoire des fichiers de test
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]], // Utilisation de "list" pour la console et "html" pour un rapport détaillé

  use: {
    baseURL: 'https://www.campusfrance.org/fr', // URL de base
    headless: true, // Exécution en mode sans interface graphique
    viewport: { width: 1280, height: 720 }, // Résolution par défaut
    trace: 'on-first-retry', // Capture des traces au premier échec
    screenshot: 'only-on-failure', // Capture d'écran uniquement en cas d'échec
    actionTimeout: 15000, // Délai maximal pour les actions individuelles
    video: 'retain-on-failure', // Capturer une vidéo si le test échoue
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome (Samsung Galaxy S20)',
      use: { ...devices['Galaxy S20'] }, // Samsung Galaxy
    },
    {
      name: 'Edge Mobile (Surface Duo)',
      use: { ...devices['Surface Duo'] }, // Nom du projet de test, indiquant qu'il cible Edge Mobile sur un Surface Duo.
    },
  ],

});