const fs = require('fs');
const { promisify } = require('util');
const HandleBars = require('handlebars');
const path = require('path');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const conf = require('../config/defaultConfig');
const mime = require('./mime');

const tplPath = path.join(__dirname, '../template/dir.tpl'); // 不用相对路径, 可能会出错
const source = fs.readFileSync(tplPath);
// const template = HandleBars.compile(source, 'utf-8'); // 读buffer会快一些, 比读utf8快
const template = HandleBars.compile(source.toString());

module.exports = async function (req, res, filePath) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mime(filePath);
			console.log('contentType', contentType)
			res.statusCode = 200;
			res.setHeader('Content-type', contentType);
			fs.createReadStream(filePath).pipe(res);
		} else if (stats.isDirectory()) {
			// 这里也可以再次 try catch
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');

			const dir = path.relative(conf.root, filePath); // 获取路径2相对与路径1的相对路径
			const data = {
				files: files.map(file => {
					return {
						file,
						icon: mime(file)
					};
				}),
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '', // 为什么
			};

			res.end(template(data));
		}
	} catch (error) {
		console.log(error);
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/plain');
		res.end(`${filePath} is not a file or a isDirectory`);
	}
}
