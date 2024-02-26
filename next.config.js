/** @type {import('next').NextConfig} */
function makeRedirect(source){
  return {source, destination: `https://code.luketrenaman.com/${source}`, permanent: true};
}
const nextConfig = {
  reactStrictMode: true
}

module.exports = nextConfig
