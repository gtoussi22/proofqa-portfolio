 
import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════
// Script 01 — Chargement de page
// ProofQA — Titimbe Forge
// Auteur : Ghislain TOUSSI KAMGA — QA Engineer ISTQB
// ═══════════════════════════════════════════════

const TARGET_URL = process.env.TARGET_URL || 'https://proofqa.io';

test('01 - La page principale charge sans erreur', async ({ page }) => {

  // 1. Charger la page
  const response = await page.goto(TARGET_URL);

  // 2. Verifier que le statut HTTP est inferieur a 400
  expect(response?.status()).toBeLessThan(400);

  // 3. Verifier que la page a un titre
  await expect(page).toHaveTitle(/.+/);

  // 4. Verifier que la page n'est pas vide
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.length).toBeGreaterThan(0);

});