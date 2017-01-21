module SumOfMultiples (sumOfMultiples) where

sumOfMultiples :: (Num a, Integral a) => [a] -> a -> a
sumOfMultiples factors limit = sum $ filter isMultiple $ [1..(limit - 1)]
    where
        isMultiple n = any (== 0) $ map (mod n) factors
