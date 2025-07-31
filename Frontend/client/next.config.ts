import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // Allow all paths under this domain
      },
    ],
  },
  sassOptions: {
    // implementation: require("sass"),
    // api: "modern",
  },
}

export default nextConfig
