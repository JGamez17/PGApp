
import { twMerge } from 'tailwind-merge';

const cn = (...classes) => {
    return twMerge(classes.filter(Boolean));
}

export default cn;

