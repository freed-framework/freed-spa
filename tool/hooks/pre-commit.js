/**
 * @file pre-commit.js
 * @author denglingbo
 *
 * pre commit 检查
 */
/* eslint-disable */

const exec = require('child_process').exec;
const CLIEngine = require('eslint').CLIEngine;
const linter = require('eslint').linter;
const log = require('../proxy/log');

const fs = require('fs');

let eslintConfig = fs.readFileSync('./.eslintrc','utf-8');

eslintConfig = JSON.parse(eslintConfig);

const globals = [];
Object.keys(eslintConfig.globals).forEach(key => {
    globals.push(`${key}:${eslintConfig.globals[key]}`);
});
eslintConfig.globals = globals;

const cli = new CLIEngine(eslintConfig);

let pass = 0;

const ext = ['js', 'jsx'];

log.info('Linting code, please waiting...');

exec('git diff-index --cached --name-status HEAD', (error, stdout, stderr) => {
    if(stdout.length) {
        const array = stdout.split('\n');
        const files = [];

        array.pop();
        array.forEach(item => {
            const expr = /[\D]\s*(.+)/.exec(item);
            if (expr && expr.length > 1) {
                const path = expr[1];
                const suffix = path.split('.');
                if (suffix && suffix.length > 1 && ext.indexOf(suffix[1]) !== -1) {
                    files.push(path);
                }
            }
        });

        try {
            const report = cli.executeOnFiles(files);

            report.results.forEach(item => {
                if (item.errorCount > 0) {
                    const messages = item.messages;

                    log.info(`${item.filePath}`);
                    messages.forEach(msg => {
                        log.error(`line ${msg.line}, col ${msg.column}, message: ${msg.message}, rule: ${msg.ruleId}, type: ${msg.nodeType}`);
                    });

                    pass = 1;
                }
            });
        } catch (ex) {
            log.warn(ex);
        }

        if(pass === 0){
            log.info(`SUCCESS: Everything is OK!`);
        }
        process.exit(pass);
    }

    if (error !== null) {
        log.error('exec error: ' + error);
    }
});
