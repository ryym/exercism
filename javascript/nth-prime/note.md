perfect-number の問題でもちょっとあったけど、
ある数 n の約数を調べる時、sqrt(n) 以下の約数と sqrt(n) 以上の約数は同数になるはず。

- aがnの約数である時、a x b = n が成り立つ (bも自然数)。
- b x a = n でも同じだから、bも必ずnの約数であり、b = n / a。
- 1からnまでの間の約数を順にaに当てはめると、sqrt(n)を堺に式が対称になる。

```text
1 x 36
2 x 18
3 x 12
4 x 9
6 x 6
9 x 4
12 x 3
18 x 2
36 x 1
```

---

他の人の解答を見ると、n番目の素数が知りたい時、その素数は必ず以下の数より小さいらしい。

```
n log(n) + n log(log(n))
```

上限さえ決まれば、確かにエラトステネスの篩を使う方が早そう。

- <https://www.quora.com/What-are-good-ways-to-find-the-nth-prime-number-in-the-fastest-way-This-question-is-asked-in-the-context-of-an-interview-What-if-it-is-not-allowed-to-compute-all-n-prime-numbers>
- <http://exercism.io/submissions/aa19db02c35e4de6b622472ef9007d82>
