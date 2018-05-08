export const config = {
    mode: process.env.NODE_ENV || "development",
    name: process.env.npm_package_name,
    port: process.env.PORT || 3000,
    version: process.env.npm_package_version,
}
