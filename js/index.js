const links = document.querySelectorAll("a");
const tabs = document.querySelectorAll(".tab")
const steps = document.querySelectorAll(".circle")
const change = document.querySelector(".link")

const updateCurrentStep = (number, type) => {
  tabs[number - 1].style.display = 'none'
  steps[number - 1].classList.remove('selected')

  if (type.includes('next') || type.includes('confirm')) {
    tabs[number].style.display = 'block'
    steps[number].classList.add('selected')
  } else if (type.includes('back')) {
    tabs[number - 2].style.display = 'block'
    steps[number - 2].classList.add('selected')
  }
}

const nameValidation = () => {
  let nameInput = document.querySelector('#nameInput')
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity("Field cannot be empty");
    nameInput.reportValidity();
  } else { return true }
}

const emailValidation = () => {
  let emailInput = document.querySelector('#emailInput')
  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity("Field cannot be empty");
    emailInput.reportValidity();
  } else { return true }
}

const phoneValidation = () => {
  let phoneInput = document.querySelector('#phoneInput')
  if (phoneInput.validity.valueMissing) {
    phoneInput.setCustomValidity("Field cannot be empty");
    phoneInput.reportValidity();
  } else { return true }

}

const formValidations = () => {
  if (nameValidation() && emailValidation() && phoneValidation()) {
    return true
  } else {
    return false
  }
}

links.forEach((button) => button.addEventListener('click', (e) => {
  let className = e.target.getAttribute('class')
  let selectedStep = e.target.parentElement.parentElement.parentElement.getAttribute('id')
  if (e.target.getAttribute('id') !== null) {
    formValidations() ? updateCurrentStep(selectedStep, className) : console.log('Not valid')
  } else {
    updateCurrentStep(selectedStep, className)
  }
}))


// Display yearly plan prices and addons
const yearlyInput = document.getElementById('yearly');
const monthlyPrices = document.querySelectorAll(".monthly-plan")
const yearlyPrices = document.querySelectorAll(".yearly-plan")
const yearlyDiscounts = document.querySelectorAll('.yearly-discount');
const monthlyAddonPrices = document.querySelectorAll('.monthly-addon')
const yearlyAddonPrices = document.querySelectorAll(".yearly-addon")

let information = {}
let yearly = false

// Display final information
const updateInformation = () => {
  console.log(information)
  let confirmAddOn = document.getElementById('confirm-addon')
  let totalPrice = 0
  while (confirmAddOn.firstChild) {
    confirmAddOn.removeChild(confirmAddOn.firstChild)
  }

  if ('Plan' in information) {
    let plan = information['Plan']
    document.getElementById("selected-plan").innerHTML = `${plan['name']} (${yearly ? 'Yearly' : 'Monthly'})`
    let price = `${yearly ? plan['prices']['yearly'] : plan['prices']['monthly']}`
    totalPrice += Number(price)
    document.getElementById("selected-price").innerHTML = `$${price}/${yearly ? 'yr' : 'mo'}`
  }

  if ('Addons' in information) {
    information['Addons'].forEach(addon => {
      console.log(addon)
      let div = document.createElement('DIV')
      div.classList = "flex"

      let p = document.createElement('p')
      p.classList.add('text-grey')
      p.innerHTML = addon['option']

      let price = document.createElement('p')
      price.classList.add('blue-text')
      let priceValue = `${yearly ? addon['prices']['yearly'] : addon['prices']['monthly']}`
      totalPrice += Number(priceValue)
      price.innerHTML = `+$${priceValue}/${yearly ? 'yr' : 'mo'}`

      div.appendChild(p)
      div.appendChild(price)
      confirmAddOn.appendChild(div)
    })

  } else if (information['Addons'] === []) {
    let p = document.createElement('p')
    p.innerHTML = 'No add-ons included'
    confirmAddOn.appendChild(p)
  }

  document.getElementById('total-per').innerHTML = `${yearly ? 'Total (per year)' : 'Total (per month)'}`
  document.getElementById('finalPrice').innerHTML = `$${totalPrice}/${yearly ? 'yr' : 'mo'}`
}

change.addEventListener('click', () => {
  yearly = !yearly
  updateInformation()
})

// Gather information
document.querySelectorAll("input[name='plan']").forEach(input => {
  input.addEventListener('change', () => {
    document.querySelectorAll("input[name='plan']:checked").forEach(selectedOption => {
      let planName = selectedOption.getAttribute('id')
      let planPricesElements = Array.from(selectedOption.nextElementSibling.querySelectorAll('.plan-price'))
      let planPrices = planPricesElements.map(elem => elem.getAttribute('price'))
      information['Plan'] = { 'name': planName, 'prices': {monthly: planPrices[0], yearly: planPrices[1]} }
    })
    updateInformation();
  })
})

document.querySelectorAll("input[name='addon']").forEach(option => {
  option.addEventListener('change', (e) => {
    let addons = []
    document.querySelectorAll("input[name='addon']:checked").forEach(selectedOption => {
      const selectedTarget = selectedOption.nextElementSibling;
      let option = selectedTarget.querySelector(".title").innerText;
      let optionPricesElements = Array.from(selectedTarget.querySelectorAll(".addon-price"))
      let optionPrices = optionPricesElements.map(elem => elem.getAttribute('price'))
      addons.push({'option': option, 'prices': {monthly: optionPrices[0], yearly: optionPrices[1]}});
    });
    information['Addons'] = addons
    updateInformation();
  })
})

yearlyInput.addEventListener('change', function() {
  yearly = !yearly
  updateInformation();
  yearlyDiscounts.forEach(discount => {
    discount.style.display = this.checked ? 'block' : 'none';
  });

  monthlyPrices.forEach(price => {
    price.style.display = this.checked ? 'none' : 'block';
  })

  yearlyPrices.forEach(price => {
    price.style.display = this.checked ? 'block' : 'none';
  })

  monthlyAddonPrices.forEach(price => {
    price.style.display = this.checked ? 'none' : 'block';
  })

  yearlyAddonPrices.forEach(price => {
    price.style.display = this.checked ? 'block' : 'none';
  })
});


// Add .selected class to Add-on options
document.querySelectorAll(".checkbox-option").forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    e.target.parentElement.classList.toggle('selected')
  })
})
