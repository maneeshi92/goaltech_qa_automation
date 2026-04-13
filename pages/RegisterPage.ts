import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;

  // OTP Locators
  readonly otpScreen: Locator;
  readonly otpInputs: Locator;
  readonly verifyOtpBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#reg-name');
    this.phoneInput = page.locator('#reg-phone');
    this.emailInput = page.locator('#reg-email');
    this.passwordInput = page.locator('#reg-password');
    this.confirmPasswordInput = page.locator('#reg-confirm-password');
    this.submitButton = page.locator('#reg-submit-btn');

    this.otpScreen = page.locator('#otp-screen');
    this.otpInputs = page.locator('.otp-input');
    this.verifyOtpBtn = page.locator('#verify-otp-btn');
  }

  async fillRegistrationDetails(name: string, phone: string, email: string, pass: string) {
    await expect(this.nameInput.first()).toBeVisible({ timeout: 10000 });
    await this.nameInput.first().fill(name);
    await this.phoneInput.first().fill(phone);
    await this.emailInput.first().fill(email);
    await this.passwordInput.first().fill(pass);
    await this.confirmPasswordInput.first().fill(pass); // Password match
  }

  async submitRegistration() {
    await this.submitButton.first().click();
  }

  async waitForOtpScreen() {
    await expect(this.otpScreen).toBeVisible({ timeout: 15000 });
  }

  async fillOtpAndVerify(otpCode: string = '123456') {
    // Fill the 6 visual boxes dynamically
    const otpArray = otpCode.split('');
    const inputBoxes = await this.otpInputs.all();
    
    for (let i = 0; i < inputBoxes.length; i++) {
        await inputBoxes[i].fill(otpArray[i]);
    }
    
    await this.verifyOtpBtn.first().click();
    await this.page.waitForLoadState('networkidle');
  }
}
