const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req, res) => {

	const filePath = path.join(conf.root, req.url);
	route(req, res, filePath);

	/* fs.stat(filePath, (err, stats) => {
		if(err) {
			res.statusCode = 404;
			res.setHeader('Content-type', 'text/plain');
			res.end(`${filePath} is not a dic or a file`);
			return;
		}
		if(stats.isFile()) {
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/plain');
			// fs.readFile(filePath, (err, data) => {
			// 	res.end(data);
			// });
			fs.createReadStream(filePath).pipe(res);
		} else if(stats.isDirectory()) {
			fs.readdir(filePath, (err, files) => {
				res.statusCode = 200;
				res.setHeader('Content-type', 'text/plain');
				res.end(files.join(', '))
			});
		}
	}); */

	// res.statusCode = 200;
	// res.setHeader('Content-type', 'text/plain');
	// res.end(filePath);

	// res.write('<html>');
	// res.write('<body>');
	// res.write('hello 11 http!');
	// res.write('</body>');
	// res.end('</html>');

	// res.end('kk');
});

server.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.log(`server started at ${chalk.green(addr)}`);
})
