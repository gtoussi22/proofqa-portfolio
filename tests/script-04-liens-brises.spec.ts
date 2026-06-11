import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════
// Script 04 — Detection liens brises
// ProofQA — Titimbe Forge
// Auteur : Ghislain TOUSSI KAMGA — QA Engineer ISTQB
// ═══════════════════════════════════════════════

const TARGET_URL = process.env.TARGET_URL || 'https://proofqa.io';

test('04 - Aucun lien brise critique detecte', async ({ page }) => {

  // 1. Charger la page
  await page.goto(TARGET_URL);

  // 2. Recuperer tous les liens de la page
  const links = await page.locator('a[href]').all();
  console.log(`Nombre de liens trouves : ${links.length}`);

  // 3. Verifier les 20 premiers liens
  let brokenLinks: string[] = [];

  for (const link of links.slice(0, 20)) {
    const href = await link.getAttribute('href');

    // Ne tester que les liens HTTP absolus
    if (href && href.startsWith('http')) {
      try {
        const response = await page.request.get(href);
        if (response.status() >= 400) {
          brokenLinks.push(`${href} → ${response.status()}`);
        }
      } catch (error) {
        console.log(`Lien inaccessible : ${href}`);
      }
    }
  }

  // 4. Afficher les liens brises trouves
  if (brokenLinks.length > 0) {
    console.log('Liens brises detectes :');
    brokenLinks.forEach(link => console.log(`  - ${link}`));
  }

  // 5. Le test echoue si des liens brises sont trouves
  expect(brokenLinks.length).toBe(0);

});