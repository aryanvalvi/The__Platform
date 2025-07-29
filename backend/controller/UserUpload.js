// const multer = require("multer")
// const path = require("path")
// const DesignUpload = require("../models/DesignSchema")
// const User = require("../models/UserSchema")
// const fs = require("fs")

// //first i am defining a storage the file will store
// //and the filename
// const cloudinary = require("cloudinary").v2
// require("dotenv").config()
// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const userFolder = path.join(
//       __dirname,
//       "./uploads",
//       req.user._id.toString()
//     )
//     fs.mkdirSync(userFolder, {recursive: true})
//     cb(null, userFolder)
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     )
//   },
// })
// const storage2 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const userFolder = path.join(
//       __dirname,
//       "./Videouploads",
//       req.user._id.toString()
//     )
//     fs.mkdirSync(userFolder, {recursive: true})
//     cb(null, userFolder)
//   },
//   filename: (req, file, cb) => {
//     // Save file with userId, timestamp, and original file extension
//     const fileExtension = path.extname(file.originalname) // Get the original file extension
//     cb(null, req.user._id.toString() + "-" + Date.now() + fileExtension)
//   },
// })
// const storage3 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const userFolder = path.join(
//       __dirname,
//       "./BothVideouploads",
//       req.user._id.toString()
//     )

//     const fileTypeFolder = file.mimetype.startsWith("image/")
//       ? "images"
//       : "videos"

//     const finalFolder = path.join(userFolder, fileTypeFolder)

//     fs.mkdirSync(finalFolder, {recursive: true})
//     cb(null, finalFolder)
//   },
//   filename: (req, file, cb) => {
//     const fileExtension = path.extname(file.originalname) // Get the original file extension
//     cb(null, req.user._id.toString() + "-" + Date.now() + fileExtension)
//   },
// })

// const storage4 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const userFolder = path.join(
//       __dirname,
//       "./uploadsProfile",
//       req.user._id.toString()
//     )
//     fs.mkdirSync(userFolder, {recursive: true})
//     cb(null, userFolder)
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     )
//   },
// })

// // initialize upload middleware
// const upload = multer({storage: storage}).fields([
//   {name: "image", maxCount: 1},
//   {name: "side_images[]", maxCount: 3},
// ])
// const upload2 = multer({storage: storage2}).fields([
//   {name: "video", maxCount: 1},
// ])
// const upload3 = multer({storage: storage3}).fields([
//   {name: "image", maxCount: 1},
//   {name: "video", maxCount: 1},
// ])
// const upload4 = multer({storage: storage4}).fields([
//   {name: "image", maxCount: 1},
// ])

// // handeling User Image upload

// const UserPostImage = async (req, res) => {
//   upload(req, res, async err => {
//     if (err) {
//       console.log("Not getting any file")
//       return res.status(400).json({error: "File upload error"})
//     } else {
//       //Stage 1
//       console.log("getting from first and this is image", req.files.image)
//       console.log(
//         "getting from first and this is sideImages",
//         req.files["side_images[]"]
//       )
//       console.log(
//         "getting from first and this is description",
//         req.body.description
//       )
//     }
//     //Stage 2
//     if (!req.files || !req.files.image || req.files.image.length === 0) {
//       console.log("Files is missing at stage 2")
//       return res.status(400).json({error: "Image file is missing"})
//     }

//     //stage 3
//     // Access the uploaded image file
//     const imageFile = req.files.image[0]
//     const side_images = req.files["side_images[]"] || []
//     console.log("img file is at stage3", imageFile.path)
//     side_images.forEach((image, index) => {
//       console.log("sideImage file is at stage3", image.path)
//     })

