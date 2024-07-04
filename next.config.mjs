/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
    MONGODB_URI:"mongodb+srv://mehedihasan89:HFu3OZ6rUvvsShQT@todos.qffikos.mongodb.net/todo?retryWrites=true&w=majority&appName=todos",
    API_URL:"https://todo-app-zeta-lime-44.vercel.app/",
    },

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    // other headers omitted for brevity...
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
                ]
            }
        ]
    }

    
};

export default nextConfig;
