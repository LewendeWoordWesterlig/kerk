"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function YouTubeSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // 🔑 your YouTube API key
  const CHANNEL_ID = "UCc2kKqWD7t0xAIMzWg4tzCA"; // 🔔 replace with your channel ID
  const MAX_RESULTS = 6;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        const data = await res.json();

        if (data.items) {
          const formatted = data.items
            .filter((item: any) => item.id.kind === "youtube#video")
            .map((item: any) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
            }));
          setVideos(formatted);
        }
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <Youtube className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gray-800">Ons YouTube Kanaal</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kyk ons nuutste dienste en boodskappe direk vanaf YouTube.
          </p>
        </motion.div>

        {/* Videos */}
        {loading ? (
          <p className="text-gray-500">Laai videos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition block"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-gray-800 font-semibold text-sm line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Button */}
        <motion.a
          href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-md transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Gaan na YouTube
        </motion.a>
      </div>
    </section>
  );
}
