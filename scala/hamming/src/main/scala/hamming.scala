
object Hamming {
  def compute(strand1: String, strand2: String): Integer = {
    require(strand1.length == strand2.length, "Two strands must have a same length")
    strand1 zip strand2 count { case (b1, b2) => b1 != b2 }
  }
}
