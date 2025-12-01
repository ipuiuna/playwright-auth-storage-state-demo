import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/loginpage';
import { registerUser } from '@datafactory/register';
import { createMessage } from '@datafactory/createMessage';
import { MessagesPage } from '@pages/account/messages.page';
import path from 'path';

test('Should create a new user and send a message to support and conffirms that message is displayed correctly', async ({
  page,
  context,
}) => {
  const timestamp = Date.now();
  const email = `newuser${timestamp}@test.com`;
  const password = '123@Da12551';
  const dropdownOptions = 'payments';
  const message =
    'This is a really long message that goes on an on for at least 50 characters';
  const messageUserAuthFile = path.join(
    process.cwd(),
    '.auth',
    'messageUser.json'
  );
  await test.step('create new user', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await registerUser(email, password);
    await loginPage.login(email, password);
    await expect(loginPage.page).toHaveURL(/account/);
    // await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    //   'Test User'
    // );
    await expect(
      page.evaluate(() => localStorage.getItem('auth-token'))
    ).not.toBeNull();
    await context.storageState({ path: messageUserAuthFile });
  });

  await test.step('Creating a message', async () => {
    await createMessage('Testy Mctesterface', message, dropdownOptions);
  });
  await test.step('Verify the existency of the message', async () => {
    const messagesPage = new MessagesPage(page);
    await messagesPage.goto();
    await expect(messagesPage.table).toContainText(message.substring(0, 25));
    await expect(messagesPage.table).toContainText(dropdownOptions);

    await messagesPage.firstDetailLink.click();
    await expect(messagesPage.messagesList).toContainText(message);
  });
});
