document.getElementById('yesBtn').addEventListener('click', () => {
  sendAnswer('Yes');
});
document.getElementById('noBtn').addEventListener('click', () => {
  sendAnswer('No');
});

function sendAnswer(answer) {
  const resEl = document.getElementById('response');
  resEl.textContent = (answer === 'Yes') ? "បងស្រលាញ់អូន ❤️" : "🥲";

  fetch('/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Saved to backend:", data);
  })
  .catch(err => {
    console.error("Logging failed:", err);
  });
}
