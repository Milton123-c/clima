
export const random = array => {

    if(!array) return 0;

    const ran = Math.floor(Math.random() * array.length)

    return ran;

}