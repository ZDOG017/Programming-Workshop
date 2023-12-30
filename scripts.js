function calculateCost() {
    const participantType = document.querySelector('input[name="participantType"]:checked').id;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
  
    const sessionCosts = {
      "session-1": 20,
      "session-2": 30,
      "session-3": 40,
      "session-4": 50
    };
  
    let totalCost = 0;
    let attendedSessions = 0;
  
    for (let i = 1; i <= 4; i++) {
      const sessionCheckbox = document.getElementById(`session-${i}`);
      const sessionCostInput = document.getElementById(`cost-session-${i}`);
  
      if (sessionCheckbox.checked) {
        attendedSessions++;
  
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const sessionCost = sessionCosts[`session-${i}`];
        const participantTypeCost = (participantType === "Presenter") ? 2 : 1;
  
        const sessionTotalCost = days * sessionCost * participantTypeCost;
        sessionCostInput.value = `${sessionTotalCost} euros`;
  
        totalCost += sessionTotalCost;
      } else {
        sessionCostInput.value = "";
      }
    }
  
    if (totalCost > 1000 && attendedSessions > 2) {
      const discount = totalCost * 0.15;
      totalCost -= discount;
    }
  
    document.getElementById('totalCost').textContent = `${totalCost.toFixed(2)} euros`;
  
    const confirmation = confirm(`Total cost: ${totalCost.toFixed(2)} euros. Do you accept this for payment?`);
  
    if (confirmation) {
      alert("Thank you for your payment!");
    } else {
      alert("Application withdrawn. Please review your selections.");
    }
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill out all fields.');
        return false;
    }

    const namePattern = /^[A-Za-z]+$/;
            if (!namePattern.test(name)) {
                alert('Name should contain only letters.');
                return false;
            }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    document.getElementById('successMessage').style.display = 'block';

    return false;
}