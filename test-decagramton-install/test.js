
const { makeWASocket, useMultiFileAuthState } = require('@zetagoaurum-socket/decagramton');
const chalk = require('chalk');

console.log(chalk.green('✅ Library imported successfully!'));
console.log(chalk.green(`✅ Version: ${require('@zetagoaurum-socket/decagramton/package.json').version}`));



(async () => {
    try {
        const { state } = await useMultiFileAuthState('auth_info_baileys');
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: true
        });
        console.log(chalk.green('✅ makeSocket initialized without error!'));
    } catch (error) {
        console.error(chalk.red('❌ Failed to initialize makeSocket:'), error);
        process.exit(1);
    }
    console.log(chalk.blue('Test Complete: Decagramton is stable.'));
    process.exit(0);
})();
