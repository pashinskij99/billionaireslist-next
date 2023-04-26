import { socialIcons } from '../data/footer_data'

export const getSocialIconsList = (links) =>
  socialIcons.map((icon, id) => ({ ...icon, href: links[id] }))
