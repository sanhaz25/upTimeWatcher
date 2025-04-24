// Monitoring of urls

const fs = require('fs');
let urlsToMonitor = require('./urls.json');
const { sendMail } = require('./sendmail');

let statusCode = -1;

// setInterval(monitor(urlsToMonitor),3000);
function startMonitoring() {
    setInterval(function () {
        monitor(urlsToMonitor);
    }, 15000);
}

function monitor(urlsArray) {
    //iterate over the urlsToMonitor array and perform ping function
    urlsArray.forEach(element => {
        console.log(element.caller);
        const statusPrev = element.status;
        console.log(statusPrev);
        ping(element.caller).then(result => {
            statusCode = result.status;
            console.log(statusCode);
            if (statusCode === 200) {
               // console.log("running 200 ...");
                element.status = "up";
                element.lastChecked = result.checkedTime;
                element.responseTime = result.responseTime;
            } else {
               // console.log("running !200 ...");
                element.status = "down";
                if(statusPrev !== "down") {
                    sendMail();
                }
                element.lastChecked = result.checkedTime;
                element.responseTime = result.responseTime;
            }
        })
    });
    fs.writeFileSync('urls.json', JSON.stringify(urlsArray));
}

async function ping(url) {
    const startTime = Date.now();
    const checkedTime = new Date().toLocaleString();
    try {
        const response = await fetch(url, {
          method: 'GET',
          //mode: 'no-cors', 
          // 'no-cors' hides the response. Not good for monitoring.
          // You're running in Node.js, not a browser, so you’re not really restricted by CORS.
          // But when using libraries like fetch that simulate browser behavior, you can run into it.
        });
        const endTime = Date.now();
        const responseTime = (endTime - startTime)/1000;
        //return { status: response.status };
        return { status: response.status, checkedTime, responseTime };
    } 
    catch (error) {
        const endTime = Date.now();
        const responseTime = (endTime - startTime)/1000;
        //return {status: 0}
        return {status: 0, checkedTime, responseTime}
    }
}

module.exports = {
    startMonitoring
};