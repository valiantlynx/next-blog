// this is the filter boolean trick: 
// https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
// it is used to filter out undefined values from the array
export const classNames = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
}