//     //Getting Description and Title
//     const Description = JSON.parse(req.body.description)
//     console.log("Des and title", Description.Des, Description.Title)
//     // res.status(200).json({success: true})
//     // checking user is there or nots
//     if (req.user) {
//       try {
//         // Cloudinary upload
//         const result = await cloudinary.uploader.upload(imageFile.path, {
//           folder: "folder_name",
//           quality: "auto:eco",
//         })
//         const ProfileImage = await User.findById(req.user._id)
//         // const result2 = await cloudinary.uploader.upload(
//         //   ProfileImage.userImage,
//         //   {
//         //     folder: "folder_name",
//         //   }
//         // )
//         // console.log("ProfileImage", result2.secure_url)
//         //stage 4
//         let sideImageUrl = []
//         for (const image of side_images) {
//           try {
//             const side_imagesResult = await cloudinary.uploader.upload(
//               image.path,
//               {
//                 folder: "folder_name/side_images",
//                 quality: "auto:eco",
//               }
//             )
//             sideImageUrl.push(side_imagesResult.secure_url)
//             console.log(
//               "side images uploaded succcess fully",
//               side_imagesResult.secure_url
//             )
//           } catch (error) {
//             console.log("error while uploading side images", error)
//           }
//         }

//         console.log("url is at stage 4", result.secure_url)
//         console.log(result)
//         console.log(`image size , ${result.bytes / 1024}kb`)

//         // Save to database
//         const userId = req.user._id
//         const ProfileImagee = await User.findById(req.user._id)

//         await DesignUpload.create({
//           UserProfileImage: ProfileImagee.userImage,
//           sideImages: sideImageUrl,
//           title: Description.Title,
//           description: Description.Des,
//           images: result.secure_url,
//           tags: req.body.tags,
//           creator: userId,
//           likes: [],
//           saves: [],
//           comments: [],
//         })

//         console.log("File is uploaded and saved to DB")
//         return res.status(200).json({success: true})
//       } catch (error) {
//         console.error("Error uploading to Cloudinary or saving to DB", error)
//         return res.status(500).json({
//           success: false,
//           error: "Upload failed",
//           details: error.message,
//         })
//       }
//     } else {
//       console.log("User is not logged in")
//       return res.status(401).json({success: true, msg: "User is not logged in"})
//     }
//   })
// }

// const UserVideo = async (req, res) => {
//   upload2(req, res, async err => {
//     if (err) {
//       return res.status(500).json({error: "File upload failed", details: err})
//     } else {
//       //Stage 1
//       console.log("getting from first and this is image", req.files.image)
//       console.log(
//         "getting from first and this is description",
//         req.body.description
//       )
//     }
//     //Stage 2
//     if (!req.files || !req.files.video) {
//       return (
//         console.log("Files is missing at stage 2"),
//         res.status(400).json({error: "Image file is missing"})
//       )
//     }
//     //stage 3
//     // Access the uploaded video file
//     const imageFile = req.files.video[0]
//     console.log("img file is at stage3", imageFile.path)
//     const ProfileImage = await User.findById(req.user._id)
//     const result2 = await cloudinary.uploader.upload(ProfileImage.userImage, {
//       folder: "folder_name",
//     })
//     console.log("ProfileImage", result2.secure_url)

//     //Getting Description and Title
//     const Description = JSON.parse(req.body.description)
//     console.log("Des and title", Description.Des, Description.Title)
//     if (req.user) {
//       try {
//         const result = await cloudinary.uploader.upload(imageFile.path, {
//           resource_type: "video",
//           quality: "auto:eco",
//         })
//         res.json({imageUrl: result.secure_url})
//         console.log(result)
//         console.log(`image size , ${result.bytes / 1024}kb`)

//         //save to database
//         const userId = req.user._id

//         if (result.secure_url) {
//           await DesignUpload.create({
//             UserProfileImage: result2.secure_url,
//             title: Description.Title,
//             description: Description.Des,
//             video: result.secure_url,
//             tags: req.body.tags,
//             creator: userId,
//             likes: [],
//             saves: [],
//             comments: [],
//           })

