const http = require('http');
const { exec } = require('child_process');

const server = http.createServer(function(request, response) {
	console.dir(request.param);

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
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
		});
	} else {
		console.log('GET');
		const html = `
            <html>
                <body>
					<h1>fuck off cunt</h1>
                </body>
            </html>`;
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.end(html);
	}
});

const port = 3000;
const host = '0.0.0.0';
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
