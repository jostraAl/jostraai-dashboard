const ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

const statusEl = document.getElementById("status");
const digitEl = document.getElementById("digit");
const priceEl = document.getElementById("price");

ws.onopen = () => {
  statusEl.innerText = "Connected 🟢";

  ws.send(JSON.stringify({
    ticks: "R_50",
    subscribe: 1
  }));
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);

  if (data.tick) {
    const price = data.tick.quote;
    const digit = String(price).slice(-1);

    priceEl.innerText = price;
    digitEl.innerText = digit;
  }
};

ws.onclose = () => {
  statusEl.innerText = "Disconnected 🔴";
};
