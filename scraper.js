
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const db = require('./db');

console.log("xzxzxzxzx");
const url = ("https://www.amazon.com/Apple-27-inch-display-8th-generation-processor/dp/B07Q1NBCVB/ref=sr_1_3?keywords=mac+27+inch&qid=1569001461&sr=8-3");
//just google my user agent to find user agent ID
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36";
const expectedPrice = 2000



async function main() {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': userAgent
        }
    });

    const html = response.data;
    const $ = cheerio.load(html);
    // copy the ID of the price element found if you go tot he page you want and inspect the element you want to find
    let newPriceElementText = $("#priceblock_ourprice").text();
    newPriceElementText = newPriceElementText.slice(1); // removes the $ sign
    newPriceElementText = newPriceElementText.replace(",", ""); // removes all the commas

    const newPrice = parseFloat(newPriceElementText);
    if (newPrice < expectedPrice) {
        await sendmail();

    }
    console.log(newPrice);
}

async function sendmail() {
    const user = "kelarcrisp@gmail.com";
    const pass = "ktmpwttczguzetuh";
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user,
            pass
        }
    });


    await transporter.sendMail({
        from: `"Kelar" <${user}>`,
        to: "kelcrisp007@icloud.com",
        subject: 'Hello',
        text: 'price fell!!!',
        html: `<b>The price of ${url} feel down!</b>` // html body
    });
    console.log("mail sent!")
}



//must have this main catch error
main().catch(console.error);