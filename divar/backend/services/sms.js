async function sendSMS({ toNum, code, pattern }) {
  //! temporary
  return 

    const url = "http://ippanel.com/api/select";
    const requestBody = {
      op: "pattern",
      user: process.env.SMS_UNAME,
      pass: process.env.SMS_PASSWORD,
      fromNum: process.env.SMS_FROM,
      toNum: toNum,
      patternCode: pattern,
      inputData: [{ "verification-code": code }],
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody;
    } else {
      return { Error: response.statusText };
    }
  }
  
  module.exports = { sendSMS };
  