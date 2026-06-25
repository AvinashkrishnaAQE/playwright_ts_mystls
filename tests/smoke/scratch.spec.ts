import { test, expect } from "@playwright/test";

test.describe("Abhibus Search Test", () => {
  // Ensure clean state for the test
  test.use({ storageState: { cookies: [], origins: [] } });

    test("should search for bus and select seats", async ({ page }) => {
    // Increase test timeout for this complex flow
    test.setTimeout(90000);

    // 1. Navigate to Abhibus
    await page.goto("https://www.abhibus.com/");

    // 2. Search for Leaving From: Hyderabad
    const leavingFromInput = page.getByPlaceholder("Leaving From");
    await leavingFromInput.click();
    await leavingFromInput.fill("Hyderabad");
    await page.getByRole("listitem").filter({ hasText: "Hyderabad" }).first().click();

    // 3. Search for Going To: Bangalore
    const goingToInput = page.getByPlaceholder("Going To");
    await goingToInput.click();
    await goingToInput.fill("Bangalore");
    await page.getByRole("listitem").filter({ hasText: "Bangalore" }).first().click();

    // 4. Departure Date July 1st 2026
    const departureInput = page.getByPlaceholder("Onward Journey Date");
    await departureInput.click();
    
    const nextMonthArrow = page.locator(".calender-month-change").last();
    await nextMonthArrow.click();
    await page.getByRole("button", { name: "1", exact: true }).click();

    // 5. Click Search
    await page.locator("a.btn-search").click();

    // 6. Verify text components on search results page
    await expect(page.locator("text=Sort by").first()).toBeVisible();
    await expect(page.locator("text=Showing").first()).toBeVisible();
    await expect(page.locator("text=Popular Filters").first()).toBeVisible();

    // 7. Scroll down and click Select Seats of Delta Transport Pvt Ltd
    const deltaBusCard = page
      .locator("div.card.service")
      .filter({ hasText: "Delta Transport Pvt Ltd" })
      .first();

    await deltaBusCard.scrollIntoViewIfNeeded();
    await deltaBusCard.getByRole("button", { name: "Select Seats" }).click();

    // Wait dynamically for the seat layout to open
    const seatU14 = page.locator('button.seat').nth(11);
    await seatU14.waitFor({ state: 'visible', timeout: 15000 });

    // 8. Select Seat U14
    await seatU14.click();

    // 9. Select Boarding Point: "Uppal Free Metro Rail Pick Up"
    const boardingPoint = page.getByText('Uppal Free Metro Rail Pick Up').first();
    await boardingPoint.waitFor({ state: 'visible', timeout: 5000 });
    await boardingPoint.click({ force: true });

    // 10. Select Dropping Point: "Hebbal"
    const droppingPoint = page.getByText('Hebbal').first();
    await droppingPoint.waitFor({ state: 'visible', timeout: 5000 });
    await droppingPoint.click({ force: true });

    // 11. Click Proceed
    const proceedButton = page.getByRole('button', { name: 'Proceed' });
    await proceedButton.click({ force: true });

    // 12. Skip Login Modal if it appears
    const skipButton = page.getByText('Skip').first();
    try {
      await skipButton.waitFor({ state: 'visible', timeout: 5000 });
      await skipButton.click();
    } catch (e) {
      console.log('Skip button not visible/found, proceeding...');
    }

    // 13. Assertions to verify we are on the passenger details page and seat U14 is selected
    await expect(page.locator('text=Passenger Details').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=U14').first()).toBeVisible({ timeout: 5000 });
  });
});
