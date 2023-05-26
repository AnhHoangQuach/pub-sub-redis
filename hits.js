const redis = require('./connections/init.redis')

async function addVideo(videoId) {
  console.log(await redis.set(`video::${videoId}`, 0))
}

async function playVideo(videoId, userId) {
  try {
    const keyVideoId = `video::${videoId}`,
      keyUserId = `user::${userId}`

    const isOk = await redis.set(keyUserId, videoId, 'NX', 'EX', 10)
    if (isOk === 'OK') {
      await redis.incrby(keyVideoId, 1)
    }

    console.log(await redis.get(keyVideoId))
  } catch (error) {}
  //   await redis.incrby(`video::${videoId}`, 1)
  //   console.log(await redis.get(`video::${videoId}`))
}

// addVideo(10001)
playVideo(10002, 999)
