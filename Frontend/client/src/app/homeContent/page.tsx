"use client"
import React, {useEffect, useRef, useState} from "react"
import {
  fetchHomeContent,
  setPageIncrease,
} from "@/ReduxStore/slices/homeContentSlice"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import SkeletonLoader from "@/components/skeleton/Skeleton"
import Link from "next/link"
import {FaHeart} from "react-icons/fa"
import "./Sexplore.scss"
import {
  CheckUserInteraction2,
  toggleLikePost,
} from "@/ReduxStore/slices/userInteractionSlice"

const Page = () => {
  const dispatch = useAppDispatch()
  const Data = useAppSelector(state => state.homeContentReducer.homeContent)
  console.log(Data)
  const hasMorePost = useAppSelector(
    state => state.homeContentReducer.hasMorePost
  )
  const page = useAppSelector(state => state.homeContentReducer.page)
  const {user, loading} = useAppSelector(state => state.AuthenticationReducer)
  const {liked, likingInProgress} = useAppSelector(
    state => state.userInteractionReducer
  )
  console.log(liked)
  // Local state to track like counts for immediate UI feedback
  const [localLikeCounts, setLocalLikeCounts] = useState<{
    [key: string]: number
  }>({})

  console.log(liked)
  console.log(user)
  const LoadingRef = useRef(null)

  useEffect(() => {
    if (hasMorePost) {
      setTimeout(() => {
        dispatch(fetchHomeContent(page))
      }, 500)
    }
  }, [page, dispatch, hasMorePost])

  useEffect(() => {
    const currentRef = LoadingRef.current
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            dispatch(setPageIncrease())
          }
        },
        {threshold: 1}
      )
      observer.observe(currentRef)
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef)
        }
      }
    }
  }, [Data, dispatch])

  useEffect(() => {
    if (!user && !loading) {
      return
    }
    if (Data) {
      dispatch(CheckUserInteraction2(Data.map(f => f._id)))
    }
  }, [dispatch, Data, user, loading])

  // Initialize local like counts when Data changes
  useEffect(() => {
    if (Data) {
      const counts: {[key: string]: number} = {}
      Data.forEach(post => {
        if (post._id) {
          counts[post._id] = post.likes?.length || 0
        }
      })
      setLocalLikeCounts(counts)
    }
  }, [Data])

  // Test effect - let's manually set some liked data to test
  useEffect(() => {
    if (
      Data &&
      Data.length > 0 &&
      (!liked || Object.keys(liked).length === 0)
    ) {
      console.log("=== TESTING: Manually setting liked data ===")
      // This is just for testing - remove this later
      const testLiked: {[key: string]: boolean} = {}
      Data.forEach((post, index) => {
        if (post._id) {
          // Check if _id is defined
          testLiked[post._id] = index % 2 === 0 // Every other post should be liked
        }
      })
      console.log("Test liked data:", testLiked)
      // Optional: Dispatch testLiked to Redux store or update state
      // Example: dispatch(setTestLiked(testLiked)); // You need to define this action
    }
  }, [Data, liked, dispatch]) // Add dispatch to dependencies if used

  // Debug effect to log liked state
  useEffect(() => {
    console.log("=== LIKED STATE DEBUG ===")
    console.log("Full liked object:", liked)
    console.log("Type of liked:", typeof liked)
    console.log(
      "Is liked an object?",
      typeof liked === "object" && liked !== null
    )

    if (liked) {
      console.log("Keys in liked:", Object.keys(liked))
      console.log("First few entries:", Object.entries(liked).slice(0, 3))
    }

    // // Test with a specific post ID if Data exists
    // if (Data && Data.length > 0) {
    //   const firstPostId = Data[0]._id
    //   console.log(`Testing first post ${firstPostId}:`)
    //   console.log("  - liked[postId]:", liked?.[firstPostId])
    //   console.log("  - liked[postId] === true:", liked?.[firstPostId] === true)
    //   console.log("  - Boolean(liked[postId]):", Boolean(liked?.[firstPostId]))
    // }
    // console.log("=== END DEBUG ===")
  }, [liked, Data])

  const handleLikeToggle = async (postId: string) => {
    if (!user) {
      console.log("User not logged in")
      return
    }

    // --- FIX HERE ---
    // Access liked directly: liked?.[postId]
    const isCurrentlyLiked = liked?.[postId] || false
    const currentCount = localLikeCounts[postId] || 0

    setLocalLikeCounts(prev => ({
      ...prev,
      [postId]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1,
    }))

    try {
      await dispatch(toggleLikePost(postId)).unwrap()
    } catch (error) {
      setLocalLikeCounts(prev => ({
        ...prev,
        [postId]: currentCount,
      }))
      console.error("Error toggling like:", error)
    }
  }

  const isPostLiked = (postId: string) => {
    return liked?.[postId] || false
  }

  return (
    <>
      <div className="flex">
        {Data.map(f => (
          <div key={f._id} className="gand">
            <div className="imageContent">
              <Link href={`/detailInfo/${f._id}`}>
                {f.images && f.images.length > 0 ? (
                  <img className="mgand" src={f.images} alt={f.title} />
                ) : (
                  <video
                    muted
                    autoPlay
                    loop
                    className="mgand"
                    src={f.video}
                  ></video>
                )}
              </Link>
            </div>
            <div className="hover-strip">
              <Link href={`/other/${f.creator?._id}`}>
                <img
                  className="profile"
                  src={f.UserProfileImage}
                  alt="Profile"
                />
              </Link>
              <p className="overlayText">{f.title}</p>
              <div className="like-section">
                <span className="like-count">
                  {localLikeCounts[f._id] || f.likes?.length || 0}
                </span>
                <FaHeart
                  className={`like-button ${
                    isPostLiked(f._id) ? "liked" : "not-liked"
                  } ${likingInProgress ? "liking" : ""}`}
                  onClick={() => handleLikeToggle(f._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={LoadingRef} className="loading"></div>
      {hasMorePost && <SkeletonLoader count={6}></SkeletonLoader>}
    </>
  )
}

export default Page
