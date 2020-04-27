if (process.env.NODE_ENV === "production") {
    module.exports = require('./configureStore.prod.jsx')
} else {
    module.exports = require('./configureStore.dev.jsx')
}

// using CommonJS require to dynamically import during build-time
// Note
    // CommonJS was popularized by Node