import * as commonTypes from "../../common/typings";

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lacus consectetur
leo venenatis lobortis nec eu felis. Sed tempor molestie nibh, maximus lacinia sapien cursus non. Aliquam
 ut lacus sit amet ipsum rutrum venenatis ullamcorper et nisi. Vestibulum in accumsan neque. Duis et
 tincidunt tortor. Nam sagittis nisi ac est ultricies faucibus. Integer rutrum pretium magna, ornare
 rhoncus orci pulvinar ut. Duis euismod felis dignissim rutrum luctus.

Integer pretium lacinia rhoncus. Phasellus eget ultrices libero. Nunc vestibulum erat nunc, at molestie
 odio commodo nec. Nullam ut sem id dolor aliquam auctor et nec erat. Curabitur lobortis diam aliquet
 ligula rutrum, non mollis justo vehicula. Pellentesque vitae tellus nec lectus accumsan iaculis. Ut
 sed mattis turpis. Etiam in fringilla mauris. Praesent hendrerit erat eget dapibus blandit.

Aliquam faucibus tempor congue. Nullam hendrerit est quis justo pretium, ut rhoncus massa tincidunt.
Ut lacinia interdum nulla. Ut at interdum lacus. Aliquam ullamcorper, dui nec dapibus pellentesque,
velit nisi iaculis magna, ac dictum purus quam eget urna. Nulla fermentum finibus porttitor. Phasellus
 auctor augue quis turpis tincidunt, vitae imperdiet risus molestie. In eu efficitur ex. Duis ac
 turpis at odio sollicitudin feugiat. Mauris felis purus, tempus non lorem vel, egestas eleifend
 nisi. Ut turpis justo, faucibus vitae orci nec, placerat rhoncus mauris. Duis malesuada vitae
 nisi eget vestibulum. Donec ex dolor, sodales eget turpis a, congue scelerisque ex.`;

export const profiles: commonTypes.UserProfile[] = [
    {
        id: 2,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "João Moreno",
        photoUrl: "https://www.gravatar.com/avatar/7deca8ec973c3c0875e9a36e1e3e2c44?s=328&d=identicon&r=PG",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 3,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "Helena Braga",
        photoUrl: "https://i.stack.imgur.com/BfziW.png?s=328&g=1",
        bio: loremIpsum,
        title: "Contadora",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 4,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "Rafael Pereira",
        photoUrl: "https://i.stack.imgur.com/zUoEd.jpg?s=328&g=1",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 5,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "João Carlos Magno",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/spacewood_/128.jpg",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 2,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "Júlio Cezar Borges",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 3,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "Flavio Pestana",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/levisan/128.jpg",
        bio: loremIpsum,
        title: "Contadora",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 4,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "Carol Solza",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/dutchnadia/128.jpg",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
    {
        id: 5,
        status: commonTypes.UserProfileStatus.READY,
        type: commonTypes.UserProfileType.RECRUITER,
        name: "joaomoreno",
        displayName: "João Moreno",
        photoUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/stalewine/128.jpg",
        bio: loremIpsum,
        title: "Contador",
        address: "Rua Henrique Surerus 28 Apto 904",
        tags: [],
    },
];
