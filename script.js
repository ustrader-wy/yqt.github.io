// ===== Cleaned and Unlocked Script =====

const loader = document.querySelector('#loader');
const result = document.querySelector('#result');
const signal = document.querySelector('#signal');
const remTime = document.querySelector('.rem__time');
const pair__box = document.querySelector('#pair__box');

// Show loader for 8 seconds on start
function showLoader() {
  loader.style.display = 'block';
  loader.innerHTML = '<div>PLEASE WAIT...</div>';
  setTimeout(hideLoader, 8000);
}
function hideLoader() {
  loader.style.display = 'none';
}

// Initialize
showLoader();

// 🚀 Bot logic starts here (always runs)

// Populate pairs dropdown
const pairs = [
  'usdbrl (otc)', 'cadchf (otc)', 'usdpkr (otc)', 'usdinr (otc)',
  'usdars (otc)', 'usddzd (otc)', 'usdcop (otc)', 'usdjpy (otc)',
  'audjpy (otc)', 'eurusd (otc)', 'usdphp (jpy)', 'usdbdt (otc)'
];

pairs.forEach(p => {
  const opt = document.createElement('option');
  opt.value = p;
  opt.innerText = p.replace(/(?<=^.{3})/, '/').toUpperCase();
  pair__box.appendChild(opt);
});

// Style the selects
$('select').selectator({ useSearch: false });

// Possible outcomes for the signal
const outcomes = ['SELL', 'BUY', 'BUY', 'SELL', 'SELL', 'SELL', 'BUY'];

// Countdown timer functionality
function startCountdown() {
  let seconds = 60;
  function tick() {
    remTime.innerHTML = 'GET NEXT IN 0:' + (seconds < 10 ? '0' : '') + seconds;
    seconds--;
    if (seconds >= 0) setTimeout(tick, 1000);
  }
  tick();
}

// Signal button logic
signal.onclick = () => {
  signal.disabled = true;
  remTime.style.visibility = 'visible';
  startCountdown();

  loader.style.display = 'inline';
  loader.innerHTML = '<img src="./loader.gif" width="50" />';
  result.innerText = '';

  setTimeout(() => {
    const pick = outcomes[Math.floor(Math.random() * outcomes.length)];
    loader.style.display = 'none';

    result.style = pick === 'BUY'
      ? 'color:lime;margin-top:1rem'
      : 'color:red;margin-top:1rem';

    result.innerText = pick;

    signal.disabled = false;
    remTime.style.visibility = 'hidden';

  }, 2000); // Demo delay of 2 seconds
};
