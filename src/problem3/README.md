## Problem 3
BoxProps, custom hook, useMemo and WalletRow wasn't imported
```ts
interface Props extends BoxProps 
```
```ts
const balances = useWalletBalances();
const prices = usePrices();
```
```ts
 const sortedBalances = useMemo(() => {
```
classes wasn't declared
```tsx
<WalletRow 
  className={classes.row}
  key={index}
  amount={balance.amount}
  usdValue={usdValue}
  formattedAmount={balance.formatted}
/>
```
You should import before using
```ts
import { useMemo } from "react"
import { BoxProps } from "library"
import { useWalletBalances } from "library"
import { usePrices } from "library"
import { WalletRow } from "library"
```

Just need return 1 time 20 if have 'Zilliqa' or 'Neo'
```ts
case 'Zilliqa':
 return 20
case 'Neo':
 return 20
```

Refactor
```ts
case 'Zilliqa':
case 'Neo':
 return 20
```

Key blockchain wasn't defined in WalletBalance interface
lhsPriority wasn't declared
If leftPriority === rightPriority in sort function didn't have any return (return 0 to maintain their order. Without return, code may rearrange them in an unintended way)
```ts
const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);
```

Refactor: 
```ts
const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99 && balance.amount <= 0) {
                 return true;
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
            else {
                return 0;
            }
      });
    }, [balances, prices]);
```

formattedBalances never used (can be removed if not in use)
```ts
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
```

children in props never used
Props interface didn't defined or extends div element but rest variable use for div
```tsx
return (
      <div {...rest}>
        {rows}
      </div>
)
```

Refactor
```ts
import React from "react";
interface Props extends BoxProps {
  divProps: React.HTMLProps<HTMLDivElement>;
}
```
```ts
const { children, divProps,...rest } = props;
return (
      <div {...divProps}>
        {rows}
        {children}
      </div>
)
```






