const getSocialMedia = url => {
  let formattedUrl = url
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    formattedUrl = `https://${url}`
  }
  const host = new URL(formattedUrl).hostname
  if (host.includes("dribbble.com")) return "FaDribbble"
  if (host.includes("behance.net")) return "Behance"
  if (host.includes("instagram.com")) return "FaInstagram"
  if (host.includes("facebook.com")) return "Facebook"
  if (host.includes("linkedin.com")) return "LinkedIn"
  if (host.includes("twitter.com") || host.includes("x.com")) return "Twitter"
  if (host.includes("youtube.com") || host.includes("youtu.be"))
    return "YouTube"
  if (host.includes("github.com")) return "GitHub"
  if (host.includes("pinterest.com")) return "Pinterest"
  if (host.includes("reddit.com")) return "Reddit"
  if (host.includes("tiktok.com")) return "TikTok"
  if (host.includes("medium.com")) return "Medium"
  if (host.includes("deviantart.com")) return "DeviantArt"
  if (host.includes("codepen.io")) return "CodePen"

  return "Unknown"
}

export default getSocialMedia
