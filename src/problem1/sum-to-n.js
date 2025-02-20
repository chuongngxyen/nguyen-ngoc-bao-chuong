const sum_to_n_a = (n) => {
    return (n * (n + 1)) / 2
}

const sum_to_n_b = (n) => {
    let sum = 0;
    let i = 1;
    while (i <= n) {
        sum += i
        i++
    }
    return sum
}

const sum_to_n_c = (n) => {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1)
}

console.log(sum_to_n_a(100))
console.log(sum_to_n_b(100))
console.log(sum_to_n_c(100))