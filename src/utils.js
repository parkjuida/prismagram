import { adjectives, nouns } from "./words"

export const generateSecret = () => {
    const adjectives_index = Math.floor(Math.random() * adjectives.length)
    const nouns_index = Math.floor(Math.random() * adjectives.length)
    return `${adjectives[adjectives_index]} ${nouns[nouns_index]}`
}