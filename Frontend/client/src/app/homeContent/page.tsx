"use client"
import React, {useEffect, useRef, useState} from "react"
import {
  fetchHomeContent,
  setPageIncrease,
} from "@/ReduxStore/slices/homeContentSlice"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {
  CheckUserInteraction2,
  toggleLikePost,
} from "@/ReduxStore/slices/userInteractionSlice"
import SkeletonLoader from "@/components/skeleton/Skeleton"
import Link from "next/link"
import {FaHeart} from "react-icons/fa"
import "./Sexplore.scss"

const Page = () => {
  const dispatch = useAppDispatch()
  const Data = useAppSelector(state => state.homeContentReducer.homeContent)
  const hasMorePost = useAppSelector(
    state => state.homeContentReducer.hasMorePost
  )
  const page = useAppSelector(state => state.homeContentReducer.page)
  const {user, loading} = useAppSelector(state => state.AuthenticationReducer)
  const {liked, likingInProgress} = useAppSelector(
    state => state.userInteractionReducer
  )
  const [localLikeCounts, setLocalLikeCounts] = useState<{
    [key: string]: number
  }>({})
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

  const handleLikeToggle = async (postId: string) => {
    if (!user) {
      return
    }
    const isCurrentlyLiked = liked?.[postId] || false
    const currentCount = localLikeCounts[postId] || 0

    setLocalLikeCounts(prev => ({
      ...prev,
      [postId]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1,
    }))

    try {
      await dispatch(toggleLikePost(postId)).unwrap()
    } catch {
      setLocalLikeCounts(prev => ({
        ...prev,
        [postId]: currentCount,
      }))
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
                  <video muted autoPlay loop className="mgand" src={f.video} />
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
      <div ref={LoadingRef} className="loading" />
      {hasMorePost && <SkeletonLoader count={6} />}
    </>
  )
}

export default Page
