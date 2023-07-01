/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir:true,
  },
}

module.exports = function (webpackEnv) {
  return {
    resolve: {
      fallback: {
        "tls": false,
        "net": false,
      }
    }
  }
}

