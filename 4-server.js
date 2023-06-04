// (A) LOAD MODULES
const express = require("express"),
      path = require("path"),
      { PeerServer } = require("peer");

// (B) EXPRESS SERVER
// (B1) INIT + ASSETS
const app = express();
app.use("/assets", express.static(path.join(__dirname, "assets")))

// (B2) FOOD ORDER FRONTEND
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/2-cart.html")));

// (B3) FOOD ORDER BACKEND
app.get("/manager", (req, res) => res.sendFile(path.join(__dirname, "/3-manager.html")));

// (B4) MANIFEST + SERVICE WORKER
app.get("/front.json", (req, res) => res.sendFile(path.join(__dirname, "/assets/5-front.json")));
app.get("/back.json", (req, res) => res.sendFile(path.join(__dirname, "/assets/5-back.json")));
app.get("/sw.js", (req, res) => res.sendFile(path.join(__dirname, "/assets/5-worker.js")));

// (C) START!
// HTTP SERVER @80
// PEER SERVER @9000
app.listen(80, () => console.log(`Server running at port 80`));
const peerServer = PeerServer({ port: 9000, path: "/" });