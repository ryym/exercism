
class Phrase(sentence: String) {
  def wordCount(): Map[String, Int] = {
    val words = sentence.toLowerCase.split("[^a-zA-Z0-9']+")
    words.groupBy(identity).mapValues(_.length)
  }
}
