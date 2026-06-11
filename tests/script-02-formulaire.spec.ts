import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════
// Script 02 — Remplissage formulaire automatique
// ProofQA — Titimbe Forge
// Auteur : Ghislain TOUSSI KAMGA — QA Engineer ISTQB
// ═══════════════════════════════════════════════

const TARGET_URL = process.env.TARGET_URL || 'https://proofqa.io';

test('02 - Remplissage formulaire automatique', async ({ page }) => {

  // 1. Charger la page
  await page.goto(TARGET_URL);

  // 2. Trouver tous les formulaires sur la page
  const forms = await page.locator('form').all();

  // 3. Si aucun formulaire — le test passe quand meme
  if (forms.length === 0) {
    console.log('Aucun formulaire trouve sur cette page');
    return;
  }

  // 4. Remplir chaque formulaire trouve
  for (const form of forms) {
    const inputs = await form.locator(
      'input[type="text"], input[type="email"], input[type="tel"], textarea'
    ).all();

    for (const input of inputs) {
      const type = await input.getAttribute('type');
      const name = (await input.getAttribute('name')) || '';

      if (type === 'email' || name.includes('email')) {
        await input.fill('test@proofqa.io');
      } else if (name.includes('phone') || name.includes('tel')) {
        await input.fill('+237600000000');
      } else if (name.includes('name') || name.includes('nom')) {
        await input.fill('Test ProofQA');
      } else {
        await input.fill('Test ProofQA');
      }
    }

    // 5. Verifier que le bouton submit existe et est cliquable
    const submitBtn = form.locator(
      'button[type="submit"], input[type="submit"]'
    );
    if (await submitBtn.count() > 0) {
      await expect(submitBtn.first()).toBeVisible();
      await expect(submitBtn.first()).toBeEnabled();
    }
  }

});