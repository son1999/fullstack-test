import containt from "../configs/containt";

export function getRandomPrice(min = containt.MIN, max = containt.MAX): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(containt.FIXED));
}

