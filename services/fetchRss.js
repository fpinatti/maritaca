const fetch = require('node-fetch')
const parseString = require('xml2js').parseString
const fs = require('fs')
const { convert } = require('html-to-text')
const {
  log
} = require('./utils/logger')
const args = process.argv.slice(2)
const data = []
const resourceList = {
  fe: [{
    provider_title: 'Smashing Magazine',
    feedUrl: 'https://www.smashingmagazine.com/categories/javascript/index.xml',
    provider_url: 'https://www.smashingmagazine.com'
  },
  {
    provider_title: 'Codrops',
    feedUrl: 'https://tympanus.net/codrops/feed/',
    provider_url: 'https://tympanus.net/codrops'
  },
  {
    provider_title: 'CSS Tricks',
    feedUrl: 'https://css-tricks.com/feed/',
    provider_url: 'https://css-tricks.com'
  },
  {
    provider_title: 'Dev.to',
    feedUrl: 'https://dev.to/feed',
    provider_url: 'https://dev.to'
  },
  {
    provider_title: 'Sitepoint',
    feedUrl: 'https://www.sitepoint.com/feed',
    provider_url: 'https://www.sitepoint.com'
  },
  {
    provider_title: 'Frontend Focus',
    feedUrl: 'https://cprss.s3.amazonaws.com/frontendfoc.us.xml',
    provider_url: 'https://frontendfoc.us/'
  },
  {
    provider_title: 'Speckboy',
    feedUrl: 'https://speckyboy.com/feed/',
    provider_url: 'https://speckyboy.com/'
  },
  {
    provider_title: 'CSS Weekly',
    feedUrl: 'http://feeds.feedburner.com/CSS-Weekly?format=xml',
    provider_url: 'https://css-weekly.com/'
  }],
  tst: [{
    provider_title: 'Testing Xperts',
    feedUrl: 'https://www.testingxperts.com/feed/',
    provider_url: 'https://www.testingxperts.com/'
  },
  {
    provider_title: 'Browser Stack',
    feedUrl: 'https://www.browserstack.com/blog/rss/',
    provider_url: 'https://www.browserstack.com/blog'
  },
  {
    provider_title: 'SQA',
    feedUrl: 'https://sqa.stackexchange.com/feeds?format=xml',
    provider_url: 'https://sqa.stackexchange.com'
  },
  {
    provider_title: 'Ultimate QA',
    feedUrl: 'https://ultimateqa.com/feed/',
    provider_url: 'https://ultimateqa.com'
  },
  {
    provider_title: 'Test Birds',
    feedUrl: 'https://www.testbirds.com/feed/',
    provider_url: 'https://www.testbirds.com/'
  },
  {
    provider_title: 'Test Guild',
    feedUrl: 'https://testguild.com/feed/',
    provider_url: 'https://testguild.com/'
  }],
  data: [{
    provider_title: 'Outlace',
    feedUrl: 'http://outlace.com/feeds/all.atom.xml',
    provider_url: 'http://outlace.com'
  },
  {
    provider_title: 'Rinzewind',
    feedUrl: 'https://rinzewind.org/blog-en/feeds/all.rss.xml',
    provider_url: 'https://rinzewind.org/blog-en/'
  },
  {
    provider_title: 'Data Science degree',
    feedUrl: 'https://datasciencedegree.wisconsin.edu/feed/',
    provider_url: 'https://datasciencedegree.wisconsin.edu/blog/'
  },
  {
    provider_title: 'Towards Data Science',
    feedUrl: 'https://towardsdatascience.com/feed',
    provider_url: 'https://towardsdatascience.com/'
  },
  {
    provider_title: 'Learning with Data',
    feedUrl: 'https://datascienceleadership.substack.com/feed',
    provider_url: 'https://learningwithdata.com/'
  },
  {
    provider_title: 'Learn Analytics Here',
    feedUrl: 'https://learnanalyticshere.wordpress.com/comments/feed/',
    provider_url: 'https://learnanalyticshere.wordpress.com/'
  },
  {
    provider_title: 'Fast Forward Labs',
    feedUrl: 'https://blog.fastforwardlabs.com/index.xml',
    provider_url: 'https://blog.fastforwardlabs.com/'
  },
  {
    provider_title: 'Ryan Swanstrom',
    feedUrl: 'https://ryanswanstrom.com/feed/',
    provider_url: 'https://ryanswanstrom.com/'
  },
  {
    provider_title: 'Data School',
    feedUrl: 'https://www.dataschool.io/rss/',
    provider_url: 'https://www.dataschool.io/'
  },
  {
    provider_title: 'Becoming a data scientist',
    feedUrl: 'https://www.becomingadatascientist.com/feed/',
    provider_url: 'http://www.becomingadatascientist.com/'
  },
  {
    provider_title: 'Beautiful Data',
    feedUrl: 'http://beautifuldata.net/feed/',
    provider_url: 'http://beautifuldata.net/'
  }],
  leader: [{
    provider_title: 'Great Leadership',
    feedUrl: 'https://www.greatleadershipbydan.com/feed',
    provider_url: 'https://www.greatleadershipbydan.com/'
  },
  {
    provider_title: 'Forbes',
    feedUrl: 'https://www.forbes.com/leadership/feed/',
    provider_url: 'https://www.forbes.com/leadership/'
  }]
}

const fetchResources = async (url, info, idx) => {
  log('Fetching...')
  try {
    const rssFetch = url
    const options = {
      method: 'GET'
    }

    const response = await fetch(rssFetch, options)
    const responseText = await response.text()

    parseString(responseText, function (err, convertedJson) {
      if (err) {
        console.log(err)
      }
      appendLoadedData(convertedJson, info, idx)
    })
  } catch (err) {
    log('Error fetching the resource', err)
  }
}

const appendLoadedData = async (jsonData, info, idx) => {
  try {
    for (const element of jsonData.rss.channel[0].item) {
      const text = convert(element.description, { })
      element.plainDescription = `${text.substring(0, 200)}...`
      element.providerTitle = info.provider_title
      element.providerURL = info.provider_url
      element.providerIdx = idx
      data.push(element)
    }
  } catch (err) {
    console.log('Error reading feed', err);
  }
}

const saveJson = (role) => {
  log('Saving feed...')
  const shuffleData = shuffledArr(data)
  const jsonString = JSON.stringify(shuffleData, null, 4)
  fs.writeFileSync(`./public/feed-${role}.json`, jsonString)
}

const shuffledArr = (array) => {
  return array.map(a => ({
    sort: Math.random(),
    value: a
  })).sort((a, b) => a.sort - b.sort).map(a => a.value)
}

const initApp = async (role) => {
  let idx = 0
  const feedPromises = resourceList[role].map(async feed => {
    return await fetchResources(feed.feedUrl, feed, idx++)
  })

  // eslint-disable-next-line no-undef
  await Promise.all(feedPromises)
  saveJson(role)
}

initApp(args[0])
