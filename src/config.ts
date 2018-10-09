export const config = {
    name: process.env.npm_package_name,
    port: process.env.PORT || 3000,
    version: process.env.npm_package_version,
    apiPath: "/api",
    mongoDb: {
        connectionString: "mongodb://localhost:27017/test",
    },
}
