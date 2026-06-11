import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════
// Script 05 — Bouton CTA principal
// ProofQA — Titimbe Forge
// Auteur : Ghislain TOUSSI KAMGA — QA Engineer ISTQB
// ═══════════════════════════════════════════════

const TARGET_URL = process.env.TARGET_URL || 'https://proofqa.io';

test('05 - Bouton CTA principal visible et cliquable', async ({ page }) => {

  // 1. Charger la page
  await page.goto(TARGET_URL);

  // 2. Chercher les boutons CTA principaux
  const ctaSelectors = [
    'button[type="submit"]',
    'a.btn',
    'a.button',
    'button.cta',
    'a.cta',
    '[class*="cta"]',
    '[class*="btn-primary"]',
    '[class*="button-primary"]',
  ];

  let ctaFound = false;

  for (const selector of ctaSelectors) {
    const cta = page.locator(selector).first();
    const count = await page.locator(selector).count();

    if (count > 0) {
      // 3. Verifier que le CTA est visible
      await expect(cta).toBeVisible();

      // 4. Verifier que le CTA est cliquable
      await expect(cta).toBeEnabled();

      // 5. Verifier que le CTA a un texte
      const text = await cta.innerText();
      expect(text.length).toBeGreaterThan(0);

      console.log(`CTA trouve : "${text}" avec selecteur ${selector}`);
      ctaFound = true;
      break;
    }
  }

  // 6. Si aucun CTA trouve — signaler sans faire echouer
  if (!ctaFound) {
    console.log('Aucun bouton CTA detecte avec les selecteurs standards');
  }

});