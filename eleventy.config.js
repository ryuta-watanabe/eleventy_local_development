const path = require("node:path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const esbuild = require("esbuild");
const prettier = require("prettier");

module.exports = (eleventyConfig) => {
  // CSSのビルド
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      // _から始まるファイルは無視
      if (path.basename(inputPath).startsWith("_")) {
        return;
      }

      // PostCSSの処理
      const result = await postcss([
        postcssImport, // @importの解決
        autoprefixer, // ベンダープレフィックスの自動付与
        cssnano({
          // CSSの最適化（本番環境用）
          preset: "default",
        }),
      ]).process(inputContent, {
        from: inputPath,
        to: inputPath.replace(/^src/, "dist"),
      });

      return async () => {
        return result.css;
      };
    },
  });

  // JSファイルのバンドル
  eleventyConfig.on("beforeBuild", async () => {
    const isProduction = process.env.NODE_ENV === "production"; // 環境変数で判定
    const jsFiles = [
      "src/scripts/main.js", // 他のファイルをここに追加可能
    ];

    for (const inputFile of jsFiles) {
      // modules 配下のファイルはスキップ
      if (inputFile.includes("/modules/")) {
        continue;
      }

      const outputFile = inputFile.replace(/^src\/scripts\//, "dist/scripts/");

      // esbuild バンドル
      await esbuild.build({
        entryPoints: [inputFile], // バンドル対象のファイル
        outfile: outputFile, // 出力ファイル名を同一に
        bundle: true, // バンドル有効
        minify: isProduction, // 本番環境では圧縮
        sourcemap: !isProduction, // ソースマップの出力を環境変数で制御
        format: "iife", // フォーマットは即時関数
        platform: "browser", // ブラウザ用設定
        mainFields: ["browser", "module", "main"], // モジュール解決
      });
    }
  });

  // HTMLの変換後に実行される処理
  eleventyConfig.addTransform("prettier", async (content, outputPath) => {
    if (outputPath?.endsWith(".html")) {
      return prettier.format(content, {
        parser: "html",
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
      });
    }
    return content;
  });

  // 出力設定
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  };
};
