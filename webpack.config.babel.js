import * as path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATH_OUTPUT = path.join(__dirname, "/dist");
const PATH_SOURCE = path.join(__dirname, "src");

const SOURCEPATH = process.env.npm_config_path;

if ( !SOURCEPATH ) {
    throw new Error("Require set the source path.");
}

let config = {
    entry   : path.join(PATH_SOURCE, SOURCEPATH),
    output  : {
        path        : PATH_OUTPUT,
        publicPath  : "",
        filename    : "[name].bundle.js"
    },
    module  : {
        rules   : [
            // {
            //     enforce : "pre",
            //     test    : /\.js$/,
            //     exclude : /node_modules/,
            //     include : /src/,
            //     loader  : "eslint-loader",
            //     options : {
            //         fix: true
            //     }
            // },
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                loader  : "babel-loader"
            },
            {
                test    : /\.hbs/,
                loader  : "html-loader!html-clean-loader"
            }
        ]
    },
    resolve : {
        alias   : {
            "react"     : "preact",
            "react-dom" : "preact"
        }
    },
    plugins : [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ],
};

export default config;
