"use client"
import React, {useState} from "react"
import "./dashboardComponents.scss"

const MypostsPopup = ({setpopupClicked, data}) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    tags: data.tags || "",
    visibility: data.visibility || "public",
    coverImage: data.coverImage || "",
  })

  const handleChange = e => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    setFormData(prev => ({...prev, coverImage: URL.createObjectURL(file)}))
  }

  const handleSave = () => {
    console.log("Saving data:", formData)
    // Call your update API here
    setpopupClicked(false)
  }

  return (
    <div className="modal">
      <div onClick={() => setpopupClicked(false)} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Your Project</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />

        <label>Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />

        <label>Visibility</label>
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="password">Password Protected</option>
        </select>

        <label>Cover Image</label>
        <input type="file" onChange={handleImageChange} />
        {formData.images && (
          <img
            src={formData.images}
            alt="cover preview"
            style={{width: "100%", marginTop: "10px", borderRadius: "8px"}}
          />
        )}

        {/* Optional Collaborator field */}
        {/* <label>Collaborators</label>
        <input type="text" name="collaborators" placeholder="email1, email2" /> */}

        <div className="popup-actions">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setpopupClicked(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default MypostsPopup
