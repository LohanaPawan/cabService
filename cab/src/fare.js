

export let fare = (distance, duration) => {
    let result = Math.trunc(35 + (distance  * 20) + (duration * 3))
    return result;
}
