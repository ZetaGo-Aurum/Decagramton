
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk")); 
const logger_1 = __importDefault(require("./logger"));

module.exports = () => {
    // Override logger for styled output if needed, or just add process handlers
    
    process.on('uncaughtException', (err) => {
        console.log(chalk_1.default.red.bold('╔════════════════════════════════════════════╗'));
        console.log(chalk_1.default.red.bold('║           [ANTI-KILL] PROTECTION           ║'));
        console.log(chalk_1.default.red.bold('║           Uncaught Exception!              ║'));
        console.log(chalk_1.default.red.bold('╚════════════════════════════════════════════╝'));
        console.error(chalk_1.default.red(err.message));
        if (err.stack) console.error(chalk_1.default.gray(err.stack));
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log(chalk_1.default.red.bold('╔════════════════════════════════════════════╗'));
        console.log(chalk_1.default.red.bold('║           [ANTI-KILL] PROTECTION           ║'));
        console.log(chalk_1.default.red.bold('║           Unhandled Rejection!             ║'));
        console.log(chalk_1.default.red.bold('╚════════════════════════════════════════════╝'));
        console.error(chalk_1.default.red(reason));
    });

    logger_1.default.info('Anti-kill handlers initialized');
};
