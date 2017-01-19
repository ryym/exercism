module Bob (responseFor) where

import Data.Char (isUpper, isAlpha, isSpace)

responseFor :: String -> String
responseFor sentence
    | isSilence s = "Fine. Be that way!"
    | isShout s = "Whoa, chill out!"
    | isQuestion s = "Sure."
    | otherwise = "Whatever."
    where
        s = trim sentence
        isSilence = null
        isShout s = not (null alphas) && all isUpper alphas
            where
                alphas = filter isAlpha s
        isQuestion s = last s == '?'

trim :: String -> String
trim = ltrim . rtrim
    where
        ltrim = dropWhile isSpace
        rtrim = reverse . dropWhile isSpace . reverse
