module Hamming
  module_function

  def compute(strand1, strand2)
    if strand1.size != strand2.size
      raise ArgumentError, 'The two strands must have a same length.'
    end
    
    bases1 = strand1.chars
    bases2 = strand2.chars
    bases1.zip(bases2).select { |b1, b2| b1 != b2 }.size
  end
end

module BookKeeping
  VERSION = 3
end