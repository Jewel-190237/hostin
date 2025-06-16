module.exports = {
    env: {
      backend_url:
        process.env.NODE_ENV === "production"
          ? "http://localhost:5000/"
          : "http://localhost:5000/",
      socket_io_url:
        process.env.NODE_ENV === "production"
          ? "http://localhost:5000/"
          : "http://localhost:5000/",
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "appstick.s3.ap-southeast-1.amazonaws.com",
        },
      ],
    },
  };
  