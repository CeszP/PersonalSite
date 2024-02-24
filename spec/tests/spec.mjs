// import index from '../../scripts/index.js'
import { Repository, UI } from '../../scripts/index.js'
import puppeteer from 'puppeteer'

describe("Repository", () => {

    // Test cases for Repository class
    // Repository must be a class
    it("must be a class", () => {
        expect(typeof Repository.prototype.constructor).toBe("function")
    })

    // ...

})

// describe("UI class", () => {
//     //Preparing Puppeteer variables 
//     let browser, page

//     // Creates new browser and page
//     beforeAll(async () => {
//         browser = await puppeteer.launch()
//         page = await browser.newPage()

//         await page.goto('file:///C:/Users/cesar/OneDrive/Escritorio/HENRY/M1/PM1-CeszP/index.html')
//     })

//     afterAll(async () => {
//         await browser.close()
//     })

//     beforeEach(async () => {
//         await page.reload()
//     })

//     // Test cases
//     // Test fields cleared
//     it('should clear form fields', async () => {
//         // Fill in fields
//         await page.type('#name-input', 'Test name 1')
//         await page.type('#description-input', 'Test desc 1')
//         await page.type('#imgUrl-input', 'Test imgUrl 1')

//         // Wait for selectors
//         await page.waitForSelector('#name-input', { visible: true })
//         await page.waitForSelector('#description-input', { visible: true })
//         await page.waitForSelector('#imgUrl-input', { visible: true })

//         // Verify that fields are filled
//         const nameVal = await page.$eval('#name-input', input => input.value)
//         const descriptionVal = await page.$eval('#description-input', input => input.value)
//         const imgUrlVal = await page.$eval('#imgUrl-input', input => input.value)

//         expect(nameVal).toBe('Test name 1')
//         expect(descriptionVal).toBe('Test desc 1')
//         expect(imgUrlVal).toBe('Test imgUrl 1')

//         // Call UI method to clear form fields
//         await page.evaluate(() => UI.clearFormFields())

//         // Verify that fields are cleared
//         const clearedNameVal = await page.$eval('#name-input', input => input.value)
//         const clearedDescriptionVal = await page.$eval('#description-input', input => input.value)
//         const clearedImgUrlVal = await page.$eval('#imgUrl-input', input => input.value)

//         expect(clearedNameVal).toBe('')
//         expect(clearedDescriptionVal).toBe('')
//         expect(clearedImgUrlVal).toBe('')

//     })

//     // Test display activity HTML elements in DOM
//     it('should display activity in the DOM', async () => {
//         // Create a mock activity object
//         const mockActivity = {
//             id: 1,
//             title: 'Test Activity',
//             description: 'Test description',
//             imgUrl: 'http://test-image.com'
//         }

//         // Expose the mock activity to the browser context so we won't
//         // get error about not getting access to repo
//         await page.evaluate(activity => window.mockActivity = activity, mockActivity)

//         // Call the UI method to display the activity
//         await page.evaluate(activity => UI.displayActivity(activity), mockActivity)

//         // Wait for the activity to be rendered in the DOM
//         await page.waitForSelector(`#activity-${mockActivity.id}`)

//         // Verify that the activity is displayed correctly
//         const activityTitle = await page.$eval(`#activity-${mockActivity.id} .card-title`, title => title.textContent)
//         const activityDescription = await page.$eval(`#activity-${mockActivity.id} .card-desc`, desc => title.textContent)
//         const activityImage = await page.$eval(`activity-${mockActivity.id}`, div => div.style.backgroundImage)

//         expect(activityTitle).toBe('Test Activity')
//         expect(activityDescription).toBe('Test description')
//         expect(activityImage).toBe('http://test-image.com')

//     })
// })