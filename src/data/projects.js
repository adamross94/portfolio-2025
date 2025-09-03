// src/data/projects.js
export const projects = [
  {
    slug:      'streamclout',
    title:     'streamclout.io',
    shortDesc:
      'A real-time analytics platform tracking and visualizing Spotify streaming data, artist performance, and music trends.',
    mediaType: 'video',
    mediaUrl:  'https://portfolio-worthy.s3.amazonaws.com/streamclout-demo.mp4',
    repoUrl:   'https://github.com/your-username/streamclout',
    siteUrl:   'https://streamclout.io',
    sections: [
      {
        heading: 'Introduction',
        content: `streamclout.io brings transparency to music industry streaming metrics by accessing Spotify's internal APIs to track real-time streaming data. By reverse-engineering Spotify's own data endpoints, the platform provides artists, labels, and music enthusiasts with accurate insights into streaming performance that aren't available through official channels. The system continuously monitors play counts across thousands of tracks, enabling trend analysis, artist comparisons, and identification of viral growth patterns.`,
      },
      {
        heading: 'The Technical Challenge',
        content: `The project required solving several significant technical challenges. First, I needed to reverse-engineer Spotify's internal API endpoints that contain streaming data not accessible through their public API. Second, the system had to handle authentication through browser emulation to obtain the necessary tokens. Finally, I needed to design a scalable architecture capable of continuously processing thousands of albums and tracks without exceeding rate limits or encountering stability issues.`,
        image:   '/images/streamclout-arch.png',
        caption: 'High-level architecture diagram of the processing pipeline.',
      },
      {
        heading: 'Reverse Engineering Spotify Internal API',
        content: `To access streaming data not available through Spotify's public API, I used browser debugging tools to identify internal GraphQL endpoints used by Spotify's web player. After mapping the authentication flow and request patterns, I discovered that album and track play count data was accessible through a specific partner endpoint. The system now utilizes Playwright for headless browser automation to capture authentication tokens and maintain access to these internal APIs while respecting rate limits and implementing exponential backoff strategies to ensure reliable data collection.`,
        image:   '/images/streamclout-arch.png',
        caption: 'Authentication flow diagram showing how tokens are intercepted from the Spotify web player.',
      },
      {
        heading: 'Distributed Data Processing Pipeline',
        content: `The heart of StreamClout is a distributed task processing system built with Celery, which manages the continuous collection and analysis of streaming data. The pipeline works in three stages: first, a batch of albums is retrieved from the database; second, each album's track data is fetched from Spotify's API; finally, the streaming metrics are stored and analyzed for trends. This architecture allows for horizontal scaling across multiple worker nodes, automatic retry mechanisms for failed requests, and rate limiting to avoid API bans.`,
        image:   '/images/streamclout-arch.png',
        caption: 'Celery Flower dashboard showing real-time monitoring of the worker cluster and task processing statistics.',
      },
    ],
  },
  {
    slug:      'livestream-art',
    title:     'Livestream Art',
    shortDesc:
      'Real-time artistic transformation of the iconic Abbey Road crossing livestream using computer vision and edge detection.',
    mediaType: 'video',
    mediaUrl:  '/media/livestream-art-demo.mp4',
    repoUrl:   'https://github.com/your-username/livestream-art',
    siteUrl:   'https://livestream-art.example.com',
    sections: [ /* … */ ],
  },
  {
    slug:      'coderview',
    title:     'coderview',
    shortDesc:
      'An AI-powered platform for technical career development, offering resume analysis, GitHub portfolio review, and automated cover letter generation.',
    mediaType: 'video',
    mediaUrl:  '/media/coderview-demo.mp4',
    repoUrl:   'https://github.com/your-username/coderview',
    siteUrl:   'https://coderview.io',
    sections: [ /* … */ ],
  },
  // …other projects…
]
