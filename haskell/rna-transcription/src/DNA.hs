module DNA (toRNA) where

toRNA :: String -> Maybe String
toRNA dna = sequenceA $ toRNA' dna
    where
        toRNA' [] = []
        toRNA' (c:cs) = convert c : toRNA' cs

convert :: Char -> Maybe Char
convert c = case c of
    'G' -> Just 'C'
    'C' -> Just 'G'
    'T' -> Just 'A'
    'A' -> Just 'U'
    _ -> Nothing
