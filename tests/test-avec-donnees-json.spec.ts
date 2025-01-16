import { test, expect } from '@playwright/test';

// Utiliser `require` pour charger le fichier JSON
import data from './utilisateur.json'; // Charger les données utilisateur


test.describe('Remplissage dynamique du formulaire Campus France', () => {
  // Parcourir chaque jeu de données du fichier JSON
  for (const userData of data) {
    test(`Formulaire pour ${userData.nom} ${userData.prenom}`, async ({ page }) => {
      await page.goto('https://www.campusfrance.org/fr/user/register');
      
      // Remplir les champs du formulaire avec les données JSON
      await page.getByPlaceholder('monadresse@domaine.com').fill(userData.email);
      await page.getByRole('textbox', { name: 'Mon mot de passe*' }).fill(userData.password);
      await page.getByLabel('Confirmer le mot de passe').fill(userData.confirmPassword);
      await page.locator(`#edit-field-civilite div:has-text("${userData.civilite}")`).click();
      await page.getByLabel('Nom', { exact: true }).fill(userData.nom);
      await page.getByLabel('Prénom').fill(userData.prenom);
      await page.locator('div').filter({ hasText: /^- Choisir une valeur -$/ }).nth(1).click();
      await page.locator(`#edit-field-pays-concernes-wrapper div:has-text("${userData.pays}")`).nth(0).click();
      await page.getByLabel('Code postal').fill(userData.codePostal);
      await page.getByLabel('Ville').fill(userData.ville);
      await page.getByLabel('Téléphone').fill(userData.telephone);

  // Sélectionner le domaine d'études
         // Sélectionner le public cible
       await page.locator('//*[@id="edit-field-publics-cibles"]/div[1]/label').click();

        // Ouvrir le dropdown du domaine d’études
       await page.locator('//*[@id="edit-field-domaine-etudes-wrapper"]/div/div/div[1]/div').click();

         // Sélectionner le domaine d’études dynamique
           const domaineXPath = `//*[@id="edit-field-domaine-etudes-wrapper"]//div[normalize-space(text())="${userData.domaineEtudes}"]`;
           await page.locator(domaineXPath).click();

  // Sélectionner le niveau d'études
      // Ouvrir le dropdown des niveaux d’étude
          await page.locator('//*[@id="edit-field-niveaux-etude-wrapper"]/div/div/div[1]/div').click();

      // Sélectionner le niveau d’étude dynamique
         const niveauXPath = `//*[@id="edit-field-niveaux-etude-wrapper"]//div[normalize-space(text())="${userData.niveauEtudes}"]`;
         await page.locator(niveauXPath).waitFor({ state: 'visible' });
         await page.locator(niveauXPath).click();


      // Accepter les conditions générales
      await page.getByText('J’accepte que mes données').click();

      // Vérifier que le bouton "Créer un compte" est présent
      await expect(page.locator('#edit-actions')).toContainText('Créer un compte');
    });
  }
});


