let chalk import"chalk";
let gradient import"gradient-string";


const major = parseInt(process.versions.node.split('.')[0], 10);

if (major < 20) {
  console.clear();

  const banner = [
    "███████╗██████╗ ███████╗ ██████╗ ██████╗ ",
    "██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔══██╗",
    "█████╗  ██████╔╝█████╗  ██║   ██║██████╔╝",
    "██╔══╝  ██╔══██╗██╔══╝  ██║   ██║██╔══██╗",
    "███████╗██║  ██║███████╗╚██████╔╝██║  ██║",
    "╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝",
  ];

  const glitchChars = ["#", "@", "%", "&", "!", "╳", "▒", "▓", "░"];

  function randomColor() {
    const colors = ["red", "magenta", "yellow", "cyan", "blue", "white"];
    return chalk[colors[Math.floor(Math.random() * colors.length)]];
  }

  let frame = 0;

  const glitchInterval = setInterval(() => {
    console.clear();
    console.log(""); // spacing

    banner.forEach((line, index) => {
      let glitched = line.split("");

      // Tambahkan glitch random
      if (Math.random() < 0.3) {
        const pos = Math.floor(Math.random() * glitched.length);
        glitched[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }

      // Efek shift kiri-kanan
      const shift = Math.floor(Math.sin(frame / 2 + index) * 3);
      const shiftedLine =
        (shift > 0 ? " ".repeat(shift) : "") + glitched.join("");

      // Warna acak untuk setiap baris
      const colored = randomColor()(shiftedLine);
      console.log(colored);
    });

    console.log("\n" + chalk.redBright.bold("❌ ERROR: Node.js Version Not Supported!\n"));
    console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));

    console.log(
      chalk.whiteBright("Baileys ini ") +
      chalk.redBright("tidak mendukung") +
      chalk.whiteBright(" Node.js versi di bawah ") +
      chalk.yellowBright("v20") +
      chalk.whiteBright(".")
    );

    console.log(
      chalk.whiteBright("Versi Node.js kamu saat ini: ") +
      chalk.cyanBright(process.versions.node)
    );

    console.log(
      chalk.whiteBright("Tolong update Node.js minimal ke: ") +
      chalk.greenBright("v20 atau di atasnya.")
    );

    console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));

    frame++;

  }, 90);

  setTimeout(() => {
    clearInterval(glitchInterval);
    process.exit(1);
  }, 9000);
}