//           // DesignUpload.findByIdAndUpdate(userId, {
//           //   $push: { CreatedProject2: [{ video: result.secure_url }] },
//           // });
//           console.log("File is uploaded and save to db")
//           res.status(200).json({success: true})
//         } else {
//           console.log("Not got the url")
//         }
//       } catch (error) {
//         console.log("erro while both didnt work ", error)
//         res.status(200).json({success: false})
//       }
//     } else {
//       console.log("Req.user is not there")
//       res.status(200).json({success: false})
//     }
//   })

//   // if (userId) {
//   //   try {
//   //     // const result = await cloudinary.uploader.upload(req.)
//   //   } catch (error) {}
//   // } else {
//   //   res.json({ msg: "User is not Logged in" });
//   // }
// }
// const Both = async (req, res) => {
//   upload3(req, res, async err => {
//     if (err) {
//       console.log("Not getting any file")
//     } else {
//       //Stage 1
//       console.log("getting from first and this is image", req.files.image)
//       console.log(
//         "getting from first and this is description",
//         req.body.description
//       )
//     }
//     //Stage 2
//     if (!req.files || !req.files.image || req.files.image.length === 0) {
//       return (
//         console.log("Files is missing at stage 2"),
//         res.status(400).json({error: "Image file is missing"})
//       )
//     }

//     //stage 3
//     // Access the uploaded image and Video file
//     const imageFile = req.files.image[0]
//     const VideoFile = req.files.video[0]
//     console.log("img file is at stage3", imageFile.path)
//     const ProfileImage = await User.findById(req.user._id)
//     const result2 = await cloudinary.uploader.upload(ProfileImage.userImage, {
//       folder: "folder_name",
//     })
//     console.log("ProfileImage", result2.secure_url)

//     //Getting Description and Title
//     const Description = JSON.parse(req.body.description)
//     console.log("Des and title", Description.Des, Description.Title)

//     // checking user is there or nots
//     if (req.user) {
//       try {
//         // Cloudinary upload
//         const result = await cloudinary.uploader.upload(imageFile.path, {
//           folder: "folder_name",
//           quality: "auto:eco",
//         })
//         const result2 = await cloudinary.uploader.upload(VideoFile.path, {
//           folder: "folder_name",
//           quality: "auto:eco",
//           resource_type: "video",
//         })
//         res.json({imageUrl: result.secure_url, VideoUrl: result2.secure_url})
//         //stage 4
//         console.log("Image url is at stage 4", result.secure_url)
//         console.log(result)
//         console.log(`image size , ${result.bytes / 1024}kb`)
//         console.log("Video url is at stage 4", result.secure_url)
//         console.log(result)
//         console.log(`video size , ${result.bytes / 1024}kb`)

//         // Save to database
//         const userId = req.user._id

//         await DesignUpload.create({
//           UserProfileImage: result2.secure_url,
//           title: Description.Title,
//           description: Description.Des,
//           images: result.secure_url,
//           video: result2.secure_url,
//           tags: req.body.tags,
//           creator: userId,
//           likes: [],
//           saves: [],
//           comments: [],
//         })

//         console.log("File is uploaded and saved to DB")
//         res.status(200).json({success: true})
//       } catch (error) {
//         console.error("Error uploading to Cloudinary or saving to DB", error)
//         res.status(500).json({
//           success: false,
//           error: "Upload failed",
//           details: error.message,
//         })
//       }
//     } else {
//       console.log("User is not logged in")
//       res.status(401).json({success: false, msg: "User is not logged in"})
//     }
//   })
// }

// const GetImage = async (req, res) => {
//   const userId = req.user.id
//   try {
//     const image = await UserData.find({UserId: userId})
//     console.log(image)
//   } catch (error) {}
// }

// module.exports = {GetImage, UserPostImage, UserVideo, Both}

