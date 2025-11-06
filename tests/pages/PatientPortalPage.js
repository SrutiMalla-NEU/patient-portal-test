class PatientPortalPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.heading = page.locator('h1');
    this.patientNameInput = page.locator('#patientName');
    this.addPatientButton = page.locator('button:has-text("Add Patient")');
    this.patientList = page.locator('.patient');
  }

  async goto() {
    const path = require('path');
    const filePath = 'file://' + path.resolve(__dirname, '../../index.html');
    await this.page.goto(filePath);
  }

  async addPatient(name) {
    await this.patientNameInput.fill(name);
    await this.addPatientButton.click();
  }

  async getPatientCount() {
    return await this.patientList.count();
  }

  async getHeadingText() {
    return await this.heading.textContent();
  }

  async isPatientDisplayed(name) {
    const patient = this.page.locator('.patient', { hasText: name });
    return await patient.isVisible();
  }
}

module.exports = PatientPortalPage;