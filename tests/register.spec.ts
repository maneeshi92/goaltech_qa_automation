import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('GoalTech Registration Flow POM', () => {
  let landingPage: LandingPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    registerPage = new RegisterPage(page);
    await landingPage.goto();
  });

  test('Should successfully register a new user using valid details and OTP', async ({ page }) => {
    // The default view on Goaltech is usually the Register Screen, we don't need to click anything to see it
    
    // Generate a random email so the validation doesn't fail on "email already exists"
    const randomStamp = Math.floor(Math.random() * 10000);
    const uniqueEmail = `testuser${randomStamp}@automationqa.com`;

    // 1. Fill out the full registration form
    await registerPage.fillRegistrationDetails(
        'QA Automation User', 
        '9876543210', 
        uniqueEmail, 
        'DataB1ade7@@'
    );

    // 2. Submit the form
    await registerPage.submitRegistration();

    // 3. Wait for smooth transition to OTP screen
    await registerPage.waitForOtpScreen();

    // 4. Fill OTP and Verify
    await registerPage.fillOtpAndVerify('123456');

    // 5. Assert successful redirection to the secure Dashboard
    await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 15000 });
  });

});
