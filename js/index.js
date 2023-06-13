let currentStep = "1"

const tabs = document.querySelectorAll(".tab")
const steps = document.querySelectorAll(".step")

const forwardButtons = document.querySelectorAll(".btn")
const backButtons = document.querySelectorAll(".btn-back")

// DOM ELEMENTS

const updateCurrentStep = (number, type) => {
  // hide the current step
  tabs[number - 1].style.display = 'none'

  if (type.includes('next')) {
    // display the next one
    tabs[number].style.display = 'block'
  } else {
    // display the previous one
    tabs[number - 2].style.display = 'block'
  }
}

forwardButtons.forEach((button) => button.addEventListener('click', (e) => {
  let className = e.target.getAttribute('class')
  let selectedStep = e.target.parentElement.parentElement.parentElement.getAttribute('step')
  updateCurrentStep(selectedStep, className)
}))

backButtons.forEach((button) => button.addEventListener('click', (e) => {
  let className = e.target.getAttribute('class')
  let selectedStep = e.target.parentElement.parentElement.parentElement.getAttribute('step')
  updateCurrentStep(selectedStep, className)
}))

// Display yearly plan prices

const yearlyInput = document.getElementById('yearly');
const monthlyPrices = document.querySelectorAll(".monthly-plan")
const yearlyPrices = document.querySelectorAll(".yearly-plan")
const yearlyDiscounts = document.querySelectorAll('.yearly-discount');

yearlyInput.addEventListener('change', function() {
  yearlyDiscounts.forEach(discount => {
    discount.style.display = this.checked ? 'block' : 'none';
  });

  monthlyPrices.forEach(price => {
    price.style.display = this.checked ? 'none' : 'block';
  })

  yearlyPrices.forEach(price => {
    price.style.display = this.checked ? 'block' : 'none';
  })
});