const multer = require("multer")
const path = require("path")
const DesignUpload = require("../models/DesignSchema")
const User = require("../models/UserSchema")
const fs = require("fs")
const {error} = require("console")

const cloudinary = require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
})

// mene Cloudnary ko initialize kiya
//first step to upload images video and side image is to
//setup cloudnary that i did

// NEXT MAIN STEP TO DECLARE single Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = path.join(
      __dirname,
      "./uploads",
      req.user._id.toString()
    )
    const fileTypeFolder = file.mimetype.startsWith("image/")
      ? "images"
      : "videos"
    const finalFolder = path.join(userFolder, fileTypeFolder)
    fs.mkdirSync(finalFolder, {recursive: true})
    cb(null, finalFolder)
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname)
    cb(null, req.user._id.toString() + "-" + Date.now() + fileExtension)
  },
})

//after we declare how to store the image now we are tell or
// adding middleware to say multer to accept what type of image video and sideImages[]
const upload = multer({storage: storage}).fields([
  {name: "image", maxCount: 1},
  {name: "video", maxCount: 1},
  {name: "side_images[]", maxCount: 3},
])

const UserPostMedia1 = async (req, res) => {
  upload(req, res, async err => {
    if (err) {
      console.log("File uploade error at stage 0", err)
      return res.status(400).json({
        error: "File upload failed",
        details: err.message,
        success: false,
        status: "failed",
      })
    }

    //stage 1 print the files and forminput
    console.log("Received files", req.files)
    console.log("Received userFormInput", req.body.userFormInput)

    //Stage2 check koi file he ki nahi

    if (
      !req.files ||
      (!req.files.image &&
        !req.files.video &&
        (!req.files["side_images[]"] ||
          req.files["side_images[]"].length === 0))
    ) {
      console.log("No file uploaded at stage 2")
      return res.status(400).json({
        error: "No file Detected in backend At lease upload 1 image",
        success: false,
        status: "failed",
      })
    }

    //stage3 first Get a user
    const userProfile = await User.findById(req.user._id)
    if (!userProfile) {
      console.log("User not found")
      return res
        .status(401)
        .json({success: false, msg: "User not found", status: "failed"})
    }

    // stage 4 get a form input data from user

    const userFormInput = JSON.parse(req.body.userFormInput || "{}")
    const {
      Des = "",
      Title = "",
      tags = [],
      dropdownValue = "",
      dropdownValue2 = "",
      linkset = [],
    } = userFormInput

    let mainImageUrl = null
    let mainVideoUrl = null
    let sideImageUrls = []

    try {
      if (req.files.image && req.files.image.length > 0) {
        const imageFile = req.files.image[0]
        const resource_type = imageFile.mimetype.startsWith("video/")
          ? "video"
          : "image"
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "folder_name",
          resource_type: resource_type,
          quality: "auto:eco",
        })
        if (resource_type === "image") {
          mainImageUrl = result.secure_url
          console.log("Main image uploaded", mainImageUrl)
        } else {
          mainVideoUrl = result.secure_url
          console.log("main video uploaded from image field", mainVideoUrl)
        }
      }
      // if (req.files.video && req.files.video.length > 0) {
      //   const videoFile = req.files.video[0]
      //   const result = await cloudinary.uploader.upload(videoFile.path, {
      //     folder: "folder_name",
      //     resource_type: "video",
      //     quality: "auto:eco",
      //   })
      //   mainVideoUrl = result.secure_url
      //   console.log("Main video uploaded:", mainVideoUrl)
      // }

      if (req.files.video && req.files.video.length > 0) {
        const videoFile = req.files.video[0]
        const result = await cloudinary.uploader.upload(videoFile.path, {
          folder: "folder_name",
          resource_type: "video",
          quality: "auto:eco",
        })
        mainVideoUrl = result.secure_url
        console.log("Main video uploaded:", mainVideoUrl)
      }

      if (req.files["side_images[]"] && req.files["side_images[]"].length > 0) {
        for (const sideFile of req.files["side_images[]"]) {
          const result = await cloudinary.uploader.upload(sideFile.path, {
            folder: "folder_name/side_media",
            resource_type: sideFile.mimetype.startsWith("video/")
              ? "video"
              : "image",
            quality: "auto:eco",
          })
          sideImageUrls.push(result.secure_url)
          console.log("Side media uploaded:", result.secure_url)
        }
      }

      // Stage 4: Save to database
      const userId = req.user._id
      const profileImageUrl = userProfile.userImage
        ? await cloudinary.uploader.upload(userProfile.userImage, {
            folder: "folder_name",
          })
        : null

      const newDesign = await DesignUpload.create({
        UserProfileImage: profileImageUrl?.secure_url || userProfile.userImage,
        title: Title,
        description: Des,
        images: mainImageUrl,
        video: mainVideoUrl,
        sideImages: sideImageUrls,
        tags: tags,
        category: dropdownValue, // From dropdownValue
        tools: dropdownValue2, // From dropdownValue2
        externalLinks: linkset, // From linkset
        creator: userId,
        likes: [],
        saves: [],
        comments: [],
      })

      console.log("Media uploaded and saved to DB:", newDesign)
      return res
        .status(200)
        .json({success: true, data: newDesign, status: "succeeded"})
    } catch (error) {
      console.error("Error uploading to Cloudinary or saving to DB:", error)
      return res.status(500).json({
        success: false,
        status: "failed",
        error: "Upload failed",
        details: error.message,
      })
    }
  })
}
const UserPostMedia = async (req, res) => {
  res.json({status: "succeeded", success: true})
  // res.json({status: "failed", success: false})
}

