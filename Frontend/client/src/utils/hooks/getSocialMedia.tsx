const getSocialMedia = (url: string): string => {
  let formattedUrl = url
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    formattedUrl = `https://${url}`
  }

  try {
    const host = new URL(formattedUrl).hostname

    if (host.includes("dribbble.com")) return "FaDribbble"
    if (host.includes("behance.net")) return "FaBehance"
    if (host.includes("instagram.com")) return "FaInstagram"
    if (host.includes("facebook.com")) return "FaFacebook"
    if (host.includes("linkedin.com")) return "FaLinkedin"
    if (host.includes("twitter.com") || host.includes("x.com"))
      return "FaTwitter"
    if (host.includes("youtube.com") || host.includes("youtu.be"))
      return "FaYoutube"
    if (host.includes("github.com")) return "FaGithub"
    if (host.includes("pinterest.com")) return "FaPinterest"
    if (host.includes("reddit.com")) return "FaReddit"
    if (host.includes("tiktok.com")) return "FaTiktok"
    if (host.includes("medium.com")) return "FaMedium"
    if (host.includes("deviantart.com")) return "FaDeviantart"
    if (host.includes("codepen.io")) return "FaCodepen"

    return "FaLink"
  } catch (error) {
    console.error("Invalid URL:", url, error)
    return "FaLink"
  }
}

export default getSocialMedia
