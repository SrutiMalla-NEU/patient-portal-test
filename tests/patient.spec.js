const { test, expect } = require('@playwright/test');
const PatientPortalPage = require('./pages/PatientPortalPage');

test.describe('Patient Portal Tests', () => {
  let patientPortal;

  test.beforeEach(async ({ page }) => {
    patientPortal = new PatientPortalPage(page);
    await patientPortal.goto();
  });

  test('should load homepage with correct title', async () => {
    const heading = await patientPortal.getHeadingText();
    expect(heading).toContain('Patient Portal');
  });

  test('should add a patient', async () => {
    await patientPortal.addPatient('John Doe');
    
    const isDisplayed = await patientPortal.isPatientDisplayed('John Doe');
    expect(isDisplayed).toBeTruthy();
  });

  test('should add multiple patients', async () => {
    await patientPortal.addPatient('Alice Smith');
    await patientPortal.addPatient('Bob Johnson');
    
    const count = await patientPortal.getPatientCount();
    expect(count).toBe(2);
  });

  test('should clear input after adding patient', async () => {
    await patientPortal.addPatient('Jane Doe');
    
    const inputValue = await patientPortal.patientNameInput.inputValue();
    expect(inputValue).toBe('');
  });
});