// **New function for updating existing posts**
const UserPostUpdateMedia = async (req, res) => {
  upload(req, res, async err => {
    let mainImageFile = req.files.image && req.files.image[0]
    let mainVideoFile = req.files.video && req.files.video[0]
    let newSideFiles = req.files["side_images[]"]
    if (err) {
      console.error("File upload error during update:", err)
      // More detailed error for Multer specific issues
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({error: "Multer error during update", details: err.message})
      }
      return res
        .status(400)
        .json({error: "File upload failed during update", details: err.message})
    }

    const postId = req.params.id // Expecting ID from URL like /update/:id
    if (!postId) {
      console.log("No Post ID provided for update (from req.params.id).")
      return res.status(400).json({error: "No post ID provided in URL."})
    }

    try {
      const designToUpdate = await DesignUpload.findById(postId)
      if (!designToUpdate) {
        console.log(`Design with ID ${postId} not found.`)
        return res.status(404).json({success: false, msg: "Post not found"})
      }

      // Optional: Check if the current user is the creator of the post
      // Ensure req.user._id is populated by your authentication middleware
      if (
        req.user &&
        designToUpdate.creator.toString() !== req.user._id.toString()
      ) {
        console.log("Unauthorized attempt to update post by different user.")
        return res
          .status(403)
          .json({success: false, msg: "Unauthorized to update this post"})
      }

      const userFormInput = JSON.parse(req.body.userFormInput || "{}")
      const {
        Des,
        Title,
        tags,
        dropdownValue, // Category
        dropdownValue2, // Tools
        linkset, // External Links
        visibility,
      } = userFormInput

      // Initialize update fields with existing data
      let newMainImageUrl =
        designToUpdate.images && designToUpdate.images.length > 0
          ? designToUpdate.images[0] // Safely get the first image URL if it exists
          : null
      let newMainVideoUrl = designToUpdate.video || null
      let newSideImageUrls = designToUpdate.sideImages
        ? [...designToUpdate.sideImages]
        : [] // Clone array to modify

      // Destructure files for easier access

      // --- Handle new main image/video upload ---
      if (mainImageFile) {
        // Delete old main media (image or video) if a new image is provided
        if (newMainImageUrl && typeof newMainImageUrl === "string") {
          try {
            // Extract public ID including folder_name
            const urlParts = newMainImageUrl.split("/")
            const uploadIndex = urlParts.indexOf("upload")
            if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
              const publicIdWithFolder = urlParts
                .slice(uploadIndex + 2)
                .join("/")
                .split(".")[0]
              await cloudinary.uploader.destroy(publicIdWithFolder)
              console.log(
                `Old main image ${publicIdWithFolder} deleted from Cloudinary.`
              )
            } else {
              console.warn(
                "Could not extract public ID from old main image URL for deletion:",
                newMainImageUrl
              )
            }
          } catch (deleteError) {
            console.error(
              "Error deleting old main image from Cloudinary:",
              deleteError
            )
          }
        } else if (newMainVideoUrl && typeof newMainVideoUrl === "string") {
          try {
            // Extract public ID including folder_name
            const urlParts = newMainVideoUrl.split("/")
            const uploadIndex = urlParts.indexOf("upload")
            if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
              const publicIdWithFolder = urlParts
                .slice(uploadIndex + 2)
                .join("/")
                .split(".")[0]
              await cloudinary.uploader.destroy(publicIdWithFolder, {
                resource_type: "video",
              })
              console.log(
                `Old main video ${publicIdWithFolder} deleted from Cloudinary.`
              )
            } else {
              console.warn(
                "Could not extract public ID from old main video URL for deletion:",
                newMainVideoUrl
              )
            }
          } catch (deleteError) {
            console.error(
              "Error deleting old main video from Cloudinary:",
              deleteError
            )
          }
        }
        // Upload new image
        const result = await cloudinary.uploader.upload(mainImageFile.path, {
          folder: "folder_name",
          resource_type: mainImageFile.mimetype.startsWith("video/")
            ? "video"
            : "image",
          quality: "auto:eco",
        })
        if (mainImageFile.mimetype.startsWith("image/")) {
          newMainImageUrl = result.secure_url
          newMainVideoUrl = null // Clear video URL if image is uploaded
        } else {
          // It's a video treated as 'image' field for main
          newMainVideoUrl = result.secure_url
          newMainImageUrl = null // Clear image URL if video is uploaded
        }
        console.log("New main media uploaded during update:", result.secure_url)
      } else if (mainVideoFile) {
        // Separate explicit video field upload (if your frontend uses it separately)
        // Delete old main media (image or video) if a new video is provided
        if (newMainImageUrl && typeof newMainImageUrl === "string") {
          try {
            const urlParts = newMainImageUrl.split("/")
            const uploadIndex = urlParts.indexOf("upload")
            if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
              const publicIdWithFolder = urlParts
                .slice(uploadIndex + 2)
                .join("/")
                .split(".")[0]
              await cloudinary.uploader.destroy(publicIdWithFolder)
              console.log(
                `Old main image ${publicIdWithFolder} deleted from Cloudinary (due to new video upload).`
              )
            } else {
              console.warn(
                "Could not extract public ID from old main image URL for deletion (due to new video):",
                newMainImageUrl
              )
            }
          } catch (deleteError) {
            console.error(
              "Error deleting old main image (due to new video) from Cloudinary:",
              deleteError
            )
          }
        } else if (newMainVideoUrl && typeof newMainVideoUrl === "string") {
          try {
            const urlParts = newMainVideoUrl.split("/")
            const uploadIndex = urlParts.indexOf("upload")
            if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
              const publicIdWithFolder = urlParts
                .slice(uploadIndex + 2)
                .join("/")
                .split(".")[0]
              await cloudinary.uploader.destroy(publicIdWithFolder, {
                resource_type: "video",
              })
              console.log(
                `Old main video ${publicIdWithFolder} deleted from Cloudinary.`
              )
            } else {
              console.warn(
                "Could not extract public ID from old main video URL for deletion:",
                newMainVideoUrl
              )
            }
          } catch (deleteError) {
            console.error(
              "Error deleting old main video from Cloudinary:",
              deleteError
            )
          }
        }
        // Upload new video
        const result = await cloudinary.uploader.upload(mainVideoFile.path, {
          folder: "folder_name",
          resource_type: "video",
          quality: "auto:eco",
        })
        newMainVideoUrl = result.secure_url
        newMainImageUrl = null // Clear image URL if video is uploaded
        console.log("New main video uploaded during update:", newMainVideoUrl)
      }

      // --- Handle side images update ---
      // IMPORTANT: This logic only appends new side images.
      // If you want to allow:
      // 1. Replacing ALL side images: You'd need to delete existing `designToUpdate.sideImages` from Cloudinary first, then `newSideImageUrls = []` before iterating `newSideFiles`.
      // 2. Selective replacement/deletion: Requires more complex frontend logic (e.g., sending IDs of images to delete, or a new array structure).
      if (newSideFiles && newSideFiles.length > 0) {
        const uploadedNewSideImages = []
        for (const sideFile of newSideFiles) {
          const result = await cloudinary.uploader.upload(sideFile.path, {
            folder: "folder_name/side_media", // Consider a subfolder for side media
            resource_type: sideFile.mimetype.startsWith("video/")
              ? "video"
              : "image",
            quality: "auto:eco",
          })
          uploadedNewSideImages.push(result.secure_url)
          console.log(
            "New side media uploaded during update:",
            result.secure_url
          )
        }
        newSideImageUrls = [...newSideImageUrls, ...uploadedNewSideImages] // Append new side images
      }
      // Consider adding logic here if the frontend wants to explicitly *remove* all side images
      // e.g., if the userFormInput included a flag like `clearSideImages: true`

      // --- Update the DesignUpload document in MongoDB ---
      const updateFields = {
        title: Title || designToUpdate.title,
        description: Des || designToUpdate.description,
        // The `images` field stores an array. We are now storing the main image as the first element of this array.
        images: newMainImageUrl ? [newMainImageUrl] : [], // Ensure it's an array if not null
        video: newMainVideoUrl, // Store video URL separately
        sideImages: newSideImageUrls, // Array of side image/video URLs
        tags: tags || designToUpdate.tags,
        category: dropdownValue || designToUpdate.category, // Assuming 'category' is stored in dropdownValue
        tools: dropdownValue2 || designToUpdate.tools, // Assuming 'tools' is stored in dropdownValue2
        externalLinks: linkset || designToUpdate.externalLinks,
        visibility: visibility || designToUpdate.visibility, // Use the new visibility
      }

      const updatedDesign = await DesignUpload.findByIdAndUpdate(
        postId,
        updateFields,
        {new: true, runValidators: true} // `new: true` returns the updated document, `runValidators: true` runs schema validators
      )

      console.log("Media updated in DB:", updatedDesign)
      return res.status(200).json({success: true, data: updatedDesign})
    } catch (error) {
      console.error("Error during post update process:", error)
      return res.status(500).json({
        success: false,
        error: "Update failed",
        details: error.message,
      })
    } finally {
      // --- Clean up uploaded files from local storage ---
      // Make sure 'fs' is imported: `const fs = require('fs');`
      if (mainImageFile) {
        fs.unlink(mainImageFile.path, err =>
          err ? console.error("Error deleting temp main image:", err) : null
        )
      }
      if (mainVideoFile) {
        fs.unlink(mainVideoFile.path, err =>
          err ? console.error("Error deleting temp main video:", err) : null
        )
      }
      if (newSideFiles && newSideFiles.length > 0) {
        newSideFiles.forEach(file =>
          fs.unlink(file.path, err =>
            err ? console.error("Error deleting temp side file:", err) : null
          )
        )
      }
    }
  })
}

module.exports = {UserPostMedia, UserPostUpdateMedia}
