import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { By, Key, Builder, until } from 'selenium-webdriver'

describe('Web App', () => {
  let driver

  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  it('can be accessed via google chrome', async () => {
    await driver.get('https://rankmywriting-f6d01.web.app/')
    const text = await driver.findElement(By.tagName('h3')).getText()
    expect(text).toBe('Wondering if your writing is good enough?')
  })

  it('does not crash when receiving wrong input', async () => {
    await driver.get('https://rankmywriting-f6d01.web.app/login')
    await driver.findElement(By.id('username')).sendKeys('uoensthuoenuhoesntuht')
    await driver.findElement(By.id('password')).sendKeys('unstoehurc l @#$@#$@')
    await driver.findElement(By.tagName('button')).click()

    await driver.wait(until.elementLocated(By.id('notistack-snackbar')), 1 * 1000)
    const text = await driver.findElement(By.id('notistack-snackbar')).getText()
    expect(text).toBe('Invalid login credentials.')
  })

  it("should show a snackbar clarifying why the registration didn't succeed", async () => {
    await driver.get('https://rankmywriting-f6d01.web.app/register')
    await driver.findElement(By.id('username')).sendKeys('uoensthuoenuhoesntuht')
    await driver.findElement(By.id('password')).sendKeys('uns')
    await driver.findElement(By.tagName('button')).click()

    await driver.wait(until.elementLocated(By.id('notistack-snackbar')), 1 * 1000)
    const text = await driver.findElement(By.id('notistack-snackbar')).getText()
    expect(text).toBe('The password must consist of at least 8 characters.')
  })
})
