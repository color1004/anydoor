module.exports = {
	"extends": ["eslint:recommended"],
	"rules": {
		"no-console": ["error", { "allow": ["warn", "error"] }],
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "script" // module
	},
	"global": {
		// "window": true, // 允许除默认全局对象之外的参数 浏览器环境默认允许
	},
	"env": {
		"browser": false,
		"node": true,
		"es6": true,
		"mocha": true
	}
};
