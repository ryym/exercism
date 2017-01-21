module DNA (toRNA) where

toRNA :: String -> Maybe String
toRNA = mapM convert

convert :: Char -> Maybe Char
convert nucleotide = case nucleotide of
    'G' -> Just 'C'
    'C' -> Just 'G'
    'T' -> Just 'A'
    'A' -> Just 'U'
    _ -> Nothing
