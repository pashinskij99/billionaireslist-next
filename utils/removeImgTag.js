import { imgTagReg } from "./regex";

export const removeImgTag = (text) => text.replace(imgTagReg, '')
