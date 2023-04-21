import { createClient } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import { CLIENT_TOKEN, PUBLIC_ID } from "@env";

export const client = createClient({
  projectId: PUBLIC_ID,
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: true,
  token: CLIENT_TOKEN,
});

export const getPosts = async (page) => {
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc){
      title,
      excerpt, 
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc), 
      postedBy -> {
        _id,
        name, 
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          name,
          image
        },
      },
      comments[] {
      	_key, 
      	postedBy -> {
          _id,
          name,
          image
        },
      }, 
      _createdAt
    }[${page * 1}...${(page === 0 ? 1 : page) * 20}]`
  );
  return posts;
};

export const singlePost = async (postId) => {
  const result = client.fetch(`*[_type == "post" && _id match "${postId}"]{
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      categories[]-> | order(title asc),
      body,
      title, 
      excerpt, 
      postedBy -> {
        _id,
        name, 
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          name,
          image
        },
      },
      comments[] {
        _key,
        comment, 
      	postedBy -> {
          _id,
          name, 
          image
        },
        createdAt,
        publishedAt,
      } | order(createdAt asc), 
      _createdAt,
      publishedAt,
    }`);
  return result;
};
