const youTubeRegex =
  /(?:youtube\.com\/watch\?.*?v=|youtu\.be\/)([A-Za-z0-9-_]{11})/
const tikTokRegex = /tiktok\.com\/@([a-z0-9._]{1,24})\/video\/(\d{19})/

export function formatVideo(input: string) {
  const youTubeResult = youTubeRegex.exec(input)
  const youTubeID = youTubeResult?.[1]
  if (youTubeID) return `https://youtu.be/${youTubeID}`

  const tikTokResult = tikTokRegex.exec(input)
  const tikTokUsername = tikTokResult?.[1]
  const tikTokID = tikTokResult?.[2]
  if (tikTokUsername && tikTokID) {
    return `https://tiktok.com/@${tikTokUsername}/video/${tikTokID}`
  }

  return input
}
export function extractUsername(input: string) {
  const tikTokResult = tikTokRegex.exec(input)
  const tikTokUsername = tikTokResult?.[1]
  return tikTokUsername
}
export function isTikTokVideo(input: string) {
  return tikTokRegex.test(input)
}