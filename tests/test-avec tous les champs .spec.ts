import { test, expect } from '@playwright/test';

test.describe('Remplissage du formulaire Campus France', () => {

  test('Remplissage des informations du formulaire', async ({ page }) => {
    // Aller à la page du formulaire
    await page.goto('https://www.campusfrance.org/fr/user/register');
    await page.setViewportSize({ width: 1280, height: 720 });

    // Accepter les cookies
    await page.click('#tarteaucitronPersonalize2');

    // Remplir les champs du formulaire
    await page.locator('.username[id="edit-name"]').fill('salem.ensb18@gmail.com'); // Adresse e-mail
    await page.locator('.password-field[id="edit-pass-pass1"]').fill('Salem123!'); // Mot de passe
    await page.locator('.password-confirm[id="edit-pass-pass2"]').fill('Salem123!'); // Confirmation mot de passe
   
    // Cliquer sur la civilité en utilisant le label associé
    
    await page.locator('label[for="edit-field-civilite-mr"]').click();


    // Remplir le nom et prénom
    await page.locator('#edit-field-nom-0-value').fill('BOUDEBABA');
    await page.locator('#edit-field-prenom-0-value').fill('Salem');

    // Sélectionner le pays
    await page.locator('div input[id="edit-field-pays-concernes-selectized"]').click();
    await page.locator('div .option[data-value="78"]').click(); // Sélectionner la France


    // Remplir les autres informations
    
    const nationaliteInput = page.locator('#edit-field-nationalite-0-target-id');

    // Attendre que l'élément soit visible avant de le remplir
    await nationaliteInput.waitFor({ state: 'visible', timeout: 10000 });
    await nationaliteInput.fill('France');
    
    //await page.locator('#edit-field-nationalite-0-target-id').fill('France');
    await page.locator('#ui-id-4').click();
    await page.locator('#edit-field-code-postal-0-value').fill('75014');
    await page.locator('#edit-field-ville-0-value').fill('Paris');
    await page.locator('#edit-field-telephone-0-value').fill('0619126148');

// Sélectionner l'étudiant
const etudiant = page.locator('#edit-field-publics-cibles-2');

// Faire défiler l'élément dans la vue (si nécessaire)
await etudiant.scrollIntoViewIfNeeded();

// Attendre que l'élément soit cliquable et cliquer dessus
await etudiant.click({ force: true });

// Sélectionner le domaine
const domaine = page.locator('xpath=//body/div[2]/div[2]/main[1]/div[2]/div[1]/div[2]/form[1]/div[4]/div[2]/div[1]/div[1]/div[1]/div[1]');
await domaine.click();

// Sélectionner l'option du domaine
// 2. Attendre que l'option soit visible (en utilisant waitFor ou un autre mécanisme)
await page.locator('div .option[data-value="1238"]').waitFor({ state: 'visible', timeout: 5000 });


// Accepter les conditions générales

// Utilisation de JavaScript pour cliquer directement sur l'élément
await page.evaluate(() => {
  const accepterConditions = document.querySelector('#edit-field-accepte-communications-value');
  // Vérifier que l'élément existe et est de type HTMLElement avant d'appeler click()
  if (accepterConditions instanceof HTMLElement) {
    accepterConditions.click();
  }
});



});
 
})