/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            }
        )
        return cfg
    },
    async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false, // Temporary so cache doesn't stick during dev
      },
    ];
  },
};

export default nextConfig;
