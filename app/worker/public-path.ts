// @ts-ignore
declare var __webpack_public_path__: string;

const assetPrefix = (process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "").replace(
  /\/$/,
  "",
);
const publicPath = assetPrefix ? `${assetPrefix}/_next/` : "/_next/";

__webpack_public_path__ = publicPath;
(self as any).__webpack_public_path__ = publicPath;
