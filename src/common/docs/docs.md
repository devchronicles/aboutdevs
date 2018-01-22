<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [About](#about)
  - [What is AboutDevs?](#what-is-aboutdevs)
  - [Inspiration](#inspiration)
  - [Technology stack and credits](#technology-stack-and-credits)
  - [The team](#the-team)
- [FAQ](#faq)
  - [I have signed in and I can see a preview of my profile. Why can't I find myself in the search?](#i-have-signed-in-and-i-can-see-a-preview-of-my-profile-why-cant-i-find-myself-in-the-search)
  - [How much does AboutDevs cost?](#how-much-does-aboutdevs-cost)
  - [How does the search work?](#how-does-the-search-work)
  - [Are there plans to support other sign in options, besides LinkedIn?](#are-there-plans-to-support-other-sign-in-options-besides-linkedin)
- [Roadmap feature candidates:](#roadmap-feature-candidates)
  - [Technical](#technical)
  - [For developers](#for-developers)
  - [For recruiters](#for-recruiters)
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
- **Cloud services**: [Heroku](https://www.heroku.com/), [AWS S3](https://aws.amazon.com/s3/) and [CloudFlare](http://cloudflare.com/).

## The team

Currently the AboutDevs team is only me: [André Pena](https://aboutdevs.com/andrerpena). Be sure to follow me on [Twitter](https://twitter.com/andrerpena)
and on [Medium](https://medium.com/@andrerpena)!

# FAQ

## I have signed in and I can see a preview of my profile. Why can't I find myself in the search?

Most likely because you did not edit and save your profile. Your profile will only become active after you save it 
for the first time. This ensures that all required fields are set.

## How much does AboutDevs cost?

AboutDevs is **free** both for developers and recruiters. Even though premium features might be added
in the future, AboutDevs as you know it will remain free forever.

## How does the search work?

Currently AboutDevs only support one way of searching: By technologies (or tags), provided by Stackoverflow, and by location,
provided by the Google Places API. The location currently only allows what Google calls a "region". That includes cities,
counties, states and countries. The search currently displays developers that match all the specified tags sorted by: 1º)
The distance to the center of the given location. If you use a city as location, for example, developers are sorted by the distance 
the center of that city. The same is true for any type of location. 2º) By the time the 
developer created his/her account, descending. Meaning that newer accounts will tend to be displayed at the top.

## Are there plans to support other sign in options, besides LinkedIn?

Additional sign in possibilities might be added in the future. LinkedIn was selected for the MVP because:

1. It makes it harder to create fake profiles, or at least make them easily identifiable.
2. LinkedIn provides a fair amount of professional information that is or will be used in the future to make the profile
creation as straightforward as possible. 



# Roadmap feature candidates:

AboutDevs is still in Beta and you're more than invited to go to the [AboutDevs subreddit](https://www.reddit.com/r/AboutDevs/)
and tell us what is important to you. Bellow is our own wish list:

## Technical

- Add server rendering for all pages (Today only profile pages have server rendering enabled).
- Fix some page titles.
- Improve performance.

## For developers

- Improve the profile builder UX.
- Add settings for determining what developers are looking for, professionally. Examples: Whether they are
looking for a job, remote work or contract jobs. 

## For recruiters

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
