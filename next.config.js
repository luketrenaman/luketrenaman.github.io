/** @type {import('next').NextConfig} */
function makeRedirect(source){
  return {source, destination: `https://code.luketrenaman.com/${source}`, permanent: true};
}
const nextConfig = {
  reactStrictMode: true,
  async redirects(){
    return [
      makeRedirect("/archives/2d"),
      makeRedirect("/archives/conway"),
      makeRedirect("/archives/music"),
      makeRedirect("/archives/space_glider"),
      makeRedirect("/archives/tandem"),
      makeRedirect("/archives/ukulele"),
      makeRedirect("/ducksouls"),
      makeRedirect("/luketris"),
      makeRedirect("/rotator"),
      makeRedirect("/snakemaze"),
      makeRedirect("/wave_editor"),
    ]
  }
}

module.exports = nextConfig
