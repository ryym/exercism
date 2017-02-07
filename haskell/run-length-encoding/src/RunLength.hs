module RunLength (decode, encode) where

import Data.Char (isNumber)
import Data.List (group)

decode :: String -> String
decode = concat . decompress

encode :: String -> String
encode = concat . compress

decompress :: String -> [String]
decompress [] = []
decompress s = (replicate n c) : decompress rest
    where
        nums = takeWhile isNumber s
        (c:rest) = drop (length nums) s
        n = if null nums then 1 else read nums

compress :: String -> [String]
compress = consEach . (map pair) . group
    where
        consEach = foldr (\(n, c) ss -> n:[c]:ss) []
        pair g = (count $ length g, head g)
        count n = if n == 1 then "" else show n
