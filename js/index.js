const links = document.querySelectorAll("a");
const tabs = document.querySelectorAll(".tab")
const steps = document.querySelectorAll(".circle")

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

links.forEach((button) => button.addEventListener('click', (e) => {
  let className = e.target.getAttribute('class')
  let selectedStep = e.target.parentElement.parentElement.parentElement.getAttribute('step')
  updateCurrentStep(selectedStep, className)
}))


// Display yearly plan prices and addons
const yearlyInput = document.getElementById('yearly');
const monthlyPrices = document.querySelectorAll(".monthly-plan")
const yearlyPrices = document.querySelectorAll(".yearly-plan")
const yearlyDiscounts = document.querySelectorAll('.yearly-discount');
const monthlyAddonPrices = document.querySelectorAll('.monthly-addon')
const yearlyAddonPrices = document.querySelectorAll(".yearly-addon")

let information = {}

// Display final information
const updateInformation = () => {
  console.log(information)
  let confirmAddOn = document.getElementById('confirm-addon')
  while (confirmAddOn.firstChild) {
    confirmAddOn.removeChild(confirmAddOn.firstChild)
  }

  if ('Plan' in information) {
    let plan = information['Plan']
    document.getElementById("selected-plan").innerHTML = plan.planName
    document.getElementById("selected-price").innerHTML = plan.planPrices[0].innerHTML
  }

  if ('Addons' in information) {
    information['Addons'].forEach(addon => {
      let div = document.createElement('DIV')
      div.classList = "addon flex"

      let p = document.createElement('p')
      p.innerHTML = addon[0]

      let price = document.createElement('p')
      price.innerHTML = addon[1][0].innerHTML

      div.appendChild(p)
      div.appendChild(price)
      confirmAddOn.appendChild(div)
    })

  } else if (information['Addons'] === []) {
    let p = document.createElement('p')
    p.innerHTML = 'No add-ons included'
    console.log(p)
    confirmAddOn.appendChild(p)
  }
}

// Gather information
document.querySelectorAll("input[name='plan']").forEach(input => {
  input.addEventListener('change', () => {
    document.querySelectorAll("input[name='plan']:checked").forEach(selectedOption => {
      let planName = selectedOption.getAttribute('id')
      let planPrices = selectedOption.nextElementSibling.querySelectorAll('.plan-price')
      information['Plan'] = { planName, planPrices }
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
      let optionPrices = selectedTarget.querySelectorAll(".addon-price");
      addons.push([option, optionPrices]);
    });
    information['Addons'] = addons
    updateInformation();
  })
})

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
