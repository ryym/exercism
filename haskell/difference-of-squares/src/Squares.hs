module Squares (difference, squareOfSums, sumOfSquares) where

difference :: Integral a => a -> a
difference n = abs $ (sumOfSquares n) - (squareOfSums n)

squareOfSums :: Integral a => a -> a
squareOfSums = square . sum . numSeqsTo

sumOfSquares :: Integral a => a -> a
sumOfSquares = sum . (map square) . numSeqsTo

numSeqsTo :: Integral a => a -> [a]
numSeqsTo 0 = []
numSeqsTo n = n : numSeqsTo (n - 1)

square :: Num a => a -> a
square a = a ^ 2
