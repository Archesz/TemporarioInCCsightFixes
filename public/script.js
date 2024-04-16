const { exec } = require('child_process');
const process = require('process');

function startROQS(lista) {
    console.log("Iniciando ROQS")
    const folders = lista.join(" ");

    if (process.platform === 'linux') {
        return new Promise((resolve, reject) => {
            const command = exec(`cd ./methods/roqs && bash -c 'source ./venv/bin/activate && python main.py -p ${folders}'`, { shell: true });
            command.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            command.stderr.on('data', (data) => {
                console.error(data.toString());
            });
            command.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Processo terminou com código ${code}`));
                }
            });
        })
    } else if (process.platform === 'win32') {
        return new Promise((resolve, reject) => {
            // const command = exec(`cd ./methods/roqs && .\\venv\\Scripts\\activate && python main.py -p ${folders}`, { shell: true });
            const command = exec(`cd ./methods/roqs && python main.py -p ${folders}`, { shell: true });

            command.stdout.on('data', (data) => {   
                console.log(data.toString());
            });
            command.stderr.on('data', (data) => {
                console.error(data.toString());
            });
            command.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Processo terminou com código ${code}`));
                }
            });
        })
    }
}

function startCNN(lista) {
    console.log("Executando CNN Based")
    const folders = lista.join(" ");
    return new Promise((resolve, reject) => {
        const command = exec(`deactivate && cd ./methods/CNNBased && bash -c 'source ./venv/bin/activate && python main3D.py -p ${folders}'`, { shell: true });
        command.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        command.stderr.on('data', (data) => {
            console.error(data.toString());
        });
        command.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Processo terminou com código ${code}`));
            }
        });
    })
}