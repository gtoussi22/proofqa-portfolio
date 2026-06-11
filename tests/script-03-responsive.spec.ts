import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════
// Script 03 — Responsive mobile 375px
// ProofQA — Titimbe Forge
// Auteur : Ghislain TOUSSI KAMGA — QA Engineer ISTQB
// ═══════════════════════════════════════════════

const TARGET_URL = process.env.TARGET_URL || 'https://proofqa.io';

test('03 - Affichage mobile 375px correct', async ({ page }) => {

  // 1. Definir la taille d'ecran mobile 375px
  await page.setViewportSize({ width: 375, height: 812 });

  // 2. Charger la page
  await page.goto(TARGET_URL);

  // 3. Verifier que la page est visible
  await expect(page.locator('body')).toBeVisible();

  // 4. Verifier qu'il n'y a pas de scroll horizontal
  const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(395);

  // 5. Verifier que le contenu principal est visible
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.length).toBeGreaterThan(0);

  // 6. Screenshot mobile pour le rapport
  await page.screenshot({ 
    path: 'test-results/screenshot-mobile-375px.png',
    fullPage: false 
  });

});