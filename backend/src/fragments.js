export const COMMENT_FRAGMENT = `
  id
  text
  user {
      username
  }

`
export const USER_FRAGMENT = `
    id
    username
    avatar
`

export const FILE_FRAGMENT = `
    id
    url
`

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`
export const MESSAGE_FRAGMENT = `
    id
    text
    from {
        ${USER_FRAGMENT}
    }
    to {
        ${USER_FRAGMENT}
    }
    createdAt
`

export const ROOM_FRAGMENT = `
fragment RoomParts on Room {
    id
    participants {
        ${USER_FRAGMENT}
    } 
    messages {
        ${MESSAGE_FRAGMENT}
    }
    updatedAt
    createdAt
}`