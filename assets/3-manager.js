// (A) HANDSHAKE WITH PEER SERVER
const peer = new Peer("MANAGER", {
  host: "localhost",
  port: 9000,
  path: "/"
});

// (B) ON RECEIVING MESSAGE FROM OTHER PEERS
peer.on("connection", conn => conn.on("data", data => {
  // (B1) GENERATE NEW HTML ORDER
  let order = document.createElement("table");
  order.className = "order";
  order.onclick = () => order.remove();

  // (B2) TIMESTAMP
  let row = order.insertRow(),
      cell = row.insertCell(),
      now = new Date();
  cell.colSpan = 2;
  cell.style.fontWeight = 700;
  cell.innerHTML = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // (B3) ADD ITEMS
  data = JSON.parse(data);
  for (let [pid, qty] of Object.entries(data)) {
    row = order.insertRow();
    cell = row.insertCell();
    cell.innerHTML = qty;
    cell = row.insertCell();
    cell.innerHTML = products[pid]["name"];
  }

  // (B4) ADD ORDER TO HTML LIST
  document.getElementById("orders-list").appendChild(order);
  conn.close();
}));