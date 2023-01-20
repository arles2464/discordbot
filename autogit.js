const http = require('http');
const { exec } = require('child_process');

const server = http.createServer(function(request, response) {
	console.dir(request.param);
	let errorEncountered = false;
	if (request.method == 'POST') {
		console.log('POST');
		let body = '';
		request.on('data', function(data) {
			body += data;
			console.log('POST Received');
		});
		request.on('end', function() {
			console.log('Body: ' + body);
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end('POST Completed');
			exec('git pull; pkill -n node; node bot.js', (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					errorEncountered = true;
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					errorEncountered = true;
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
		});
	} else {
		console.log('GET');
		const htmlOn = `
            <html>
                <body>
					<h1>No Errors Encountered</h1>
                </body>
            </html>`;
		const htmlOff = `
            <html>
                <body>
					<h1>Error Encountered</h1>
					<h2>Please Check Server</h2>
                </body>
            </html>`;
		response.writeHead(200, { 'Content-Type': 'text/html' });
		if (errorEncountered) {
			response.end(htmlOff);
		} else {
			response.end(htmlOn);
		}
	}
});

const port = 3000;
const host = '0.0.0.0';
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
