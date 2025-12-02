"use strict";

const chalk = require("chalk");
const gradient = require("gradient-string");
const ora = require("ora");
const { version } = require("./package.json");

// Gradient warna tiap huruf
const title = gradient.purple.pink("✨ Initializing Baileys System ✨");
const versionText = gradient.cristal(`Version Synced: ${version}`);

console.log("\n" + title);
console.log(versionText + "\n");

// Loading Animation
const spinner = ora({
  text: chalk.cyanBright("Starting engine..."),
  spinner: {
    frames: ["🌌", "✨", "🌙", "🔮", "💫", "⚡"],
    interval: 120
  }
}).start();

setTimeout(() => {
  spinner.color = "magenta";
  spinner.text = chalk.magentaBright("Connecting to Baileys core...");
}, 2000);

setTimeout(() => {
  spinner.color = "yellow";
  spinner.text = chalk.yellowBright("Syncing configuration...");
}, 4000);

setTimeout(() => {
  spinner.color = "green";
  spinner.succeed(chalk.greenBright("✨ Baileys System Ready!"));
  console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(chalk.whiteBright("🔥 Running flawlessly… Enjoy!"));
  console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
}, 6500);

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWASocket = void 0;
const Socket_1 = __importDefault(require("./Socket"));
exports.makeWASocket = Socket_1.default;
__exportStar(require("../WAProto"), exports);
__exportStar(require("./Utils"), exports);
__exportStar(require("./Types"), exports);
__exportStar(require("./Store"), exports);
__exportStar(require("./Defaults"), exports);
__exportStar(require("./WABinary"), exports);
__exportStar(require("./WAM"), exports);
__exportStar(require("./WAUSync"), exports);

exports.default = Socket_1.default;
