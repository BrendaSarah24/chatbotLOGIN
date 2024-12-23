const puppeteer = require('puppeteer');

(async () => {
    const usuario = process.argv[2]; // Obtener usuario de la línea de comandos
    const contrasena = process.argv[3]; // Obtener contraseña de la línea de comandos

    if (!usuario || !contrasena) {
        console.error('Debes proporcionar usuario y contraseña.');
        process.exit(1);
    }

    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:5173');

        // Navegar a login
        const ids = await page.$$eval("a", items => items.map(item => item.id));
        await page.waitForSelector(`#${ids[4]}`);
        await page.click(`#${ids[4]}`);
        await page.goto('http://localhost:5173/login');

        const inputs = await page.$$eval("input", items => items.map(item => item.id));

        // Ingresar usuario y contraseña
        await page.waitForSelector(`#${inputs[0]}`);
        await page.type(`#${inputs[0]}`, usuario);
        await page.type(`#${inputs[1]}`, contrasena);
        await page.click(`#btn_login`);

        console.log('Inicio de sesión realizado correctamente.');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();
    } catch (error) {
        console.error('Error en Puppeteer:', error);
    }
})();
