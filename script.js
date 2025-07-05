<script>
window.onload = () => {
  const loader = document.querySelector('#loader');
  const result = document.querySelector('#result');
  const signalBtn = document.querySelector('#signal');
  const remTime = document.querySelector('.rem__time');
  const pairBox = document.querySelector('#pair__box');

  const API_KEY = 'YOUR_API_KEY_HERE'; // <-- Replace with real AlphaVantage API Key
  const interval = '5min';

  // Show initial loader
  function showLoader() {
    loader.style.display = 'block';
    loader.innerHTML = '<div>PLEASE WAIT...</div>';
    setTimeout(hideLoader, 4000);
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  showLoader();

  // Populate pair dropdown
  const pairs = [
    'usdbrl (otc)', 'cadchf (otc)', 'usdpkr (otc)', 'usdinr (otc)',
    'usdars (otc)', 'usddzd (otc)', 'usdcop (otc)', 'usdjpy (otc)',
    'audjpy (otc)', 'eurusd (otc)', 'usdphp (jpy)', 'usdbdt (otc)'
  ];

  pairs.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.toUpperCase().replace(/[^A-Z]/g, '');
    opt.innerText = p.replace(/(?<=^.{3})/, '/').toUpperCase();
    pairBox.appendChild(opt);
  });

  $('select').selectator({ useSearch: false });

  // Signal logic
  signalBtn.onclick = async function () {
    const selectedSymbol = pairBox.value || 'EURUSD';

    loader.innerHTML = `<img src="./loader.gif" width="50" />`;
    loader.style.display = "block";
    result.innerText = "";
    remTime.style.visibility = "hidden";

    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=RSI&symbol=FX:${selectedSymbol}&interval=${interval}&time_period=14&series_type=close&apikey=${API_KEY}`);
      const data = await response.json();

      const rsiValues = Object.values(data['Technical Analysis: RSI']);
      if (!rsiValues.length) {
        throw new Error("No RSI data available.");
      }

      const latestRSI = parseFloat(rsiValues[0]['RSI']);
      let signal = '';

      if (latestRSI < 30) {
        signal = 'BUY';
        result.style.color = 'lime';
      } else if (latestRSI > 70) {
        signal = 'SELL';
        result.style.color = 'red';
      } else {
        signal = 'NEUTRAL';
        result.style.color = 'orange';
      }

      loader.style.display = "none";
      result.innerText = signal;

      // Countdown
      let countdown = 60;
      remTime.style.visibility = "visible";
      const countdownInterval = setInterval(() => {
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          remTime.style.visibility = "hidden";
        } else {
          remTime.innerText = "GET NEXT IN: 0:" + (countdown < 10 ? '0' : '') + countdown;
          countdown--;
        }
      }, 1000);

    } catch (error) {
      loader.style.display = "none";
      result.style.color = "orange";
      result.innerText = "Error: " + error.message;
    }
  };
};
</script>
