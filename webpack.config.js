const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );


const euphoriaConfig = {
	...defaultConfig,
	entry: {
		admin: path.resolve( process.cwd(), "src/index.js"),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( process.cwd(), 'assets/build'),
		filename: '[name].js',
		clean: true,
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
		],
	},


	resolve: {
		...defaultConfig.resolve,
		extensions: [ ".js", ".jsx", ".json" ],
	},

	plugins: [

		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== "MiniCssExtractPlugin"
		),

		new MiniCssExtractPlugin( {
			filename: "admin.css",
		} ),
	],

	optimization: {
		...defaultConfig.optimization,
	},

	stats: {
		children: false,
	},
}

module.exports = euphoriaConfig;
