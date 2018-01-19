export function getDocsMarkdown() {
    return `<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [About](#about)
  - [What is AboutDevs?](#what-is-aboutdevs)
  - [Inspiration](#inspiration)
  - [Technology stack and credits](#technology-stack-and-credits)
  - [The team](#the-team)
- [FAQ](#faq)
  - [How much does AboutDevs cost?](#how-much-does-aboutdevs-cost)
  - [How does the search work?](#how-does-the-search-work)
  - [Why only LinkedIn is supported for signing in?](#why-only-linkedin-is-supported-for-signing-in)
- [Upcoming features](#upcoming-features)
  - [Technical](#technical)
  - [For developers](#for-developers)
  - [For companies and recruiters](#for-companies-and-recruiters)
- [Community](#community)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

## What is AboutDevs?

AboutDevs is a platform where:

1. Developers can create a professional website, get discoverable and grow their audience. The profile allows linking social
media, uploading CVs and showcasing skills and portfolio. AboutDevs profile URLs are like *aboutdevs.com/[your-user-name]*.
The profile builder was designed with 2 main things in mind: 1) Make it as straightforward as possible. 2) Use a layout 
that looks professional and advertises the most important information about the developer first.

2. Companies and recruiters can find developers with the exact skillset they need, near the desired location. 
Currently, it's only possible to search developers by technology and location, but that will soon be extended to allow searching by: 1) Name. 2) Full-text. 3) Developers that are specifically 
looking for a job, or are willing to relocate, or maybe are open for contract jobs.  

## Inspiration

The 2 main sources of inspiration where:

1. [About.me](https://about.me/) for the profile builder.
2. [Shubheksha Jalan](https://www.shubheksha.com/)'s website for the profile.

## Technology stack and credits

- **Database**: [Postgres](https://www.postgresql.org) with [PostGIS](https://postgis.net/), [pg-promise](https://github.com/vitaly-t/pg-promise) and [Massive.js](https://github.com/dmfay/massive-js).
- **Server**: [Node.js](https://nodejs.org/en/) and [Express](https://nodejs.org/en/).
- **Authentication**: [LinkedIn](https://www.linkedin.com) and [Passport](http://www.passportjs.org/).
- **Client**: [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Redux-Forms](https://redux-form.com),
 [React-Router](https://github.com/ReactTraining/react-router), [React-Select](https://github.com/JedWatson/react-select), 
 [React-mde](https://github.com/andrerpena/react-mde), [Showdown](https://github.com/showdownjs/showdown) 
 [react-notification-system](https://github.com/igorprado/react-notification-system) and [Emotion](https://github.com/emotion-js/emotion).
- **Building**: [Webpack](https://webpack.js.org/), [Gulp](https://gulpjs.com/) and [doctoc](https://github.com/thlorenz/doctoc).
- **Testing**: [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/). 
- **External APIs**: [Stackoverflow](https://api.stackexchange.com/docs) for tags and [Google Places](https://developers.google.com/places/) for geo-location.
- **Languages**: [TypeScript](https://www.typescriptlang.org/) and [SASS](http://sass-lang.com/).
- **Deployment and hosting**: [Heroku](https://www.heroku.com/).
  
The [stock background image](https://www.pexels.com/photo/adult-brainstorming-business-chair-515167/) was freely provided by [Pexels](https://www.pexels.com).


## The team

Currently the AboutDevs team is only me: [André Pena](https://aboutdevs.com/andrerpena). Be sure to follow me on [Twitter](https://twitter.com/andrerpena)
and on [Medium](https://medium.com/@andrerpena)! If you like trivia, AboutDevs took me around 450 hours to complete, from zero to deployment,
and it was my first big side-project. I'm a huge fan of [VSCode](https://code.visualstudio.com/) but I've built AboutDevs using [WebStorm](https://www.jetbrains.com/webstorm/).
It would have taken longer otherwise. Thank you [JetBrains](https://www.jetbrains.com/)!

# FAQ

## How much does AboutDevs cost?

AboutDevs is **free** both for developers and recruiters. Even though premium features might be added
in the future, AboutDevs as you know it will remain free forever.

## How does the search work?

Currently AboutDevs only support 1 way of searching: By technologies (or tags) provided by Stackoverflow and by location
provided by the Google Places API. The location currently only allows what Google calls a "region". That includes cities,
counties, states and countries. The search currently displays developers that match all the specified tags sorted by: 1)
The distance to the center of the given location. If you use a city as location, developers are sorted the distance to
the latitude and longitude of the center of that city. The same is true for any type of location. 2) By the time the 
developer created his/her account, descending. Meaning that newer accounts will tend to be displayed at the top.

## Why only LinkedIn is supported for signing in?

1. To minimize the occurrence of fake accounts or at least making them easily identifiable.
2. LinkedIn provides a fair amount of professional information that is or will be used in the future to make the profile
creation as straightforward as possible. 

Additional sign in possibilities might be added in the future.

# Upcoming features

AboutDevs is still in Beta.

## Technical

- Add server rendering for all pages (Today only profile pages have server rendering enabled).
- Fix some page titles.
- Improve performance.

## For developers

- CV uploading
- Improve the profile builder UX.

## For companies and recruiters

- Add the ability to search by: 1) Name. 2) Full-text. 3) Developers that are specifically looking for a 
job, or are willing to relocate, or maybe are open for contract jobs.  
- Add recruiters and companies profiles.
- Allow for recruiters to bookmark, ignore and flag fake developers.
- Allow recruiters to directly contact developers from within AboutDevs.

# Community

This is the most important part. The only way we can make AboutDevs what you want it to be is through your engagement
in the community.

The main communication channel for feature requests, bug reports and general discussions is the [AboutDevs subreddit](https://www.reddit.com/r/AboutDevs/).
Be sure to subscribe. Also, follow us on [Twitter](https://twitter.com/aboutdevs) and like us on [Facebook](https://www.facebook.com/aboutdevs/).
`;
}
