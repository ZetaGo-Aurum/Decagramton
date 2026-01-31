"use strict";
const axios = require("axios");
const { version: currentVersion } = require("../../package.json");
const { execSync } = require("child_process");
const chalk = require("chalk");

const packageName = "@zetagoaurum-socket/decagramton";

const checkAndUpdate = async () => {
    try {
        // Short timeout to prevent hanging startup
        const { data } = await axios.get(`https://registry.npmjs.org/${packageName}`, { timeout: 3000 });
        const latestVersion = data["dist-tags"].latest;

        if (latestVersion !== currentVersion) {
            console.log(chalk.yellow.bold(`\n\n╔══════════════════════════════════════════════════════════════════════╗`));
            console.log(chalk.yellow.bold(`║  🆕 UPDATE DETECTED: v${latestVersion} (Current: v${currentVersion})                         ║`));
            console.log(chalk.yellow.bold(`║  ⚡ Installing update automatically...                               ║`));
            console.log(chalk.yellow.bold(`╚══════════════════════════════════════════════════════════════════════╝\n`));

            try {
                // Install synchronously to block everything else
                execSync(`npm install ${packageName}@latest`, { stdio: 'inherit' });
                
                console.log(chalk.green.bold("\n✅ UPDATE COMPLETE! Restarting process..."));
                console.log(chalk.gray("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
                process.exit(0); // Exit to trigger PM2/Nodemon restart
            } catch (err) {
                console.error(chalk.red("❌ Auto-update failed:"), err.message);
                console.log(chalk.red("Please manually run: npm update"));
            }
        }
    } catch (error) {
        // Ignore network errors or timeouts to ensure bot still starts
    }
};

module.exports = { checkAndUpdate };
