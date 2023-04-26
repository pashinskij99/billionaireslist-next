import { donationIcons } from '../data/footer_data'

export const getDonationList = (wallets) =>
  donationIcons.map((donation, id) => ({
    ...donation,
    wallet: wallets[id],
  }))
