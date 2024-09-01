/*function hide(id) {
  let bank ={};
  bank.name  = document.getElementById('name').value
  bank.bankName = document.getElementById('bn').value
  bank.accountNumber  = document.getElementById('an').value
  bank.routingNumber= document.getElementById('rn').value
  arrOfBanks.push(bank)
  console.log(arrOfBanks)
 document.getElementById(id).style.display = 'none'
  }

  function Show(id) {
    document.getElementById(id).style.display = 'block'
    }
    let arrOfBanks = [{
      name : 'Moses Spitzer',
      bankName : 'Chase Bank',
      accountNumber : '367187793' ,
      routingNumber : '021000021'
    }
    
    ]
   
*/



const numbers = [
  { number: 1000000000000, text: 'trillion' },
  { number: 1000000000, text: 'billion' },
  { number: 1000000, text: 'million' },
  { number: 1000, text: 'thousand' },
  { number: 100, text: 'hundred' },
  { number: 90, text: 'ninety' },
  { number: 80, text: 'eighty' },
  { number: 70, text: 'seventy' },
  { number: 60, text: 'sixty' },
  { number: 50, text: 'fifty' },
  { number: 40, text: 'forty' },
  { number: 30, text: 'thirty' },
  { number: 20, text: 'twenty' },
  { number: 19, text: 'nineteen' },
  { number: 18, text: 'eighteen' },
  { number: 17, text: 'seventeen' },
  { number: 16, text: 'sixteen' },
  { number: 15, text: 'fifteen' },
  { number: 14, text: 'fourteen' },
  { number: 13, text: 'thirteen' },
  { number: 12, text: 'twelve' },
  { number: 11, text: 'eleven' },
  { number: 10, text: 'ten' },
  { number: 9, text: 'nine' },
  { number: 8, text: 'eight' },
  { number: 7, text: 'seven' },
  { number: 6, text: 'six' },
  { number: 5, text: 'five' },
  { number: 4, text: 'four' },
  { number: 3, text: 'three' },
  { number: 2, text: 'two' },
  { number: 1, text: 'one' },
  { number: 0, text: 'zero' }
];

function shouldPrefixWithOne (n) {
  return n >= 100;
};

/**
 * Checks if a certain number should be joined with hyphens
 * e.g. "ninety-nine" versus "one hundred one"
 *
 * Examples:
 * _shouldHyphenate(10); // returns False
 * _shouldHyphenate(21); // returns True
 *
 * @param {number} n placeholder to check
 * @returns {boolean}
 */
function shouldHyphenate (n) {
  return n >= 20 && n <= 99;
};


function numToWords (numToConvert, options = {}) {
  const andForBritish = options.ands || false;

  const comma = (options.commas ? ',' : '');
  const and = (andForBritish ? andWord + ' ' : '');
  let words = '';
  let prefixNum;
  let remainder;
  let closestSmallerNumber;
  let closestSmallerNumberText;

  numToConvert = parseInt(numToConvert, 10);

  if (isNaN(numToConvert)) {
    return 'not a number';
  }

  if (!isFinite(numToConvert)) {
    return 'infinity';
  }

  if (numToConvert < 0) {
    words += 'negative ';
    numToConvert *= -1;
  }

  // Search list of numbers for closest smaller number.
  // numToConvert will be written in terms of this number.
  for (const { number, text } of numbers) {
    if (numToConvert === number) {
      if (shouldPrefixWithOne(number)) {
        words += 'one ';
      }
      words += text;
      return words;
    }

    if (numToConvert > number) {
      closestSmallerNumber = number;
      closestSmallerNumberText = text;
      break;
    }
  }

  // How many 'closestSmallerNumber's can numToConvert be grouped into?
  // e.g. five 'thousand'.
  prefixNum = Math.floor(numToConvert / closestSmallerNumber);
  if (prefixNum !== 1 || shouldPrefixWithOne(closestSmallerNumber)) {
    words += numToWords(prefixNum, options) + ' ';
  }

  words += closestSmallerNumberText;

  remainder = numToConvert - prefixNum * closestSmallerNumber;
  if (remainder > 0 && shouldHyphenate(closestSmallerNumber)) {
    words += '-';
  } else if ((closestSmallerNumber >= 1000) && (remainder > 0) && (remainder < 100)) {
    words += comma + ' ' + and;
  } else if ((closestSmallerNumber >= 1000) && (remainder > 0)) {
    words += comma + ' ';
  } else if ((closestSmallerNumber === 100) && (remainder > 0)) {
    words += ' ' + and;
  } else {
    words += ' ';
  }

  if (remainder > 0) {
    words += numToWords(remainder, options);
  }

  return words.trim();
};
 


function getAmauntAsText(){
    let number = document.getElementById('test').value
    number = parseFloat(number)
   let numberbeforDecimalAsText = numToWords(number);
 console.log(numberbeforDecimalAsText)
 console.log(number)
 let numberAfterDecimal = getTwoDigitDecimalAsNumber(number)
 console.log(numberAfterDecimal)
 let numberAsText = `${numberbeforDecimalAsText} and ${numberAfterDecimal}/100`+'*'.repeat(200);
 console.log(numberAsText)
 document.getElementById('amauntAsText').innerHTML = numberAsText
 if (numberbeforDecimalAsText != 'not a number') {
  document.getElementById('amauntAsText').style.display = 'block';
 }else{
  alert('pleas enter a valid number')
  document.getElementById('test').value = null
  document.getElementById('amauntAsText').value = null
 }
 

}
function roundedNumber(){
  let routingNumber  = document.getElementById('routingNumber').value
 document.getElementById('routingNumber').type ='text'
 if(routingNumber.includes('t')){routingNumber.value = routingNumber.value.slice(1,routingNumber.length-1)}
 
 document.getElementById('routingNumber').value =`t${routingNumber}t`
}


function getTwoDigitDecimalAsNumber(number) {
    let roundedNumber = number.toFixed(2);
    let decimalPart = roundedNumber[roundedNumber.length - 2] + roundedNumber[roundedNumber.length - 1];
    return decimalPart;
    console.log(decimalPart)
}
const inputElement = document.getElementById('test');




inputElement.addEventListener('change', getAmauntAsText);
inputElement.addEventListener('change', test2);


function formatCurrency(number) {
  const formatter = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD'
   });
   return formatter.format(number);
}

function test2() {
   // Get the value of the input field
   const number = document.getElementById('test').value;
   // Parse the input value as a float
   const parsedNumber = parseFloat(number);
   // Check if the input is a valid number
   if (!isNaN(parsedNumber)) {
       // Format the number as currency
       const formattedCurrency = formatCurrency(parsedNumber);
       // Display the formatted currency in the result div
       document.getElementById('test').value = formattedCurrency;
       console.log(formattedCurrency)
   } else {
       alert('Please enter a valid number')
       console.log('test')
   }
}






/*function addAccountAndRotingAndBankToCheck() {
  let i =document.getElementById('index').value
  document.getElementById('bankName').value = ` ${arrOfBanks[i].bankName}`
  document.getElementById('routingNumber').value =`t${arrOfBanks[i].routingNumber}t`
  document.getElementById('accountNumber').value = `${arrOfBanks[i].accountNumber}o`
  document.getElementById('text-area').value = arrOfBanks[i].name
}*/

