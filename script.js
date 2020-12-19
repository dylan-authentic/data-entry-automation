const puppeteer = require('puppeteer');
const readXFile = require('read-excel-file/node');
const chalk = require('chalk');

const lib = require('./lib');

const webpage = process.env.URL;
const excelFile = process.env.PATH_TO_EXCEL;
const { log, error: logError } = console;

let browser;
let page;
const skipped = [];

const browserOptions = {
    headless: false,
    slowMo: 100
}

const openBrowser = async () => {
    log(chalk.yellow.bold("Opening Browser..."));
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto(webpage, { waitUntil: "domcontentloaded" });

    browser.on('targetchanged', async () => {
        log(chalk.yellow.bold("URL has changed to new target..."));
        log(chalk.cyan('URL: ', page.url()));
    });
    
    browser.on('targetcreated', () => {
        log(chalk.yellow.bold("New target has been created in browser..."));
        log(chalk.cyan('URL: ', page.url()));
    });
    
    browser.on('disconnected', () => {
        log(chalk.yellow.bold("Browser has been disconnected..."));
        log(chalk.blue.bold("Skipped Items: ", skipped));
    });
}

const getFormElements = async () => {
    log(chalk.yellow.bold("Retrieving form elements..."));
    try {
       return await Promise.all(
           lib.elementIds.map(async (id) => {
               await page.$(id);
           })
        ).then((values) => {
            return lib.createElementArray(values);
        });
    }
    catch(err) {
        logError(chalk.yellow.bgRed.bold("Error getting form elements: "), err);
    }
}

const openDataFile = async () => {
    try {
        log(chalk.yellow.bold("Importing data file..."));
        return await readXFile(excelFile);
    }
    catch(err) {
        logError(chalk.yellow.bgRed.bold("Error importing data file: "), err);
    }
}

const inputFormValues = async () => {
    let formElements = await getFormElements();
    const rows = await openDataFile();
    log(chalk.yellow.bold("Inputting form values..."));
    for (const row in rows) {
        log(chalk.green.bgWhite.underline(row));
        if(row === '0') continue;
        // if(rows[row][6].length > 40 || (rows[row][7] !== null && rows[row][7].length > 40)) {
        //     log(chalk.bgMagenta.bold("Skipping item ", rows[row][13]));
        //     skipped.push(rows[row][13]);
        //     continue;
        // }
        await Promise.all(
            formElements.map(async (item, i) => {
                if(item.name === 'passwordElement' || item.name === 'passwordConfirmElement') {
                    await setValue(page, item.e, process.env.PASSWORD_ELEMENT)
                }
                else if(item.name === 'judicialDeptElement') {
                    await setValue(page, item.e, lib.switchJudicialValue(rows[row][i]));
                }
                else if(item.name !== 'submitButton') {
                    let val = rows[row][i];                    
                    if(item.name === 'firstNameElement' || item.name === 'middleNameElement' || item.name === 'lastNameElement' || item.name === 'suffixElement') {
                        if(val !== null) {
                            val = lib.capitalizeFirstLetter(val);
                        }
                    }
                    if(item.name === 'emailElement') {
                        val = val.toLowerCase();
                    }
                    log(item.name, val);
                    await setValue(page, item.e, val);
                }      
            })
        ).then(async () => {
            const submitBtnIndex = formElements.length-1;
            await submitPage(formElements[submitBtnIndex].e).then(() => {
                formElements = await getFormElements();
            })
        });
    }
}

async function setValue(page, element, column) {
    if(element === null) return;
    if(column === null || column === '""') column = '';
    try {
        await page.evaluate((e, col) => {
            e.value = col
        }, element, column);
    }
    catch(err) {
        logError(chalk.yellow.bgRed.bold("Error setting values: "), err);
    }
}

async function submitPage(submitButton) {
    try {
        log(chalk.yellow.bold("Submitting form..."));
        await Promise.all([
            page.waitForNavigation({ timeout: 60000 }),
            await submitButton.click()
        ]);
        log(chalk.yellow.bold("Form successfully submitted..."));
        log(chalk.yellow.bold("Signing out..."));
        await Promise.all([
            page.waitForNavigation(),
            await page.evaluate(() => {
                document.getElementById('ctl01_LoginStatus1').click()
            })
        ]);
        await page.goto(webpage, { waitUntil: "domcontentloaded" });
        log(chalk.cyan('URL: ', page.url()));
    }
    catch(err) {
        logError(chalk.yellow.bgRed.bold("Error submitting form: "), err)
    }
}

async function runTask() {
    log(chalk.yellow.bold("Starting task..."));
    await openBrowser();
    await inputFormValues();
    log(chalk.yellow.bold("Closing browser..."));
    await browser.close();
}

runTask();