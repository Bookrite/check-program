
document.getElementById('save').addEventListener("click", save)

//document.getElementById('checkNumber').value = 1

document.getElementById('checkNumber').addEventListener('change' , ()=>{
  const num = document.getElementById('checkNumber').value 
  document.getElementById('checkNumberFoter').textContent =`o${num}o` 
})




async function save() {
  let payToValue = document.getElementById('payTo2').value
  let amountValue = document.getElementById('test').value.substring(1)
  let checkNumberValue = document.getElementById('checkNumber').value

  const payTo = payToValue
  const amount = amountValue
  const checkNumber = checkNumberValue
  const result = await fetch(`http://localhost:3000/bank?id=${document.getElementById("bank").value}`)
  const id = await result.json()
  const bankId = id[0].id

  try {
    await fetch('http://localhost:3000/checks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payTo: payTo,
        amount: amount,
        checkNumber: checkNumber,
        bankId: bankId
      })
    });
    
     } catch (error) {
    alert(`err acord check was not saved`)
  }
await printDiv('check')
document.getElementById('payTo2').value = null
document.getElementById('test').value = null
document.getElementById('checkNumber').value = Number(checkNumberValue) + 1
document.getElementById('amauntAsText').textContent = null



}












async function printDiv(divId) {
  document.getElementById('bank').style.border = "0px"
  document.getElementById('bank').style.appearance = 'none';


  let originalDiv = document.getElementById(divId).cloneNode(true);
  let originalSelects = document.getElementById(divId).getElementsByTagName('select');

  let clonedSelects = originalDiv.getElementsByTagName('select');
  console.log(clonedSelects)
  console.log(originalSelects)
  for (let i = 0; i < originalSelects.length; i++) {

    clonedSelects[i].selectedIndex = originalSelects[i].selectedIndex;
  }
  // Create a new window for printing
  let printWindow = window.open();
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Print</title><link rel="stylesheet" href="styles/style.css"/></head><body></body></html>');
  // Write the content of the cloned div to the new window
  //for( let i = 0 ; i < chackq ; i++){
  printWindow.document.body.appendChild(originalDiv/*.cloneNode(true));}*/)
  printWindow.document.close();

  printWindow.onload = function () {
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 0.1); // Adjust the delay as needed
  };




}

function printMultipleChecks() {
  document.getElementById('pop-up').style.display = 'block'
}
function downloadPdf() {

  var element = document.getElementById('check');
  var opt = {
    margin: 5,
    filename: 'myfile.pdf',
    image: { type: 'pdf', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();

}


function printMultiple(divId) {
  let chackq = prompt('?')

  // Get the original div
  let originalDiv = document.getElementById(divId).cloneNode(true);
  // Create a new window for printing
  let printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Print</title><link rel="stylesheet" href="styles/style.css"/></head><body></body></html>');
  // Write the content of the cloned div to the new window
  for (let i = 0; i < chackq; i++) {
    printWindow.document.body.appendChild(originalDiv.cloneNode(true));
  }
  printWindow.document.close();

  printWindow.onload = function () {
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 0.1); // Adjust the delay as needed
  };
}



function DownloadAsPDF() {
  window.jsPDF = window.jspdf.jsPDF;
  function generatePdf() {
    const customSize = [8.2 * 72, 11.8 * 72];
    let jsPdf = new jsPDF({

      unit: 'pt', // Set unit to points
      format: customSize
    })// Set custom size);
    var htmlElement = document.getElementById('check');

    const opt = {

      margin: [0, 0, 0, 1],

      callback: function (jsPdf) {


        jsPdf.save("Test.pdf");

      },


      html2canvas: {

        allowTaint: true,
        dpi: 300,
        letterRendering: true,
        logging: false,
        scale: .75
      }
    };

    jsPdf.html(htmlElement, opt);
  } generatePdf()
}




async function getBankNickNames() {
  const res = await fetch('http://localhost:3000/accounts')
  const BankNickNames = await res.json()
  let dropDown = document.getElementById('bank')

  while (dropDown.options.length > 2) {
    dropDown.remove(2);
  }
  for (NickName of BankNickNames) {
    let option = document.createElement('option')
    option.value = NickName
    option.textContent = NickName
    dropDown.appendChild(option)
  }
}
getBankNickNames()

async function hendelBankDropDown() {
  document.querySelector('.check-number').style.display = "block"
  const getEl = (id) => { return document.getElementById(id) }
  let accountNumber = getEl('accountNumber')
  let routingNumber = getEl('routingNumber')
  let name = getEl('text-area')
  let bankName = getEl('bank')
  let checkNumber = getEl('checkNumber')
  let checkNumberFoter = getEl('checkNumberFoter')

  let selectedValue = document.getElementById("bank").value;

  if (selectedValue === "addNew") {
    document.getElementById("addBank").style.display = "block"
  } else if (selectedValue !== "default") {
    let result = await fetch(`http://localhost:3000/bank?id=${selectedValue}`, {
      "method": "get"
    })
    let bank = await result.json()
    console.log(bank[0])
    accountNumber.textContent = bank[0].account_number + "o"
    routingNumber.textContent = `t${bank[0].routing_number}t`
    name.value = bank[0].name

    checkNumber.value = await getLatestCheckNumber(bank[0].id) != null ? await getLatestCheckNumber(bank[0].id) : 1000
    checkNumberFoter.textContent = `o${checkNumber.value}o`
  }
}

async function test(event) {
  event.preventDefault()
  const getValue = (id) => { let value = document.getElementById(id).value; return value }



  const bankInfo = {
    bankName: getValue('bankName'),
    bankNickname: getValue('bankNickname'),
    name: getValue('name'),
    accountNumber: getValue('accountNumber2'),
    routingNumber: getValue('routingNumber2')
  }
  const req = JSON.stringify(bankInfo)

  console.log(bankInfo)
  const result = await fetch('http://localhost:3000/bank', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bankInfo)
  })
  console.log(result)
  await getBankNickNames()
  document.getElementById("bank").selectedIndex = 0;
  document.getElementById("bankForm").reset();

  hideAddBankForm()


}
function hideAddBankForm() {
  document.getElementById('addBank').style.display = "none"
  document.getElementById("bank").selectedIndex = 0;
}


async function getLatestCheckNumber(bankId) {


  const response = await fetch(`http://localhost:3000/latest?number=${bankId}`);
  const latestCheckNumber = await response.json();
  console.log(typeof (latestCheckNumber))
  return latestCheckNumber.check_number + 1;
}
