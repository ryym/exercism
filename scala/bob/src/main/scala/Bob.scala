
class Bob {
  def hey(remark: String): String = {
    if (remark.trim.isEmpty) "Fine. Be that way!"
    else if (isShouting(remark)) "Whoa, chill out!"
    else if (isQuestion(remark)) "Sure."
    else "Whatever."
  }

  // Shouting must contains one or more uppercase letters.
  private def isShouting(s: String): Boolean = {
    val letters = s.filter(_.isLetter)
    ! letters.isEmpty && letters.toUpperCase == letters
  }

  private def isQuestion(s: String): Boolean = s.endsWith("?")
}
