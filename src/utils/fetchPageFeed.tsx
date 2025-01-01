import axios from "axios";
import api from "./api";

const PAGE_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_FACEBOOK_PAGEID || "";
const POST_LIMIT = import.meta.env.VITE_REACT_APP_FACEBOOK_POST_LIMIT || 15;

// Fields Constants
const POST_FIELDS = "id,message,created_time,picture,full_picture,attachments{media_type,media},reactions.summary(total_count),comments.summary(total_count),shares,video_tags,videos{source,description,thumbnails}";
const POST_PAGEINFO_FIELDS = "picture{url},name,link"; 

// Function to fetch Facebook page feed
export const fetchPageFeed = async () => {
  try {

    // Fetch page profile picture
    const pageInfoResponse = await api.get(`/GetFacebookPageInfo`, 
      {
      params: { 
        pageId: PAGE_ID,
        postFields: POST_PAGEINFO_FIELDS
      },
    });  

    // Fetch page posts
    const fetchPosts = await api.get(`/GetFacebookPagePosts`, 
      {
      params: { 
        pageId: PAGE_ID,
        postFields: POST_FIELDS,
        limit: POST_LIMIT
      },
    });    

    // Combine data
    return {
      profilePictureUrl: pageInfoResponse.data.picture.data.url,
      pageName: pageInfoResponse.data.name,
      pageUrl: pageInfoResponse.data.link, // Include the page URL
      posts: fetchPosts.data.data,
    };
  } catch (error) {
    console.error("Error fetching page feed:", error);
    return { profilePictureUrl: "", pageName: "", pageUrl: "", posts: [] }; // Include pageUrl in error case
  }
};
