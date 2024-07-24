import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  href: string;
  description: string;
  date: string;
  datetime: string;
  category: {
    title: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
  };
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your Contentful API keys and space ID
        const response = await axios.get(
          `https://cdn.contentful.com/spaces/ep34px3lef3m/environments/master/entries?content_type=pageBlogPost&access_token=hZT9kUXUZmg_0Ur54wYHZLniPuAoIrL7g2I_gkW48sI&order=-fields.publishedDate&limit=3`
        );

        // Extract relevant data from Contentful response
        const fetchedPosts = response.data.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title,
          href: `https://blog.cortanatechsolutions.com/${item.fields.slug}`, // Example URL, adjust as needed
          description: item.fields.shortDescription || "", // Adjust for actual field name
          date: new Date(item.fields.publishedDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
          datetime: new Date(item.fields.publishedDate).toISOString(),
          category: {
            title: item.fields.category?.title || "", // Adjust for actual field name
            href: "#", // Example URL, adjust as needed
          },
          author: {
            name: item.fields.author?.name || "", // Adjust for actual field name
            role: item.fields.author?.role || "", // Adjust for actual field name
            href: "#", // Example URL, adjust as needed
            imageUrl: item.fields.author?.imageUrl || "", // Adjust for actual field name
          },
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div id="Blog" className="relative isolate overflow-hidden py-24 sm:py-32">
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/images/blog.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-white pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Recommended for security reasons
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a
                    href={post.href}
                    className="transition hover:text-blue-500 hover:text-blue-400"
                  >
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <span className="text-sm font-semibold leading-6 text-white">
            Want to see more?
          </span>
          <a
            href="https://blog.cortanatechsolutions.com"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go here <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
