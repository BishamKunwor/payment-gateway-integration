const CryptoJS = require("crypto-js");

export default function makeFonePayPayment() {
  const path = "https://clientapi.fonepay.com/";
  const params = {
    pid: "01-92",
    md: "@00",
    prn: "422",
    amt: 10.0,
    crn: "NPR",
    dt: "06/27/2018",
    r1: "recepit id",
    r2: "N/A",
    ru: "https://facebook.com",
    dv: "",
  };

  getDvHash(params);

  params.dv = getDvHash(params);

  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (let key in params) {
    const hiddenInputField = document.createElement("input");
    hiddenInputField.setAttribute("name", key);
    // @ts-ignore
    hiddenInputField.setAttribute("value", params[key]);
    form.appendChild(hiddenInputField);
  }
  document.body.appendChild(form);
  form.submit();
}

// This is the backend code
function getDvHash(params: any) {
  let stringConcat = "";
  for (let key in params) {
    if (key === "dv") {
      continue;
    }
    stringConcat = stringConcat.concat(params[key] + ",");
  }
  stringConcat = stringConcat.slice(0, -1);

  const hash = CryptoJS.HmacSHA512(
    "123,P,d1676960995145,30,NPR,04/19/2018,Hello,testing Direct Pay remarks,789,M,GLBBNPKA,20",
    "456"
  ).toString(CryptoJS.enc.Hex);
  console.log(hash);
  return hash;
}
