document.addEventListener('DOMContentLoaded', function () {
  var currentStep = 1;
  var totalSteps = 9;

  function showStep(step) {
    document.querySelectorAll('.step-content > div').forEach(function (el, index) {
      el.style.display = (index === step - 1) ? 'block' : 'none';
    });

    document.querySelectorAll('.steps .step').forEach(function (el, index) {
      el.classList.toggle('active', index === step - 1);
    });

    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'inline-block' : 'none';

    var progress = (step / totalSteps) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
  }

  function validateStep(step) {
    var isValid = true;
    document.querySelectorAll('.step-' + step + ' [required]').forEach(function (el) {
      if (!el.value.trim()) {
        el.classList.add('is-invalid');
        isValid = false;
      } else {
        el.classList.remove('is-invalid');
      }
    });
    return isValid;
  }

  document.getElementById('nextBtn').addEventListener('click', function () {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  });

  document.getElementById('prevBtn').addEventListener('click', function () {
    currentStep--;
    showStep(currentStep);
  });

  document.getElementById('agentForm').addEventListener('submit', function (event) {
    if (!validateStep(currentStep)) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Form submission logic here
      console.log('Form submitted');
      alert('form is submitted');
    }
  });

  showStep(currentStep);
});

// Agent form final calculation

document.getElementById('agentForm').addEventListener('input', calculate);

    function calculate() {
        const salePrice = parseFloat(document.getElementById('salePrice').value) || 0;
        const agentCommissionPercent = parseFloat(document.getElementById('agentCommission').value) || 0;
        const plusBonus = parseFloat(document.getElementById('plusBonus').value) || 0;
        const rebateValue = parseFloat(document.getElementById('rebateValue').value) || 0;
        const referralFee = parseFloat(document.getElementById('referralFee').value) || 0;
        const other = parseFloat(document.getElementById('other').value) || 0;

        const agentCommissionValue = salePrice * (agentCommissionPercent / 100);
        document.getElementById('agentCommissionValue').value = agentCommissionValue.toFixed(2);

        const netWithoutTransfee = agentCommissionValue + plusBonus - rebateValue - referralFee - other;
        document.getElementById('netWithoutTransfee').value = netWithoutTransfee.toFixed(2);

        document.getElementById('yourNet').value = netWithoutTransfee.toFixed(2);
    }


  