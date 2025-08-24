/** @type {import('next').NextConfig} */
function makeRedirect(source){
  return {source, destination: `https://code.luketrenaman.com/${source}`, permanent: true};
}
const nextConfig = {
  reactStrictMode: true
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 

module.exports = withBundleAnalyzer(nextConfig)
