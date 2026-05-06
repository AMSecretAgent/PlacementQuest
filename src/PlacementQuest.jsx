import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Star, Flame, Lock, Check, Clock, BookOpen, Trophy, Calendar,
  ChevronLeft, ChevronRight, X, Zap, Code2, Network, Cpu,
  Calculator, MessageSquare, Play, Pause, RotateCcw, Sparkles,
  Award, TrendingUp, Target, ChevronDown, ChevronUp, Map, BarChart3,
  Brain, Shield
} from "lucide-react";

/* =========================================================
   CURRICULUM DATA — placement prep content
   ========================================================= */

/* 45-DAY DSA MASTERY — Arrays-first, teaching curriculum.
   Each day: concept → pattern → walked example → practice problem.
   Designed for someone with minimal DSA background. */
const DSA_PROBLEMS = [
  // ============ WEEK 1: ARRAYS FOUNDATION ============
  {
    day: 1, topic: "Arrays", title: "Array Traversal & Largest Element",
    diff: "Easy", time: 20,
    concept: "Array = contiguous memory storing same-type elements, accessed by 0-based index. Indexing arr[i] is O(1) — direct memory math. Traversal = visiting each element once, O(N). Almost every array problem is a clever traversal.",
    pattern: "Single-pass scanning: when you need to find/track ONE thing across all elements (max, min, sum, count), one for-loop is enough. Initialize a tracker (e.g., max = arr[0]), then update it as you iterate.",
    example: "arr = [3, 7, 2, 9, 4]. max = 3 initially. Compare 7 > 3 → max = 7. 2 < 7 → keep. 9 > 7 → max = 9. 4 < 9 → keep. Answer: 9. Time O(N), Space O(1).",
    problem: "Given an integer array, return the largest element. Edge cases: empty array, all negatives, single element.",
    link: "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/",
    tests: [
      { stdin: "5\n3 7 2 9 4", expected: "9" },
      { stdin: "1\n42", expected: "42" },
      { stdin: "4\n-5 -2 -10 -1", expected: "-1" },
      { stdin: "4\n1 1 1 1", expected: "1" },
      { stdin: "5\n100 50 200 75 150", expected: "200" },
    ],
    starters: {
      js: `// stdin format: first line is N, second line is N space-separated ints
const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — find the largest element



// console.log(answer);`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — find the largest element



# print(answer)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — find the largest element



    // cout << answer << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — find the largest element



        // System.out.println(answer);
    }
}`,
    }
  },
  {
    day: 2, topic: "Arrays", title: "Tracking Two Things at Once — Second Largest",
    diff: "Easy", time: 25,
    concept: "Sometimes you need MORE than one tracker. Naive way: sort then pick — O(N log N). Smart way: keep TWO variables (largest, secondLargest) and update both correctly in one pass — O(N).",
    pattern: "Two-tracker pass: when a new element beats your top tracker, the OLD top becomes the new second. Always update second BEFORE overwriting top.",
    example: "arr = [10, 5, 10, 8, 12]. Init: largest=-∞, second=-∞. 10 > largest → second=-∞, largest=10. 5 < largest, 5 > second → second=5. 10 == largest → skip (strict second largest). 8 > second → second=8. 12 > largest → second=10, largest=12. Answer: 10.",
    problem: "Find the second-largest element WITHOUT sorting. Strict — if all elements are equal, return -1.",
    link: "https://takeuforward.org/arrays/find-second-smallest-and-second-largest-element-in-an-array/",
    tests: [
      { stdin: "5\n10 5 10 8 12", expected: "10" },
      { stdin: "4\n5 5 5 5", expected: "-1" },
      { stdin: "2\n1 2", expected: "1" },
      { stdin: "4\n7 7 7 3", expected: "3" },
      { stdin: "1\n100", expected: "-1" },
    ],
    starters: {
      js: `const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = n ? lines[1].split(' ').map(Number) : [];

// YOUR CODE — strict second largest, -1 if no valid one



// console.log(answer);`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — strict second largest, -1 if no valid one



# print(answer)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — strict second largest, -1 if no valid one



    // cout << answer << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — strict second largest, -1 if no valid one



        // System.out.println(answer);
    }
}`,
    }
  },
  {
    day: 3, topic: "Arrays", title: "Two Pointers Intro — Reverse an Array",
    diff: "Easy", time: 20,
    concept: "Two pointers = use two indices that move toward each other (or together). It's the #1 array trick. Saves space: lets you do in-place transformations instead of creating a copy.",
    pattern: "Opposite-end pointers: left=0, right=n-1, swap-and-move-inward until they meet. Use whenever the operation is symmetric (reverse, palindrome, sorted-pair-search).",
    example: "arr = [1,2,3,4,5]. left=0, right=4 → swap → [5,2,3,4,1]. left=1, right=3 → swap → [5,4,3,2,1]. left=2, right=2 → stop. O(N) time, O(1) space.",
    problem: "Reverse an array in-place. No extra array allowed.",
    link: "https://takeuforward.org/arrays/reverse-a-given-array/",
    tests: [
      { stdin: "5\n1 2 3 4 5", expected: "5 4 3 2 1" },
      { stdin: "1\n7", expected: "7" },
      { stdin: "2\n1 2", expected: "2 1" },
      { stdin: "3\n7 7 7", expected: "7 7 7" },
      { stdin: "4\n10 20 30 40", expected: "40 30 20 10" },
    ],
    starters: {
      js: `const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — reverse arr in place using two pointers



console.log(arr.join(' '));`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — reverse arr in place using two pointers



print(' '.join(map(str, arr)))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — reverse arr in place using two pointers



    for (int i = 0; i < n; i++) cout << arr[i] << (i + 1 < n ? " " : "\\n");
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — reverse arr in place using two pointers



        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { sb.append(arr[i]); if (i + 1 < n) sb.append(' '); }
        System.out.println(sb.toString());
    }
}`,
    }
  },
  {
    day: 4, topic: "Arrays", title: "In-Place Modification — Move Zeroes",
    diff: "Easy", time: 25,
    concept: "In-place = modify the input array directly without creating a new one. Saves space O(1). Trick: think of the array as having two regions — 'processed/clean' on left, 'unprocessed' on right. Use a pointer to mark the boundary.",
    pattern: "Slow-fast pointers: slow points where the next 'good' element should go, fast scans through. When fast finds something good, place it at slow and increment slow.",
    example: "arr = [0,1,0,3,12]. slow=0. fast=0: arr[0]=0, skip. fast=1: arr[1]=1, swap arr[0]↔arr[1] → [1,0,0,3,12], slow=1. fast=2: 0, skip. fast=3: 3, swap arr[1]↔arr[3] → [1,3,0,0,12], slow=2. fast=4: 12, swap arr[2]↔arr[4] → [1,3,12,0,0], slow=3. Done.",
    problem: "Move all zeroes to the END while keeping non-zero order intact. In-place, O(N) time, O(1) space.",
    link: "https://takeuforward.org/data-structure/move-all-zeros-to-the-end-of-the-array/",
    tests: [
      { stdin: "5\n0 1 0 3 12", expected: "1 3 12 0 0" },
      { stdin: "3\n0 0 0", expected: "0 0 0" },
      { stdin: "3\n1 2 3", expected: "1 2 3" },
      { stdin: "6\n1 0 2 0 3 0", expected: "1 2 3 0 0 0" },
      { stdin: "1\n0", expected: "0" },
    ],
    starters: {
      js: `const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — move all zeroes to the end, in place
// keep relative order of non-zero elements



console.log(arr.join(' '));`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — move all zeroes to the end, in place



print(' '.join(map(str, arr)))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — move all zeroes to the end, in place



    for (int i = 0; i < n; i++) cout << arr[i] << (i + 1 < n ? " " : "\\n");
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — move all zeroes to the end, in place



        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { sb.append(arr[i]); if (i + 1 < n) sb.append(' '); }
        System.out.println(sb.toString());
    }
}`,
    }
  },
  {
    day: 5, topic: "Arrays", title: "Sorted Array Trick — Remove Duplicates",
    diff: "Easy", time: 25,
    concept: "Sorted arrays unlock superpowers: duplicates are always adjacent, search is O(log N), merging is linear. Whenever input says 'sorted', think: can I exploit that?",
    pattern: "Slow-fast pointers on sorted: slow = last unique position, fast scans. Whenever arr[fast] != arr[slow], we found a new unique → slow++ and copy.",
    example: "arr = [1,1,2,2,2,3]. slow=0 (first unique). fast=1: 1==1, skip. fast=2: 2≠1 → slow=1, arr[1]=2 → [1,2,2,2,2,3]. fast=3,4: 2==2, skip. fast=5: 3≠2 → slow=2, arr[2]=3 → [1,2,3,2,2,3]. Length of unique = slow+1 = 3.",
    problem: "Given a sorted array, remove duplicates in-place. Return the count of unique elements.",
    link: "https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/",
    tests: [
      { stdin: "6\n1 1 2 2 2 3", expected: "3" },
      { stdin: "1\n1", expected: "1" },
      { stdin: "3\n1 2 3", expected: "3" },
      { stdin: "4\n5 5 5 5", expected: "1" },
      { stdin: "3\n1 1 2", expected: "2" },
    ],
    starters: {
      js: `const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — sorted input, dedupe in place
// print the count of unique elements



// console.log(uniqueCount);`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — sorted input, dedupe in place
# print the count of unique elements



# print(unique_count)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — sorted input, dedupe in place
    // print the count of unique elements



    // cout << uniqueCount << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — sorted input, dedupe in place
        // print the count of unique elements



        // System.out.println(uniqueCount);
    }
}`,
    }
  },
  {
    day: 6, topic: "Arrays", title: "The Reversal Trick — Rotate by K",
    diff: "Medium", time: 30,
    concept: "Some problems have a magical mathematical observation. Rotation by K is one: reversing parts of the array three times is equivalent to rotating it. Memorize this trick — it appears in interviews.",
    pattern: "Three reversals: (1) reverse first K elements, (2) reverse remaining n-K, (3) reverse the whole array. Always do K = K % N first to handle K > N.",
    example: "arr = [1,2,3,4,5,6,7], K=3. Reverse first 3: [3,2,1,4,5,6,7]. Reverse last 4: [3,2,1,7,6,5,4]. Reverse whole: [4,5,6,7,1,2,3]. ✓ Rotated right by 3.",
    problem: "Rotate the array to the RIGHT by K positions. In-place, O(N) time, O(1) space. Handle K > N.",
    link: "https://takeuforward.org/data-structure/rotate-array-by-k-elements/",
    tests: [
      { stdin: "7 3\n1 2 3 4 5 6 7", expected: "5 6 7 1 2 3 4" },
      { stdin: "3 4\n1 2 3", expected: "3 1 2" },
      { stdin: "1 5\n1", expected: "1" },
      { stdin: "4 0\n1 2 3 4", expected: "1 2 3 4" },
      { stdin: "4 4\n1 2 3 4", expected: "1 2 3 4" },
    ],
    starters: {
      js: `// stdin: first line "N K", second line N elements
const lines = stdin.trim().split('\\n');
const [n, k] = lines[0].split(' ').map(Number);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — rotate right by k. Handle k > n.
// hint: 3 reversals trick



console.log(arr.join(' '));`,
      py: `import sys
data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
arr = list(map(int, data[2:2+n]))

# YOUR CODE — rotate right by k. Handle k > n.



print(' '.join(map(str, arr)))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — rotate right by k. Handle k > n.



    for (int i = 0; i < n; i++) cout << arr[i] << (i + 1 < n ? " " : "\\n");
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — rotate right by k. Handle k > n.



        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { sb.append(arr[i]); if (i + 1 < n) sb.append(' '); }
        System.out.println(sb.toString());
    }
}`,
    }
  },
  {
    day: 7, topic: "Arrays", title: "Counters & Streaks — Max Consecutive Ones",
    diff: "Easy", time: 20,
    concept: "Streak problems: count the longest run of something. The trick is a 'current streak' counter that resets on a break, and a 'best streak' tracker that only increases.",
    pattern: "Single pass with two counters: cur (current streak), best (max streak so far). On match → cur++ and best = max(best, cur). On miss → cur = 0.",
    example: "arr = [1,1,0,1,1,1,0,1]. cur=0, best=0. 1: cur=1, best=1. 1: cur=2, best=2. 0: cur=0. 1: cur=1. 1: cur=2. 1: cur=3, best=3. 0: cur=0. 1: cur=1. Answer: 3.",
    problem: "In a binary array (0s and 1s), find the maximum number of consecutive 1s.",
    link: "https://takeuforward.org/arrays/count-maximum-consecutive-ones-in-the-array/",
    tests: [
      { stdin: "8\n1 1 0 1 1 1 0 1", expected: "3" },
      { stdin: "3\n0 0 0", expected: "0" },
      { stdin: "3\n1 1 1", expected: "3" },
      { stdin: "5\n1 0 1 0 1", expected: "1" },
      { stdin: "6\n0 1 1 0 1 1", expected: "2" },
    ],
    starters: {
      js: `const lines = stdin.trim().split('\\n');
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — longest run of consecutive 1s



// console.log(answer);`,
      py: `import sys
data = sys.stdin.read().split()
n = int(data[0])
arr = list(map(int, data[1:1+n]))

# YOUR CODE — longest run of consecutive 1s



# print(answer)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — longest run of consecutive 1s



    // cout << answer << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — longest run of consecutive 1s



        // System.out.println(answer);
    }
}`,
    }
  },
  {
    day: 8, topic: "Arrays", title: "Math Tricks — Missing Number & XOR",
    diff: "Easy", time: 25,
    concept: "Sometimes math beats data structures. Two superpowers: (1) Sum formula — sum of 1..N is N(N+1)/2; (2) XOR property — a^a=0, a^0=a, XOR is commutative. Both let you find a 'lone' or 'missing' element in O(N) time, O(1) space.",
    pattern: "When asked 'find the missing/duplicate/single element' — try summing or XOR-ing everything. The math cancels out the noise, leaving the answer.",
    example: "arr = [1,2,4,5] from N=5. Expected sum = 5*6/2 = 15. Actual = 12. Missing = 15-12 = 3. ✓ XOR way: XOR all of [1,2,3,4,5] with all of arr — pairs cancel, only 3 survives.",
    problem: "Array contains N-1 distinct numbers from 1 to N. Find the missing number. Solve both ways: sum and XOR.",
    link: "https://takeuforward.org/arrays/find-the-missing-number-in-an-array/",
    tests: [
      { stdin: "4\n1 2 4 5", expected: "3" },
      { stdin: "2\n2 3", expected: "1" },
      { stdin: "2\n1 2", expected: "3" },
      { stdin: "1\n2", expected: "1" },
      { stdin: "4\n1 3 4 5", expected: "2" },
    ],
    starters: {
      js: `// stdin: first line M = arr.length, second line M elements
// arr contains M distinct numbers from 1..M+1, find the missing one
const lines = stdin.trim().split('\\n');
const m = parseInt(lines[0]);
const arr = m ? lines[1].split(' ').map(Number) : [];

// YOUR CODE — find missing using sum or XOR



// console.log(missing);`,
      py: `import sys
data = sys.stdin.read().split()
m = int(data[0])
arr = list(map(int, data[1:1+m]))
# arr has M distinct nums from 1..M+1; find the missing one

# YOUR CODE



# print(missing)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int m; cin >> m;
    vector<int> arr(m);
    for (int i = 0; i < m; i++) cin >> arr[i];
    // arr has m distinct nums from 1..m+1; find the missing one

    // YOUR CODE



    // cout << missing << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int[] arr = new int[m];
        for (int i = 0; i < m; i++) arr[i] = sc.nextInt();
        // arr has m distinct nums from 1..m+1; find the missing one

        // YOUR CODE



        // System.out.println(missing);
    }
}`,
    }
  },
  {
    day: 9, topic: "Arrays", title: "Sliding Window Intro — Fixed Size",
    diff: "Medium", time: 30,
    concept: "Sliding window = an efficient way to look at all subarrays of a certain size without re-computing from scratch. When the window slides one step right, you ADD the new element and SUBTRACT the leaving one. Goes from O(N*K) brute force to O(N).",
    pattern: "Fixed-size window: compute first window's value, then slide. windowSum = windowSum + arr[i] - arr[i-K]. Track best as you go.",
    example: "arr=[2,1,5,1,3,2], K=3. First window [2,1,5] sum=8. Slide: +1-2 = 7 → [1,5,1]. Slide: +3-1 = 9 → [5,1,3]. Slide: +2-5 = 6 → [1,3,2]. Max = 9.",
    problem: "Given an array and integer K, find the maximum sum of any contiguous subarray of size K. O(N) please.",
    link: "https://leetcode.com/problems/maximum-average-subarray-i/",
    tests: [
      { stdin: "6 3\n2 1 5 1 3 2", expected: "9" },
      { stdin: "4 2\n1 1 1 1", expected: "2" },
      { stdin: "1 1\n5", expected: "5" },
      { stdin: "4 2\n-1 -2 -3 -4", expected: "-3" },
      { stdin: "6 4\n10 5 2 7 8 7", expected: "24" },
    ],
    starters: {
      js: `// stdin: first line "N K", second line N elements
const lines = stdin.trim().split('\\n');
const [n, k] = lines[0].split(' ').map(Number);
const arr = lines[1].split(' ').map(Number);

// YOUR CODE — max sum of any contiguous subarray of size k
// hint: sliding window — slide, add new, subtract leaving



// console.log(maxSum);`,
      py: `import sys
data = sys.stdin.read().split()
n, k = int(data[0]), int(data[1])
arr = list(map(int, data[2:2+n]))

# YOUR CODE — max sum of any contiguous subarray of size k
# hint: sliding window



# print(max_sum)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // YOUR CODE — max sum of any contiguous subarray of size k
    // hint: sliding window



    // cout << maxSum << endl;
    return 0;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // YOUR CODE — max sum of any contiguous subarray of size k
        // hint: sliding window



        // System.out.println(maxSum);
    }
}`,
    }
  },
  {
    day: 10, topic: "Arrays", title: "Sliding Window Dynamic — Variable Size",
    diff: "Medium", time: 35,
    concept: "When the window size isn't fixed, you grow and shrink it based on a condition. Two pointers L and R. Expand R while condition is satisfied; when it breaks, shrink L until it's satisfied again. Track best window size.",
    pattern: "Variable window template: for R in 0..n: add arr[R] to window. While window violates condition: remove arr[L], L++. Update answer with current valid window length.",
    example: "arr=[2,3,1,2,4,3], target=7. R=0:sum=2. R=1:sum=5. R=2:sum=6. R=3:sum=8 ≥7! Length=4. Shrink: remove 2 → sum=6, L=1. R=4:sum=10. Shrink: remove 3 → sum=7, len=4. Shrink: remove 1 → sum=6, L=3. R=5:sum=9. Shrink: remove 2 → sum=7, len=3 (smallest!).",
    problem: "Smallest subarray with sum ≥ target (positive numbers only). Return the minimum LENGTH.",
    link: "https://leetcode.com/problems/minimum-size-subarray-sum/"
  },
  {
    day: 11, topic: "Arrays", title: "Kadane's Algorithm — Max Subarray Sum",
    diff: "Medium", time: 35,
    concept: "Most famous DP-on-array trick. Question: given an array (with negatives), find the contiguous subarray with the largest sum. Brute O(N²). Kadane's insight: at each index, decide — extend the previous subarray, or start fresh from here?",
    pattern: "Running sum that resets when it goes negative: cur = max(arr[i], cur + arr[i]). best = max(best, cur). If cur ever goes < 0, starting fresh at next index is better than carrying baggage.",
    example: "arr=[-2,1,-3,4,-1,2,1,-5,4]. cur=-2, best=-2. 1: max(1, -2+1=-1)=1. best=1. -3: max(-3, -2)=-2. 4: max(4, -2+4=2)=4. best=4. -1: max(-1, 3)=3. 2: max(2,5)=5. best=5. 1: 6. best=6. -5: 1. 4: 5. Answer: 6 (subarray [4,-1,2,1]).",
    problem: "Implement Kadane's algorithm. Return max subarray sum. Bonus: also return the actual subarray (start/end indices).",
    link: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
  },
  {
    day: 12, topic: "Arrays", title: "Buy/Sell Stock — Kadane Variant",
    diff: "Easy", time: 25,
    concept: "This problem looks unique but is Kadane in disguise. Profit on day j (selling) vs day i (buying, i<j) = price[j] - price[i]. Maximize this. Trick: as you scan, track the minimum price seen SO FAR. At each day, profit = today's price - min so far.",
    pattern: "Single pass with running minimum: minPrice = ∞. For each price: profit = price - minPrice. Update bestProfit and minPrice.",
    example: "prices=[7,1,5,3,6,4]. min=7, profit=0. price=1: profit = 1-7=-6 (skip), min=1. price=5: profit=4, best=4. price=3: profit=2. price=6: profit=5, best=5. price=4: profit=3. Answer: 5 (buy day 1 at 1, sell day 4 at 6).",
    problem: "Best Time to Buy and Sell Stock — one transaction. Return max profit, or 0 if no profitable trade.",
    link: "https://takeuforward.org/data-structure/stock-buy-and-sell/"
  },

  // ============ WEEK 2: ARRAYS — HARDER PATTERNS ============
  {
    day: 13, topic: "Arrays", title: "Dutch National Flag — Sort 0,1,2",
    diff: "Medium", time: 35,
    concept: "Three-pointer partition. When you have only K possible values (here: 0, 1, 2), you can sort in O(N) with O(1) space — beating comparison sort's O(N log N). The array gets divided into three regions: 0s (left), 1s (middle), 2s (right). Three pointers maintain the boundaries.",
    pattern: "Three pointers low (next 0 spot), mid (scanner), high (next 2 spot). arr[mid]==0 → swap with low, low++, mid++. arr[mid]==1 → mid++. arr[mid]==2 → swap with high, high-- (don't move mid — new value is unknown).",
    example: "arr=[2,0,1,2,1,0]. low=0, mid=0, high=5. arr[mid]=2, swap with high → [0,0,1,2,1,2], high=4. arr[mid]=0, swap with low → low=1, mid=1. arr[mid]=0, swap → low=2, mid=2. arr[mid]=1, mid=3. arr[mid]=2, swap with high → [0,0,1,1,2,2], high=3. mid>high, stop.",
    problem: "Sort array containing only 0s, 1s, 2s in a single pass, in-place.",
    link: "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/"
  },
  {
    day: 14, topic: "Arrays", title: "Boyer-Moore Voting — Majority Element",
    diff: "Medium", time: 30,
    concept: "If an element occurs MORE than N/2 times, it's the 'majority'. Naive: hashmap of counts → O(N) space. Genius trick (Boyer-Moore voting): pair off different elements — they cancel each other out. Whatever survives is the candidate. Verify with second pass.",
    pattern: "Maintain a candidate and a count. Same as candidate → count++. Different → count--. If count==0, switch candidate to current element.",
    example: "arr=[3,3,4,2,4,4,2,4,4]. candidate=3,count=1. 3:count=2. 4:count=1. 2:count=0 (switch needed). Next: candidate=4,count=1. 4:count=2. 2:count=1. 4:count=2. 4:count=3. Verify: 4 appears 5 times in array of 9 → majority. ✓",
    problem: "Find the majority element (appears > N/2 times). Assume it always exists.",
    link: "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/"
  },
  {
    day: 15, topic: "Arrays", title: "Prefix Sum — Subarray Sum Equals K",
    diff: "Medium", time: 40,
    concept: "Prefix sum = cumulative sum up to index i. prefix[i] = arr[0]+arr[1]+...+arr[i]. Magic: sum of subarray (i..j) = prefix[j] - prefix[i-1]. Combined with a hashmap, you can answer 'how many subarrays sum to K' in O(N) — even with negative numbers!",
    pattern: "Hashmap of {prefixSum → count}. As you iterate computing running sum, check if (currentSum - K) exists in map — that means a subarray ending here sums to K. Count those.",
    example: "arr=[1,2,3], K=3. sum=0, map={0:1}. i=0: sum=1, sum-K=-2 not in map. Add 1. map={0:1,1:1}. i=1: sum=3, sum-K=0 in map (count 1). Answer+=1. Add 3. i=2: sum=6, sum-K=3 in map (count 1). Answer+=1. Final: 2 subarrays ([1,2] and [3]).",
    problem: "Count the number of subarrays with sum exactly K. Array can have negatives.",
    link: "https://takeuforward.org/arrays/count-subarray-sum-equals-k/"
  },
  {
    day: 16, topic: "Arrays", title: "Two Sum — Hashmap Pattern",
    diff: "Easy", time: 25,
    concept: "Classic interview question — also a fundamental pattern. Brute force: check every pair, O(N²). Hashmap trick: as you iterate, ask 'have I seen (target - current) before?' If yes, you found the pair. Convert pair-search → single lookup using memory.",
    pattern: "Single pass + hashmap: for each x at index i, check if (target-x) is already a key. If yes → return pair. Else add x→i to map. This 'complement search' pattern reappears in many problems.",
    example: "arr=[2,7,11,15], target=9. i=0: x=2, need 7. Not in map. Add 2→0. i=1: x=7, need 2. 2 IS in map at index 0 → return [0,1].",
    problem: "Two Sum: return INDICES of two numbers that add up to target. Exactly one answer guaranteed.",
    link: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
  },
  {
    day: 17, topic: "Arrays", title: "Next Permutation — Master Trick",
    diff: "Hard", time: 45,
    concept: "Hard but elegant. 'Next permutation' = next lexicographic arrangement. Recipe: scan from right to find the first 'dip' (arr[i]<arr[i+1]). Then find the smallest element > arr[i] to the right. Swap. Reverse the suffix. This guarantees the smallest possible larger arrangement.",
    pattern: "(1) From right, find pivot i where arr[i]<arr[i+1]. (2) From right, find smallest j>i with arr[j]>arr[i]. (3) swap(i,j). (4) Reverse arr[i+1..n-1]. If no pivot exists, just reverse whole array.",
    example: "arr=[1,3,5,4,2]. Right-scan: 2<4? no. 4<5? no. 5<3? no. 3<5? YES, pivot=index 1 (val 3). Find smallest >3 to right: 4. Swap → [1,4,5,3,2]. Reverse suffix [5,3,2] → [2,3,5]. Result: [1,4,2,3,5].",
    problem: "Next Permutation in-place. If already largest (sorted desc), return smallest (sorted asc).",
    link: "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/"
  },

  // ============ WEEK 3: STRINGS ============
  {
    day: 18, topic: "Strings", title: "Strings = Char Arrays — Reverse & Palindrome",
    diff: "Easy", time: 20,
    concept: "Strings are essentially arrays of characters. Almost all array techniques (two pointers, sliding window) work on strings. Note: in Java/Python, strings are immutable — convert to char[] or list for in-place. In C++, strings are mutable.",
    pattern: "Two pointers from both ends. Used for reverse, palindrome check, and many comparison problems.",
    example: "s='racecar'. l=0, r=6. s[0]=r, s[6]=r ✓. l=1, r=5. s[1]=a, s[5]=a ✓. l=2, r=4. s[2]=c, s[4]=c ✓. l=3, r=3, stop. Palindrome.",
    problem: "Solve TWO problems: (1) reverse a string in-place, (2) check if a string is a palindrome (case-insensitive, alphanumeric only).",
    link: "https://takeuforward.org/strings/palindrome/"
  },
  {
    day: 19, topic: "Strings", title: "Frequency Counting — Valid Anagram",
    diff: "Easy", time: 25,
    concept: "Anagram = same characters, different order ('listen' & 'silent'). Two strings are anagrams iff they have identical character frequencies. Use a 26-size array (lowercase a-z) — most efficient. Generic chars → use hashmap.",
    pattern: "Frequency array of size 26 — index = c - 'a'. Increment for s1, decrement for s2. End: all zeros means anagram. One pass per string, O(N) time, O(1) space (26 is constant).",
    example: "s1='anagram', s2='nagaram'. Counts after s1: a=3,n=1,g=1,r=1,m=1. Subtract s2 chars: n→0, a→2, g→0, a→1, r→0, a→0, m→0. All zero → anagram. ✓",
    problem: "Given two strings, check if they're anagrams. O(N) time, O(1) extra space (assuming lowercase a-z).",
    link: "https://takeuforward.org/strings/anagram-strings/"
  },
  {
    day: 20, topic: "Strings", title: "Sliding Window on String — Longest Without Repeat",
    diff: "Medium", time: 40,
    concept: "Same variable-size sliding window pattern as Day 10, applied to strings. Constraint: all characters in the window must be unique. When you encounter a duplicate, shrink from the left until the window becomes valid again.",
    pattern: "Window with a set/map of characters in window. R expands; if s[R] is already in set, while s[R] in set: remove s[L], L++. Add s[R] to set. Track max(R-L+1).",
    example: "s='abcabcbb'. L=0. R=0:a, set={a}, len=1. R=1:b, set={a,b}, len=2. R=2:c, set={a,b,c}, len=3 (best). R=3:a — in set! Remove s[0]=a, L=1. Add a. R=4:b — in set! Remove s[1]=b, L=2. Add b. ... continues. Max length=3.",
    problem: "Longest substring without repeating characters. Return the LENGTH.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    day: 21, topic: "Strings", title: "Vertical Scan — Longest Common Prefix",
    diff: "Easy", time: 25,
    concept: "Given multiple strings, find the longest prefix common to all. Trick: scan VERTICALLY — pick characters one column at a time across all strings. Stop the first time they don't all match (or any string ends).",
    pattern: "Outer loop on character index i. Inner loop checks s[0][i] vs s[k][i] for all k. Mismatch or end → return prefix up to i.",
    example: "['flower','flow','flight']. i=0: f,f,f match. i=1: l,l,l match. i=2: o,o,i — mismatch! Stop. Common prefix = 'fl'.",
    problem: "Find the longest common prefix across an array of strings. Empty input → return ''.",
    link: "https://takeuforward.org/strings/longest-common-prefix/"
  },

  // ============ WEEK 4: HASHING ============
  {
    day: 22, topic: "Hashing", title: "Hashing Fundamentals — Set vs Map",
    diff: "Easy", time: 30,
    concept: "Hash table = magical box that does insert, delete, search in O(1) average. Two flavors: SET (just keys, for 'is X present?') and MAP (key→value, for counts/lookups). Trade-off: O(N) extra space. The #1 way to convert O(N²) brute force into O(N).",
    pattern: "Whenever you find yourself nesting two for-loops to compare every pair, ask: can a hashmap remember what I've already seen?",
    example: "Find duplicates in [1,2,3,2,4]. Brute: O(N²). With set: iterate; if x in set → duplicate found; else add x. i=0: add 1. i=1: add 2. i=2: add 3. i=3: 2 in set → duplicate found! O(N) time.",
    problem: "Given an array, return TRUE if any element appears at least twice. Use a hash set.",
    link: "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    day: 23, topic: "Hashing", title: "Frequency Map — Count Occurrences",
    diff: "Easy", time: 25,
    concept: "Frequency map = hashmap of {value → count}. Used everywhere: most frequent element, top-K, finding majority, anagram groups. The pattern: one pass to build the map, second pass (or sort) to extract the answer.",
    pattern: "Build map: for x in arr → map[x] = (map[x] || 0) + 1. Then iterate the map for whatever you need (max value, k-th most frequent, etc).",
    example: "arr=[1,1,1,2,2,3]. Map: {1:3, 2:2, 3:1}. Sort entries by count desc: [(1,3),(2,2),(3,1)]. Top 2 frequent = [1, 2].",
    problem: "Given an array, return the K most frequent elements. Order doesn't matter.",
    link: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    day: 24, topic: "Hashing", title: "Hash Set Lookup — Longest Consecutive Sequence",
    diff: "Medium", time: 40,
    concept: "Beautiful trick. Naive: sort, scan for consecutive runs — O(N log N). Better: dump everything in a set. For each number, check if it's a 'streak start' (n-1 NOT in set). If yes, walk forward (n+1, n+2, ...) counting. Each element is touched at most twice → O(N).",
    pattern: "Set lookup + 'streak start' filter. Don't process elements in the middle of a streak — wait until you hit the start.",
    example: "arr=[100,4,200,1,3,2]. Set={100,4,200,1,3,2}. n=100: 99 not in set → start. Walk: 101 not in set. Streak=1. n=4: 3 IS in set, skip (not start). n=200: 199 not in set → start. Streak=1. n=1: 0 not in set → start. Walk: 2,3,4 all in set. Streak=4. ← winner.",
    problem: "Longest Consecutive Sequence: given an UNSORTED array, find the longest run of consecutive integers. O(N) time required.",
    link: "https://leetcode.com/problems/longest-consecutive-sequence/"
  },
  {
    day: 25, topic: "Hashing", title: "Group by Hash Key — Group Anagrams",
    diff: "Medium", time: 35,
    concept: "Sometimes you want to GROUP items that share a property. Trick: design a 'canonical key' — a representation such that all members of a group produce the same key. Anagrams → sorted string. Numbers by digit-sum → sum. Keys hash into a map of lists.",
    pattern: "for each item: compute key (sorted chars / freq tuple / fingerprint). Append to map[key]. Output = all map values.",
    example: "['eat','tea','tan','ate','nat','bat']. Keys: 'aet','aet','ant','aet','ant','abt'. Groups: 'aet'→['eat','tea','ate'], 'ant'→['tan','nat'], 'abt'→['bat'].",
    problem: "Group Anagrams. Return groups in any order.",
    link: "https://leetcode.com/problems/group-anagrams/"
  },
  {
    day: 26, topic: "Hashing", title: "Prefix Sum + Hash — Subarrays with Sum K (revisit)",
    diff: "Medium", time: 35,
    concept: "Re-do Day 15 problem now that hashing is solid. The combo of prefix sum + hashmap is one of the most powerful tools in array problems. Master this and you'll see it in interview questions about subarray counts, divisibility, longest balanced subarray, etc.",
    pattern: "Running sum + map of {prefixSum → count}. Each iteration: check if (sum-K) is a key. Add its count to answer. Then update map[sum]++.",
    example: "arr=[1,1,1], K=2. sum=0, map={0:1}. i=0: sum=1, need -1. ans=0. map={0:1,1:1}. i=1: sum=2, need 0. ans=1. map={0:1,1:1,2:1}. i=2: sum=3, need 1. ans=2.",
    problem: "Re-implement Subarray Sum Equals K. Test it on [1,2,1,2,1] with K=3 — answer should be 4.",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/"
  },

  // ============ WEEK 5: BINARY SEARCH ============
  {
    day: 27, topic: "Binary Search", title: "Binary Search Fundamentals",
    diff: "Easy", time: 30,
    concept: "Binary search = the most important O(log N) algorithm. Works on SORTED data. Each step halves the search space. Watch out: edge cases on low/high updates and overflow with (low+high)/2 → use low + (high-low)/2.",
    pattern: "low=0, high=n-1. while low<=high: mid = low+(high-low)/2. arr[mid]==target → return mid. arr[mid]<target → low=mid+1. else → high=mid-1.",
    example: "arr=[2,5,8,12,16,23,38,56,72,91], target=23. l=0,h=9,m=4. arr[4]=16<23 → l=5. l=5,h=9,m=7. arr[7]=56>23 → h=6. l=5,h=6,m=5. arr[5]=23 → found at index 5.",
    problem: "Implement binary search. Return index of target, or -1 if not present.",
    link: "https://takeuforward.org/data-structure/binary-search-explained/"
  },
  {
    day: 28, topic: "Binary Search", title: "Lower & Upper Bound",
    diff: "Easy", time: 30,
    concept: "Two essential variants. Lower bound = first index where arr[i] ≥ target. Upper bound = first index where arr[i] > target. Combined, they tell you 'how many of X exist in this sorted array' (= upper - lower).",
    pattern: "Lower bound: when arr[mid] >= target → ans=mid, h=mid-1 (try smaller index). Else → l=mid+1. Upper bound: same with strict >.",
    example: "arr=[1,2,2,2,3], target=2. Lower bound: first index ≥ 2 = index 1. Upper bound: first index > 2 = index 4. Count of 2s = 4-1 = 3. ✓",
    problem: "Implement BOTH lower_bound and upper_bound. Use them to count occurrences of a value in a sorted array.",
    link: "https://takeuforward.org/arrays/implement-lower-bound-bs-2/"
  },
  {
    day: 29, topic: "Binary Search", title: "Search Rotated Sorted Array",
    diff: "Medium", time: 40,
    concept: "Twist: array is sorted, then rotated at some pivot. Binary search still applies! Key insight: at any mid, EITHER the left half [low..mid] OR the right half [mid..high] must be sorted. Identify which half is sorted, and check if target lies in it.",
    pattern: "After computing mid: if arr[low]<=arr[mid] → left half is sorted. Check if target in [arr[low], arr[mid]). If yes → high=mid-1, else low=mid+1. Else right half is sorted — symmetric logic.",
    example: "arr=[4,5,6,7,0,1,2], target=0. l=0,h=6,m=3. arr[m]=7. arr[l]=4 ≤ 7 → left sorted [4..7]. Is 0 in [4,7)? No → l=4. l=4,h=6,m=5. arr[m]=1. arr[l]=0 ≤ 1 → left sorted [0..1]. Is 0 in [0,1)? Yes → h=4. l=4,h=4,m=4. arr[m]=0 → found.",
    problem: "Search a rotated sorted array (no duplicates). Return index or -1. O(log N).",
    link: "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/"
  },
  {
    day: 30, topic: "Binary Search", title: "BS on Answer Space — Sqrt(N)",
    diff: "Medium", time: 35,
    concept: "Binary search isn't just for arrays — it works on the ANSWER itself when the answer is monotonic (predicate flips from false→true exactly once). For sqrt: answer lies in [1..N]. Predicate: 'is mid² ≤ N?' — true for small mid, false for big. Find largest TRUE.",
    pattern: "Identify search space (answer range) + monotone check function. while l<=h: mid; if check(mid) is good, save it and try further (or smaller, depending on direction). Else, search the other half.",
    example: "N=27. l=1, h=27. m=14: 14²=196 > 27 → h=13. m=7: 49>27 → h=6. m=3: 9≤27, save 3, l=4. m=5: 25≤27, save 5, l=6. m=6: 36>27, h=5. l>h, return 5. ✓ (5²=25 ≤ 27 < 36=6²).",
    problem: "Find integer square root of N (largest k such that k² ≤ N). Don't use built-in sqrt.",
    link: "https://takeuforward.org/binary-search/finding-sqrt-of-a-number-using-binary-search/"
  },
  {
    day: 31, topic: "Binary Search", title: "BS on Answer — Koko Eating Bananas",
    diff: "Medium", time: 45,
    concept: "Hardest BS pattern but extremely common in interviews. When the question is 'find the minimum X such that some condition holds', and bigger X clearly makes condition easier → binary search on X. Examples: capacity to ship in D days, eating speed, painter partition.",
    pattern: "search space = [min possible X, max possible X]. Predicate: 'can we satisfy the condition with this X?' — monotonic. Find smallest X that works.",
    example: "piles=[3,6,7,11], H=8 hours. min K=1, max K=11. m=6: hours = ⌈3/6⌉+⌈6/6⌉+⌈7/6⌉+⌈11/6⌉ = 1+1+2+2=6 ≤8 ✓ → save 6, h=5. m=3: 1+2+3+4=10>8 ✗ → l=4. m=4: 1+2+2+3=8≤8 ✓ save 4, h=3. l>h. Answer: 4.",
    problem: "Koko Eating Bananas. Given piles[] and hours H, find minimum eating speed K so Koko finishes in H hours.",
    link: "https://takeuforward.org/binary-search/koko-eating-bananas/"
  },

  // ============ WEEK 6: RECURSION & BACKTRACKING ============
  {
    day: 32, topic: "Recursion", title: "Recursion Fundamentals",
    diff: "Easy", time: 30,
    concept: "Recursion = a function that calls itself. Two ingredients: BASE CASE (when to stop) and RECURSIVE CASE (smaller subproblem). Mental model: each call has its own copy of variables, lives on the call stack until it returns. Stack overflow happens when recursion is too deep (~10⁴ frames in most languages).",
    pattern: "Step 1: define what f(n) returns. Step 2: write base case. Step 3: write recursive call assuming f(n-1) (or similar) already works — this is the 'leap of faith'.",
    example: "Factorial: f(n) = n * f(n-1). Base: f(0)=1. Trace f(4): 4*f(3) = 4*(3*f(2)) = 4*(3*(2*f(1))) = 4*3*2*1*f(0) = 4*3*2*1*1 = 24. Stack depth = N.",
    problem: "Write THREE recursive functions: (1) print 1 to N, (2) factorial of N, (3) sum of array elements (without loops).",
    link: "https://takeuforward.org/recursion/introduction-to-recursion/"
  },
  {
    day: 33, topic: "Recursion", title: "Recursion on Arrays — Reverse via Recursion",
    diff: "Easy", time: 30,
    concept: "Recursion can be a clean way to express array transformations. Tip: most array recursion uses TWO indices (l, r) or ONE index + the array. Don't pass copies — that's O(N²) memory waste; pass the array by reference + indices.",
    pattern: "f(arr, l, r): base case l>=r return. swap(arr[l], arr[r]). f(arr, l+1, r-1).",
    example: "arr=[1,2,3,4,5]. f(0,4): swap → [5,2,3,4,1]. f(1,3): swap → [5,4,3,2,1]. f(2,2): base case, return. Done.",
    problem: "Reverse an array using recursion (no loops). Bonus: check if string is palindrome using recursion.",
    link: "https://takeuforward.org/recursion/introduction-to-recursion/"
  },
  {
    day: 34, topic: "Recursion", title: "Subset/Subsequence Generation — Pick or Don't",
    diff: "Medium", time: 45,
    concept: "Foundational backtracking pattern. For each element, you have TWO choices: include it or skip it. Recursion explores both. Total subsets of N elements = 2^N. This 'pick/not-pick' pattern unlocks: subsets, combinations, knapsack, partitions.",
    pattern: "f(index, currentSubset): base case index==n → record currentSubset, return. Recurse WITHOUT picking. Add arr[index] to currentSubset. Recurse WITH picking. Remove (backtrack).",
    example: "arr=[1,2,3]. Tree: at idx 0, branches with/without 1. At idx 1, branches with/without 2. At idx 2, branches with/without 3. Leaves: 8 subsets — [], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3].",
    problem: "Print all subsets (power set) of an array. Size of output = 2^N.",
    link: "https://takeuforward.org/recursion/print-all-subsequences-of-an-array/"
  },
  {
    day: 35, topic: "Recursion", title: "Backtracking Intro — Permutations",
    diff: "Medium", time: 45,
    concept: "Backtracking = recursion + 'try, then undo on the way out'. Generate every arrangement by, at each step, picking an unused element and recursing. After the recursive call, UNDO your pick so the next iteration can try a different one.",
    pattern: "f(currentArrangement, used[]): if length==n → record. for each i: if !used[i]: pick arr[i], used[i]=true, recurse; then undo (pop and used[i]=false).",
    example: "arr=[1,2,3]. At top: try 1 → [1,?,?]. Recurse: try 2 → [1,2,?] → try 3 → [1,2,3] ✓. Backtrack → try 3 first → [1,3,2] ✓. Backtrack to top → try 2: [2,1,3], [2,3,1]. Try 3: [3,1,2], [3,2,1]. Total 6 = 3!.",
    problem: "Generate ALL permutations of an array of distinct integers.",
    link: "https://takeuforward.org/data-structure/print-all-permutations-of-a-string-array/"
  },

  // ============ WEEK 7: LINKED LISTS ============
  {
    day: 36, topic: "Linked List", title: "LL Fundamentals — Build & Traverse",
    diff: "Easy", time: 30,
    concept: "Linked list = nodes connected by pointers. Each node has data + next. No random O(1) indexing — must walk from head. Pros: O(1) insert/delete at known position. Cons: O(N) search. The trade-off vs arrays: arrays = fast access; LL = fast modification.",
    pattern: "Define a Node class with val and next. Always keep a 'head' pointer. To traverse: while curr != null: do something; curr = curr.next.",
    example: "List 1→2→3→null. Build: head = new Node(1). head.next = new Node(2). head.next.next = new Node(3). Traverse and print: 1 2 3.",
    problem: "Build a linked list from an array. Then traverse and print all values. Then count nodes.",
    link: "https://takeuforward.org/linked-list/introduction-to-linked-list-singly-doubly-circular/"
  },
  {
    day: 37, topic: "Linked List", title: "Reverse a Linked List — Three Pointers",
    diff: "Easy", time: 35,
    concept: "Most-asked LL question. Trick: maintain three pointers — prev, curr, next. At each step: save next, redirect curr.next to prev, advance prev and curr. After loop, prev is the new head.",
    pattern: "prev=null, curr=head. while curr: next = curr.next; curr.next = prev; prev = curr; curr = next. Return prev.",
    example: "List 1→2→3→null. prev=null, c=1. next=2, 1.next=null, prev=1, c=2. next=3, 2.next=1, prev=2, c=3. next=null, 3.next=2, prev=3, c=null. Stop. New list: 3→2→1→null.",
    problem: "Reverse a singly linked list. Iterative AND recursive solutions.",
    link: "https://takeuforward.org/data-structure/reverse-a-linked-list/"
  },
  {
    day: 38, topic: "Linked List", title: "Slow & Fast Pointer — Middle + Cycle",
    diff: "Easy", time: 35,
    concept: "Floyd's tortoise and hare. slow moves 1 step, fast moves 2 steps. (1) When fast hits null, slow = middle. (2) If list has a cycle, fast will eventually catch up to slow. This is the most powerful LL technique — appears in many problems.",
    pattern: "slow=head, fast=head. while fast && fast.next: slow=slow.next; fast=fast.next.next. End: slow is middle (for find-middle), or detect collision (for cycle).",
    example: "Find middle of 1→2→3→4→5. s=1,f=1. Iter 1: s=2, f=3. Iter 2: s=3, f=5. Iter 3: f.next=null → stop. Middle = 3. ✓",
    problem: "Solve TWO problems: (1) find the middle node of a linked list, (2) detect if a linked list has a cycle (return true/false).",
    link: "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/"
  },
  {
    day: 39, topic: "Linked List", title: "Merge Two Sorted Lists — Dummy Node",
    diff: "Easy", time: 30,
    concept: "Dummy node trick: create a fake node before the real head to avoid special-casing the empty result. Walk both lists with two pointers, attach the smaller node to the result tail, advance.",
    pattern: "dummy = new Node(); tail = dummy. while a && b: if a.val <= b.val → tail.next=a, a=a.next; else tail.next=b, b=b.next. tail=tail.next. After loop, append remaining list. Return dummy.next.",
    example: "a: 1→3→5, b: 2→4→6. Pick 1 → result:1. Pick 2 → 1→2. Pick 3 → 1→2→3. Pick 4 → 1→2→3→4. Pick 5 → ...→5. Pick 6 → ...→6. Done.",
    problem: "Merge two sorted linked lists into one sorted list. Return head.",
    link: "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/"
  },
  {
    day: 40, topic: "Linked List", title: "Two-Pass vs One-Pass — Remove Nth From End",
    diff: "Medium", time: 35,
    concept: "Two-pass approach: count length L, then remove (L-N+1)th from start. One-pass: gap pointer trick — fast pointer moves N steps ahead, then both move together until fast hits end. Slow is now at the node BEFORE the one to remove.",
    pattern: "Use dummy node to simplify edge case (removing head). slow=dummy, fast=dummy. Move fast N+1 steps. Then move both till fast becomes null. slow.next = slow.next.next.",
    example: "List 1→2→3→4→5, N=2. dummy→1→2→3→4→5. f moves 3 steps to node 3. Move both: s=1,f=4. s=2,f=5. s=3,f=null. Stop. s.next.next = 5. Result: 1→2→3→5.",
    problem: "Remove the Nth node from the END of a linked list. Try one-pass.",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },

  // ============ WEEK 8: STACKS, QUEUES, MONOTONIC PATTERNS ============
  {
    day: 41, topic: "Stack", title: "Stack Fundamentals — Valid Parentheses",
    diff: "Easy", time: 30,
    concept: "Stack = LIFO container. push, pop, top — all O(1). Use case: 'most recent unfinished thing' problems — bracket matching, undo, function calls. Whenever you see nested structure (brackets, tags, recursion), think stack.",
    pattern: "On opening symbol → push. On closing → check stack top matches: if yes pop; if no/empty return false. End: stack must be empty.",
    example: "s='([{}])'. ( push. [ push. { push. } pop {. ] pop [. ) pop (. End: stack empty → valid. ✓ Counter: '(]' → ( push. ] expects [, top is ( → invalid.",
    problem: "Valid Parentheses: given a string of (), [], {} — return true if all brackets are correctly matched and nested.",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    day: 42, topic: "Stack", title: "Monotonic Stack — Next Greater Element",
    diff: "Medium", time: 40,
    concept: "Monotonic stack = stack that maintains sorted order (always increasing or always decreasing). Magic: lets you answer 'next greater/smaller element' in O(N) total. Whenever a question asks about 'first/next bigger/smaller element to the right (or left)', monotonic stack is the tool.",
    pattern: "Iterate right to left. Stack stores values. While stack non-empty AND stack.top <= current → pop. Answer for current = (stack empty ? -1 : stack.top). Push current.",
    example: "arr=[2,1,2,4,3]. i=4 (3): stack empty → ans=-1. push 3. i=3 (4): pop 3 (3≤4). empty → ans=-1. push 4. i=2 (2): top=4>2 → ans=4. push 2. i=1 (1): top=2>1 → ans=2. push 1. i=0 (2): pop 1, top=2≤2 pop, top=4>2 → ans=4. Result: [4,2,4,-1,-1].",
    problem: "Next Greater Element: for each index i, find the next index j>i with arr[j] > arr[i]. If none, output -1.",
    link: "https://takeuforward.org/data-structure/next-greater-element-using-stack/"
  },
  {
    day: 43, topic: "Queue", title: "Queue Fundamentals + Stack-Queue Conversion",
    diff: "Medium", time: 40,
    concept: "Queue = FIFO container. enqueue (back), dequeue (front) — both O(1). Used for BFS, level-order traversal, scheduling. Fun interview classic: implement a queue using two stacks. Trick: one stack for enqueue, one for dequeue. When dequeue stack is empty, dump everything from enqueue stack to it (reverses order).",
    pattern: "Two stacks: in (for push) and out (for pop). push → in.push. pop → if out empty: while in non-empty: out.push(in.pop()); then out.pop().",
    example: "Push 1,2,3. in=[1,2,3], out=[]. Pop: out empty → dump → out=[3,2,1] (top is 1). Pop returns 1. Pop returns 2. Push 4: in=[4]. Pop: out=[3], pop returns 3. Pop: out empty → dump 4 → out=[4]. Pop returns 4. ✓ FIFO order maintained.",
    problem: "Implement a queue using two stacks. Support push, pop, peek, empty.",
    link: "https://leetcode.com/problems/implement-queue-using-stacks/"
  },

  // ============ WEEK 9: TREES (PREVIEW) ============
  {
    day: 44, topic: "Trees", title: "Binary Tree Intro — DFS Traversals",
    diff: "Easy", time: 40,
    concept: "Binary tree = each node has up to 2 children (left, right). Three classic DFS traversals: PRE-order (root → left → right), IN-order (left → root → right), POST-order (left → right → root). All naturally recursive. In-order on a BST gives sorted output.",
    pattern: "void traverse(node): if node==null return. (visit-here for pre). traverse(node.left). (visit-here for in). traverse(node.right). (visit-here for post).",
    example: "Tree: 1 with left=2 (left=4, right=5), right=3. Pre-order: 1,2,4,5,3. In-order: 4,2,5,1,3. Post-order: 4,5,2,3,1.",
    problem: "Given a binary tree, print all three traversals (pre, in, post). Recursive solutions are fine.",
    link: "https://takeuforward.org/binary-tree/preorder-inorder-postorder-traversals-in-one-traversal/"
  },
  {
    day: 45, topic: "Trees", title: "BFS — Level Order Traversal + Mock Day",
    diff: "Medium", time: 60,
    concept: "Last day! BFS = breadth-first using a queue. Process level by level: dequeue node, add its children. To get level-by-level groupings (not just one flat list), process all nodes currently in queue as one level — that count is queue.size() at the start of the loop iteration.",
    pattern: "queue with root. while queue: levelSize = queue.size; for i in 0..levelSize: node = dequeue; record node.val in current level; enqueue children. Save level, repeat.",
    example: "Same tree (1, with 2 and 3, 2 has 4,5). Q=[1]. Lvl 0: process 1, enqueue 2,3 → [2,3]. Lvl 1: process 2 (en 4,5), 3 → [4,5]. Lvl 2: process 4, 5. Levels: [[1],[2,3],[4,5]].",
    problem: "MOCK DAY. Pick TWO problems from past 44 days that you struggled with. Re-solve from scratch without hints. Then solve: Level Order Traversal (BFS) of a binary tree.",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
];

const SYSTEM_DESIGN_TOPICS = [
  { title: "Client-Server Architecture", read: "The client (browser/app) sends requests to a server (a machine running your code). Server processes, talks to DB, returns response. Stateless HTTP — every request stands alone. Why care: every system you'll design starts here. Know request/response cycle, status codes (200/400/500), and TCP underneath HTTP.",
    practice: "Sketch what happens when you type google.com → press Enter. List every component touched: DNS, TCP handshake, TLS, HTTP request, server, response." },
  { title: "Scaling: Vertical vs Horizontal", read: "Vertical (scale up) = bigger machine — more RAM/CPU. Easy but expensive, hard cap. Horizontal (scale out) = more machines behind a load balancer. Cheaper at scale, but adds complexity (state, sessions, consistency). Modern systems prefer horizontal.",
    practice: "If your app gets 10x traffic tomorrow, list 3 things you'd scale vertically and 3 horizontally and why." },
  { title: "Load Balancers", read: "Sits between clients and servers. Distributes traffic. Algorithms: round-robin (rotate), least-connections (pick least busy), IP hash (sticky session). L4 (TCP) vs L7 (HTTP — can route by URL path). Examples: NGINX, HAProxy, AWS ELB.",
    practice: "Explain why a stateful chat session might break behind a round-robin LB. How would IP hash or sticky sessions fix it?" },
  { title: "Caching (Redis/Memcached)", read: "Store frequently-read data in memory to skip slow DB hits. Patterns: cache-aside (app reads cache, on miss reads DB & populates), write-through (write to cache + DB), write-back (write to cache, flush later). TTL = expiry. Eviction: LRU/LFU. Watch out for stale data and cache stampedes.",
    practice: "Design a 'top 10 trending posts' cache. What's TTL? What invalidates it? What if cache server dies?" },
  { title: "CDN (Content Delivery Network)", read: "Geographically distributed servers caching static content (images, JS, CSS, video). User hits nearest edge → faster. Origin server only hit on cache miss. Examples: Cloudflare, Akamai, AWS CloudFront. Use for static; not great for highly personalized data.",
    practice: "Explain why a global news site uses a CDN but a stock-trading app might not cache prices on one." },
  { title: "SQL vs NoSQL", read: "SQL (Postgres, MySQL) — structured tables, ACID, joins, strong consistency. Best for relational, transactional data. NoSQL — document (Mongo), key-value (Redis), wide-column (Cassandra), graph (Neo4j). Flexible schema, horizontal scaling, eventual consistency. Pick based on access patterns, not hype.",
    practice: "For an e-commerce app: which model for users, orders, product catalog, browsing history? Justify each." },
  { title: "Database Indexing", read: "Index = extra data structure (usually B-Tree) that makes lookups O(log N) instead of O(N). Trade-off: faster reads, slower writes (must update index), more storage. Composite indexes work left-to-right. Don't index everything.",
    practice: "Given a query 'WHERE country='IN' AND age>25', what index helps? What about 'WHERE age>25 AND country='IN''?" },
  { title: "Sharding (Horizontal Partitioning)", read: "Split a table across multiple DB instances by some key (user_id range, hash, geo). Each shard holds part of data. Pros: massive scale. Cons: cross-shard joins are hell, rebalancing is painful, hot keys cause skew. Use consistent hashing to minimize re-shard pain.",
    practice: "If you shard users by user_id % 4, what breaks when you add a 5th shard? How does consistent hashing help?" },
  { title: "Replication", read: "Multiple copies of data. Master-slave: one writes, many read. Master-master: any node writes (conflict resolution required). Pros: high availability, read scaling. Cons: replication lag → stale reads. Sync replication = consistent but slow; async = fast but eventually consistent.",
    practice: "Your app reads a user's just-posted comment but doesn't see it. Diagnose. What's the fix?" },
  { title: "CAP Theorem", read: "Distributed systems can guarantee at most 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (works despite network splits). In practice you must choose CP or AP since partitions happen. CA only works in single-node systems.",
    practice: "Banking → CP or AP? Twitter feed → CP or AP? Stock ticker? Justify each." },
  { title: "Microservices", read: "Split a monolith into independent services, each owning its DB and deployable separately. Pros: team autonomy, scale per service, language flexibility. Cons: distributed system pain — network calls, eventual consistency, debugging across 30 services, ops overhead.",
    practice: "When should you NOT use microservices? List 3 signs your team isn't ready." },
  { title: "Message Queues (Kafka/RabbitMQ)", read: "Async communication. Producer puts message in queue, consumer reads later. Decouples services. Use for: emails, notifications, processing pipelines, event sourcing. Kafka = high throughput, persistent log, partitioned. RabbitMQ = traditional pub/sub, flexible routing.",
    practice: "User uploads a video. Walk through the queue-based pipeline: upload → encode → thumbnail → notify. Why queues here?" },
  { title: "Rate Limiting", read: "Prevent abuse / overload. Algorithms: token bucket (refill rate, allows bursts), leaky bucket (constant outflow), fixed window (simpler, edge bursts), sliding window (smoother, more memory). Implement at gateway / API layer. Return 429.",
    practice: "Design rate limiting: 100 req/min per user. Compare token bucket vs sliding window — which would you pick?" },
  { title: "Consistent Hashing", read: "When using N servers, hash(key)%N breaks badly when N changes (almost all keys remap). Consistent hashing: place servers and keys on a ring; key goes to next clockwise server. Adding/removing a server only remaps ~1/N keys. Used in DBs, caches, CDNs.",
    practice: "Explain why Memcached cluster scaling without consistent hashing causes a 'cache stampede.'" },
  { title: "Design TinyURL", read: "Service: long URL → short URL (~7 chars). Approach: generate unique ID (counter or random), base62-encode → short slug. Store slug→URL in DB. Cache hot URLs. Scale: shard by slug hash. Custom URLs need check-and-set.",
    practice: "Why is base62 (a-z A-Z 0-9) used over base10? Calculate how many URLs 7 chars of base62 can represent." },
  { title: "Design Twitter Feed", read: "Two strategies. Pull (fan-out on read): on feed-load, query everyone you follow, merge — works for users following many. Push (fan-out on write): on tweet, write into followers' feeds — fast read, expensive for celebrities. Real-world: hybrid (push for normal, pull for celebs).",
    practice: "Why does pure push fail for accounts with 100M+ followers (think Elon, Modi)?" },
  { title: "Design WhatsApp", read: "Realtime messaging. WebSocket persistent connection per user. Messages routed via central servers, stored in DB if recipient offline. End-to-end encryption: keys generated client-side. Use queues for offline delivery. Scale: shard by user_id.",
    practice: "How would you handle 'last seen' efficiently for 2 billion users without hammering the DB?" },
  { title: "Design URL Shortener Database", read: "Schema: { slug, long_url, user_id, created_at, expires_at, click_count }. Index on slug. Click counting at scale → don't UPDATE on every click; increment in Redis, flush to DB periodically. Or analytics service.",
    practice: "Why is incrementing click_count on every click in the main DB a terrible idea at scale? List the alternatives." },
  { title: "Design Instagram Feed", read: "Posts table, follows table, media on object storage (S3) + CDN. Feed = posts from followees, sorted. Use precomputed feeds (Redis lists) for active users. Image upload → async pipeline (resize, compress, transcode video). Stories = ephemeral, separate flow.",
    practice: "Walk through what happens server-side when a user posts a photo with a caption. List every storage hit." },
  { title: "Design Uber/Ola", read: "Driver location updates every few seconds. Server uses geo-index (geohash, quad-tree) to find nearby drivers. Match driver-rider, lock both. Realtime trip updates via WebSocket. Pricing engine considers surge, distance, time.",
    practice: "Driver pings location every 4s. With 100k active drivers in a city, what's the write load? How would you batch?" },
  { title: "WebSockets vs Polling", read: "HTTP polling: client asks every X sec — wasteful. Long polling: server holds request until data ready. WebSockets: persistent bidirectional connection over TCP, low latency, ideal for chat/games/realtime. SSE: server-to-client only, simpler.",
    practice: "Chat app, stock dashboard, notification banner — pick the right protocol for each." },
  { title: "Idempotency", read: "An operation is idempotent if repeating it has same effect as doing once. GET/PUT/DELETE = idempotent. POST usually isn't. Pay APIs: client sends idempotency-key; server stores result and returns same on retry — prevents double-charging.",
    practice: "User clicks 'Pay $500' twice (network glitch). Without idempotency keys, what happens? With? Sketch the server logic." },
  { title: "Database Transactions & ACID", read: "Atomicity (all or none), Consistency (DB stays valid), Isolation (concurrent txns don't see each other's mid-state), Durability (committed = saved on disk). Isolation levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable.",
    practice: "Two users buy the last concert ticket at the same time. Which isolation level prevents double-sale? What's the trade-off?" },
  { title: "Bloom Filters", read: "Probabilistic data structure that says 'definitely not in set' or 'maybe in set'. Tiny memory. False positives possible, no false negatives. Used in: caches (avoid hitting DB for missing keys), spam filters, password leak checks.",
    practice: "Why do CDNs use Bloom filters before checking origin servers? What % memory savings vs full hash set?" },
  { title: "Microservice Communication", read: "Sync (REST, gRPC) — caller waits, easy to reason about, but tight coupling. Async (queues, events) — loose coupling, resilient, but eventual consistency and harder debugging. Saga pattern handles distributed txns via compensating actions.",
    practice: "Order-service must update Payment, Inventory, Shipping. Compare REST chain vs event-driven saga — failure modes of each." },
];

const CORE_CS_TOPICS = [
  // OS
  { area: "OS", title: "Process vs Thread", read: "Process = independent program with its own memory space. Thread = lightweight unit of execution within a process; threads of same process share memory. Threads cheaper to create, easier to communicate (shared memory) but need synchronization (mutex/semaphore). Processes safer (isolated) but heavier.",
    Q: "Why does Chrome use processes per tab while VS Code uses threads internally?" },
  { area: "OS", title: "CPU Scheduling Algorithms", read: "FCFS (simple, convoy effect), SJF (optimal avg wait but starvation, needs prediction), Round Robin (fair, time quantum), Priority (priority inversion risk), Multi-level Feedback Queue (modern OS like Linux CFS). Trade-offs: throughput vs fairness vs response time.",
    Q: "Why doesn't real-world Linux use pure SJF despite its theoretical optimality?" },
  { area: "OS", title: "Deadlock — 4 conditions", read: "Coffman conditions, all 4 needed: (1) Mutual exclusion, (2) Hold and wait, (3) No preemption, (4) Circular wait. Break any one to avoid deadlock. Strategies: prevention, avoidance (Banker's), detection + recovery, ostrich (ignore — most OS).",
    Q: "Two threads: A holds lock1 wants lock2; B holds lock2 wants lock1. Which condition would you break and how?" },
  { area: "OS", title: "Paging & Virtual Memory", read: "Virtual memory lets each process think it owns all memory. OS maps virtual pages to physical frames via page table. TLB caches mappings. Page fault → OS fetches from disk (slow). Demand paging = load pages only when needed. Allows running programs > RAM.",
    Q: "Why does adding RAM make a swapping system feel dramatically faster (not just linearly)?" },
  { area: "OS", title: "Mutex vs Semaphore", read: "Mutex = lock owned by one thread at a time, only owner unlocks (mutual exclusion). Semaphore = counter, signal/wait, no ownership, can let N threads in. Binary semaphore ≈ mutex but no ownership constraint. Pick mutex for resource locking; semaphore for signaling/limiting concurrency.",
    Q: "Producer-consumer with bounded buffer — how many semaphores needed and what does each represent?" },
  // DBMS
  { area: "DBMS", title: "Normalization (1NF→3NF→BCNF)", read: "1NF: atomic columns, no multi-values. 2NF: 1NF + no partial dependency on composite key. 3NF: 2NF + no transitive dependency (non-key attr → non-key attr). BCNF: stricter 3NF. Goal: eliminate redundancy & update anomalies. Sometimes denormalize for read performance.",
    Q: "Show a schema in 2NF that violates 3NF and how you'd fix it." },
  { area: "DBMS", title: "Joins (Inner / Left / Right / Full)", read: "INNER: only matching rows. LEFT: all from left + matching from right (NULL if none). RIGHT: mirror of LEFT. FULL OUTER: all rows from both, NULLs where no match. CROSS = Cartesian product. Self-join: table joined with itself for hierarchical data.",
    Q: "Find users with no orders — write the query. Why is LEFT JOIN + WHERE IS NULL better than NOT IN?" },
  { area: "DBMS", title: "ACID Properties", read: "Atomicity — txn is all-or-nothing. Consistency — DB constraints preserved. Isolation — concurrent txns don't interfere. Durability — committed data survives crash. Implemented via WAL (write-ahead log), MVCC, locking.",
    Q: "Bank transfer — explain how each ACID property protects you when power goes off mid-transfer." },
  { area: "DBMS", title: "Index Types: B-Tree vs Hash", read: "B-Tree (default in most DBs) — sorted, supports range queries (>, <, BETWEEN), prefix matches, ORDER BY. Hash — O(1) for equality only, no ranges. Most DBs default to B-Tree. PostgreSQL also supports GIN (full-text), GiST (geometry).",
    Q: "Phone-book lookup by exact name vs by name range A→K — which index for each?" },
  { area: "DBMS", title: "Transactions & Isolation Levels", read: "Read Uncommitted (dirty reads), Read Committed (default in many DBs, no dirty reads), Repeatable Read (no non-repeatable reads, MySQL InnoDB default), Serializable (full isolation, slowest). Higher isolation = more locks = less concurrency.",
    Q: "What's a phantom read? Which isolation level prevents it?" },
  // CN
  { area: "CN", title: "OSI Model (7 Layers)", read: "Physical (cables/signals), Data Link (MAC, frames, switches), Network (IP, routing, routers), Transport (TCP/UDP, ports), Session (sessions/dialogs), Presentation (encryption/compression), Application (HTTP, SMTP, DNS). Mnemonic: Please Do Not Throw Sausage Pizza Away.",
    Q: "Where does TLS sit in the OSI model — and is that why HTTPS is described as 'HTTP + TLS'?" },
  { area: "CN", title: "TCP vs UDP", read: "TCP: connection-oriented, 3-way handshake, reliable, ordered, congestion control, flow control. Used for HTTP, SSH, email. UDP: connectionless, no guarantees, low overhead, fast. Used for DNS, video calls, gaming, DNS. Trade-off: reliability vs speed.",
    Q: "Why does video calling use UDP despite occasional dropped packets — and what would TCP do worse?" },
  { area: "CN", title: "TCP 3-Way Handshake", read: "Client sends SYN. Server replies SYN-ACK. Client sends ACK. Connection established. Termination: 4-way (FIN/ACK from each side). SYN flood = DDoS by half-open connections. SYN cookies mitigate.",
    Q: "Why does TCP need 3 messages but not 2? What does the third ACK actually prove?" },
  { area: "CN", title: "HTTP vs HTTPS", read: "HTTP: plaintext over TCP port 80, anyone in middle can read/modify. HTTPS: HTTP wrapped in TLS over port 443. TLS provides: encryption (AES), integrity (HMAC), authentication (certs from CAs). TLS handshake exchanges symmetric key via asymmetric crypto.",
    Q: "Why don't we use asymmetric encryption for the whole session — what does symmetric give us?" },
  { area: "CN", title: "DNS Resolution", read: "Browser checks: local cache → OS → resolver (ISP) → root nameservers (.) → TLD (.com) → authoritative (example.com). Returns A record (IP). Cached at multiple levels via TTL. CDN uses DNS or Anycast to route users to nearest edge.",
    Q: "You change your domain's IP. Why does the change take hours to propagate worldwide? What's TTL's role?" },
  // OOPS
  { area: "OOPS", title: "Four Pillars", read: "Encapsulation — bundle data + methods, hide internals (private fields, public getters). Abstraction — expose what, hide how (interfaces). Inheritance — child gets parent's traits, code reuse. Polymorphism — same interface, different behavior (overloading at compile-time, overriding at runtime).",
    Q: "Give a real-world analogy for each pillar (e.g. car → engine encapsulation)." },
  { area: "OOPS", title: "Inheritance Types", read: "Single (one parent), Multilevel (chain), Hierarchical (one parent, many children), Multiple (many parents — Java doesn't support classes for this, only interfaces — diamond problem). Composition often preferred over inheritance ('has-a' over 'is-a').",
    Q: "Diamond problem — explain it and how Java/Python solve it differently." },
  { area: "OOPS", title: "Polymorphism: Overload vs Override", read: "Overloading (compile-time/static) — same method name, different signatures, resolved at compile. Overriding (runtime/dynamic) — child redefines parent method, resolved at runtime via virtual table. Java method dispatch is dynamic by default; C++ needs `virtual` keyword.",
    Q: "Why can't you override a static method? What happens if you try (Java vs C++)?" },
  { area: "OOPS", title: "Abstraction vs Interface", read: "Abstract class — partial implementation, can have fields & constructors, single inheritance. Interface — pure contract, no implementation (Java 7), default methods (Java 8+), multiple inheritance allowed. Use abstract for shared base; interface for capability/contract.",
    Q: "When would you choose an abstract class over an interface in Java?" },
  { area: "OOPS", title: "SOLID Principles", read: "Single Responsibility — class does one thing. Open/Closed — open to extension, closed to modification. Liskov Substitution — subclass should work where parent works. Interface Segregation — many small interfaces > one fat. Dependency Inversion — depend on abstractions, not concretions.",
    Q: "Pick any one SOLID principle and give a code smell that violates it." },
];

const APTITUDE_PROBLEMS = [
  { area: "Quant", title: "Time, Speed & Distance", brief: "If a train 200m long crosses a pole in 10s, find its speed in km/hr.",
    hint: "Speed = Distance/Time. 200m/10s = 20m/s. To km/hr multiply by 18/5.",
    answer: "72 km/hr" },
  { area: "Quant", title: "Time & Work", brief: "A can do work in 10 days, B in 15. Together?",
    hint: "Per-day work: A=1/10, B=1/15. Combined = 1/10+1/15 = 5/30 = 1/6. So 6 days.",
    answer: "6 days" },
  { area: "Quant", title: "Profit & Loss", brief: "Item bought at ₹400. Sold at 25% profit. Find SP.",
    hint: "SP = CP × (1 + profit%/100) = 400 × 1.25 = 500.",
    answer: "₹500" },
  { area: "Quant", title: "Percentages", brief: "If A's salary > B's by 25%, by what % is B's less than A's?",
    hint: "Let B=100 → A=125. B is less than A by 25/125 = 20%.",
    answer: "20%" },
  { area: "Quant", title: "Ratios", brief: "Divide ₹6300 in ratio 3:5:7 among A, B, C.",
    hint: "Total parts = 15. Each part = 6300/15 = 420. So 1260 : 2100 : 2940.",
    answer: "1260, 2100, 2940" },
  { area: "Quant", title: "Probability", brief: "Two dice rolled. Probability sum = 7?",
    hint: "Total outcomes = 36. Sum 7 cases: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. P = 6/36 = 1/6.",
    answer: "1/6" },
  { area: "Quant", title: "Permutations", brief: "How many 4-digit numbers can be formed from 1-9 with no repetition?",
    hint: "9 × 8 × 7 × 6 = 3024.",
    answer: "3024" },
  { area: "Quant", title: "Combinations", brief: "Choose a committee of 3 from 8 people.",
    hint: "C(8,3) = 8!/(3!·5!) = 56.",
    answer: "56" },
  { area: "Logical", title: "Number Series", brief: "2, 6, 12, 20, 30, ?",
    hint: "Differences: 4,6,8,10,12. Next = 30+12 = 42. (Pattern: n(n+1).)",
    answer: "42" },
  { area: "Logical", title: "Coding-Decoding", brief: "If CAT = 24, BAT = 23, then RAT = ?",
    hint: "Sum positions: C(3)+A(1)+T(20)=24. R(18)+A(1)+T(20)=39.",
    answer: "39" },
  { area: "Logical", title: "Blood Relations", brief: "Pointing to a man, woman says 'His mother is the only daughter of my mother.' How is woman related to man?",
    hint: "Only daughter of woman's mother = woman herself. So she is the man's mother.",
    answer: "Mother" },
  { area: "Logical", title: "Direction Sense", brief: "X walks 5km East, 3km North, 5km West, 6km South. Distance from start?",
    hint: "Net: 0 East-West, 3 South. Distance = 3km.",
    answer: "3 km South" },
  { area: "Logical", title: "Syllogism", brief: "All cats are dogs. All dogs are birds. Conclusion?",
    hint: "Transitive: All cats are birds. Some birds are dogs (true). 'All birds are cats' is invalid.",
    answer: "All cats are birds" },
  { area: "Quant", title: "Average Problem", brief: "Average of 10 numbers is 25. If one is excluded, avg becomes 24. The excluded number?",
    hint: "Sum of 10 = 250. Sum of 9 = 9×24 = 216. Excluded = 250-216 = 34.",
    answer: "34" },
  { area: "Quant", title: "Simple Interest", brief: "₹5000 at 8% p.a. for 3 years. SI?",
    hint: "SI = P×R×T/100 = 5000×8×3/100 = 1200.",
    answer: "₹1200" },
  { area: "Quant", title: "Compound Interest", brief: "₹10000 at 10% p.a. compounded annually for 2 years.",
    hint: "A = P(1+R/100)^T = 10000×1.21 = 12100. CI = 2100.",
    answer: "CI = ₹2100, A = ₹12100" },
  { area: "Quant", title: "Mixture/Alligation", brief: "Mix two types of rice: ₹40/kg and ₹60/kg. To get a mixture costing ₹50/kg, what ratio?",
    hint: "Alligation: |60-50| : |50-40| = 10:10 = 1:1.",
    answer: "1:1" },
  { area: "Quant", title: "Pipes & Cisterns", brief: "Pipe A fills tank in 4hr, B empties in 6hr. Both open?",
    hint: "Net rate = 1/4 - 1/6 = 1/12. So 12 hours.",
    answer: "12 hours" },
  { area: "Quant", title: "Boats & Streams", brief: "Boat speed in still water 10 km/hr, stream 2. Time for 24km downstream?",
    hint: "Down = 10+2 = 12 km/hr. Time = 24/12 = 2 hr.",
    answer: "2 hours" },
  { area: "Logical", title: "Seating Arrangement", brief: "5 friends A,B,C,D,E in a row. C is between A & D. B is at end. E is next to D. Find B's neighbour.",
    hint: "Try arrangements. B-A-C-D-E or E-D-C-A-B. B's neighbor is A or D depending on direction.",
    answer: "A (left config) or D (right config)" },
  { area: "Verbal", title: "Synonym", brief: "Pick synonym of 'EPHEMERAL': permanent, fleeting, eternal, durable.",
    hint: "Ephemeral = lasting briefly.",
    answer: "Fleeting" },
  { area: "Verbal", title: "Antonym", brief: "Pick antonym of 'BENEVOLENT': kind, malicious, generous, gracious.",
    hint: "Benevolent = kind. Opposite = malicious.",
    answer: "Malicious" },
  { area: "Verbal", title: "Sentence Correction", brief: "'Each of the boys are present' — fix it.",
    hint: "'Each' is singular — needs 'is'.",
    answer: "Each of the boys IS present" },
  { area: "Quant", title: "Ages Problem", brief: "Father is 4× son. After 10 years, 2×. Current ages?",
    hint: "Let son=x, father=4x. After 10: (4x+10) = 2(x+10) → 4x+10=2x+20 → 2x=10 → x=5.",
    answer: "Son 5, Father 20" },
  { area: "Quant", title: "Number System", brief: "Find the unit digit of 7^123.",
    hint: "Powers of 7 cycle every 4: 7,9,3,1. 123 mod 4 = 3 → 3rd in cycle = 3.",
    answer: "3" },
];

const BEHAVIORAL_PROMPTS = [
  { title: "Tell me about yourself",
    prompt: "Prepare a 60-second pitch covering: (1) where you're from + degree, (2) one technical strength (project or skill), (3) one human strength (collaboration/curiosity), (4) why this role/company.",
    framework: "Past → Present → Future. Don't recite your resume — pick highlights that map to the JD." },
  { title: "Why this company?",
    prompt: "Pick a company you'd target. List 3 specific reasons (their tech, product, culture, mission) with evidence. Avoid 'good brand' — that's lazy and they know it.",
    framework: "Specific > Generic. Cite a blog post, product feature, or value you actually admire." },
  { title: "Strengths & Weaknesses",
    prompt: "Pick 1 strength relevant to the role + 1 real weakness with concrete steps you're taking to improve it.",
    framework: "Strength: STAR-style example. Weakness: real, not 'I'm a perfectionist.' Show self-awareness + action." },
  { title: "Walk me through your project",
    prompt: "Pick your strongest project. Cover: problem, your role, tech stack with reasons, one hard challenge + how you solved it, impact (numbers if possible).",
    framework: "Why-What-How-Impact. Interviewers will dig into 'why this tech' and 'what was hardest'. Prep both." },
  { title: "Conflict in a team — STAR",
    prompt: "Recall a real time you disagreed with a teammate. Frame as Situation, Task, Action (yours specifically), Result.",
    framework: "STAR. Show empathy, communication, and how you resolved without escalating. End with what you learned." },
  { title: "A failure & what you learned",
    prompt: "Pick a real failure (not 'I worked too hard'). Show ownership, lesson, and what you'd do differently.",
    framework: "Don't blame others. Don't pick a trivial one. The honesty + lesson is the point." },
  { title: "Where do you see yourself in 5 years?",
    prompt: "Be honest but aligned. Mention growing technically, taking on more responsibility, possibly mentoring. Avoid 'CEO' or 'starting my own'.",
    framework: "Growth trajectory at the company > grandiose plans elsewhere." },
  { title: "Why should we hire you?",
    prompt: "Match 2-3 of your concrete strengths to specific needs from the JD. End with energy/learning attitude.",
    framework: "Their need × Your evidence × Your hunger to learn." },
  { title: "Questions to ask the interviewer",
    prompt: "Prepare 4 — about: (1) team's biggest challenge, (2) success metrics in first 6 months, (3) interviewer's own journey, (4) tech/process they'd improve.",
    framework: "Avoid Googleable questions (like 'what does your company do'). Show you're already thinking about the role." },
  { title: "Leadership without authority",
    prompt: "Time you led without a title — group project, hackathon, club. STAR format.",
    framework: "Influence > authority. Show how you motivated peers to follow your idea." },
  { title: "Handling criticism",
    prompt: "A time someone critiqued your work harshly. How did you react in the moment? What did you do after?",
    framework: "Show maturity. Emotion in moment is OK; growth after is what matters." },
  { title: "Time you took initiative",
    prompt: "When did you do something nobody asked you to? STAR. Why did you spot the opportunity?",
    framework: "Show ownership mindset. Self-starter signal is gold." },
  { title: "Technical decision you regret",
    prompt: "A choice you'd reverse — wrong DB, wrong framework, premature optimization, etc. Why? What did you learn?",
    framework: "Show technical maturity. The bad choice + the lesson is the answer." },
  { title: "Working with a difficult teammate",
    prompt: "STAR-format response. Focus on your actions, not bashing them.",
    framework: "Empathy + adaptation. Different working styles ≠ enemies." },
  { title: "What does success mean to you?",
    prompt: "Personal answer beyond money/title. Tie to learning, impact, balance, etc.",
    framework: "Be authentic. Generic answers ('hard work pays off') are red flags." },
  { title: "Why software engineering?",
    prompt: "Origin story — what hooked you. Specific moment > generic 'I love computers.'",
    framework: "Vivid story builds trust. Then connect to what excites you now." },
  { title: "Salary negotiation prep",
    prompt: "Research market range (Glassdoor, Levels.fyi, Blind). Have a target & floor. If asked first, deflect: 'I'd love to discuss the role first; I'm sure we can align on numbers.'",
    framework: "Never say a number first if avoidable. Anchor with research, not feelings." },
  { title: "How do you stay updated?",
    prompt: "List your real sources: newsletters, podcasts, blogs, GitHub follows, books. Pick 1 thing you learned recently and can talk about.",
    framework: "Specifics > 'I read articles'. They're checking if you're genuinely curious." },
  { title: "Disagree with manager",
    prompt: "Time you respectfully disagreed with a senior. How did you frame it? Outcome?",
    framework: "Disagree-and-commit framing — Amazon's principle. Voice the concern, accept the call, execute." },
  { title: "Biggest accomplishment",
    prompt: "Pick something measurable. Why was it hard? What did you specifically contribute?",
    framework: "Specifically YOUR action, not the team's. Numbers beat adjectives." },
  { title: "Working under pressure / deadline",
    prompt: "STAR — a high-stakes deadline you delivered on. What did you de-prioritize? What did you delegate?",
    framework: "Show calm decision-making, not heroism. Trade-offs > 'I worked 80 hours.'" },
  { title: "Why are you leaving your current role / college?",
    prompt: "Frame around growth, not running away. Don't bash old employer/professors.",
    framework: "Forward-looking. 'I want X opportunity' > 'I hate Y.'" },
  { title: "If you could change one thing about your last project...",
    prompt: "Show retrospective thinking. Architecture, scope, communication — pick one and explain.",
    framework: "Self-critique = senior-engineer signal. Be specific." },
  { title: "Mock — full behavioral round",
    prompt: "Today, do a 20-min self-recorded mock answering 4 random questions from above. Watch the playback. Note: filler words, pace, posture, eye contact.",
    framework: "Recording yourself is the single highest-ROI prep technique. Embarrassing the first time. Game-changing by the third." },
  { title: "Resume walkthrough drill",
    prompt: "Take your resume — for every bullet, prep a 30-sec STAR answer. Interviewers will go line-by-line.",
    framework: "If a bullet doesn't have a story, replace it. Generic bullets get generic questions." },
];

/* =========================================================
   Helpers
   ========================================================= */

const CAT = {
  dsa: { key: "dsa", name: "DSA", color: "#a78bfa", bg: "#1e1b3a",
    border: "#7c3aed", icon: Code2, desc: "Data Structures & Algorithms" },
  sd: { key: "sd", name: "System Design", color: "#22d3ee", bg: "#0e2a33",
    border: "#0891b2", icon: Network, desc: "Architecture & scale" },
  cs: { key: "cs", name: "Core CS", color: "#f472b6", bg: "#34132a",
    border: "#db2777", icon: Cpu, desc: "OS · DBMS · CN · OOPS" },
  apt: { key: "apt", name: "Aptitude", color: "#fbbf24", bg: "#332811",
    border: "#d97706", icon: Calculator, desc: "Quant · Logical · Verbal" },
  hr: { key: "hr", name: "Behavioral", color: "#34d399", bg: "#0f2c25",
    border: "#059669", icon: MessageSquare, desc: "HR & soft skills" },
};
const CAT_ORDER = ["dsa", "sd", "cs", "apt", "hr"];

/* =========================================================
   PIXEL RPG PALETTE — committed aesthetic, no toggle
   NES/SNES inspired: parchment, mossy green, blood red, gold
   Shape matches old `theme` object so components don't need rewrite.
   ========================================================= */
const PX_COLORS = {
  bg: "#1a1410",
  parchment: "#e8d8a8",
  parchmentLight: "#f4e8c0",
  parchmentDark: "#c4b078",
  ink: "#2d1b0e",
  inkSoft: "#5c4530",
  moss: "#4a6b3a",
  mossLight: "#6b8e4e",
  mossDark: "#2e4525",
  stone: "#787064",
  stoneLight: "#9c9484",
  blood: "#a83232",
  bloodDark: "#6e1f1f",
  gold: "#d4a04a",
  goldDark: "#a87a2c",
  shadow: "#0d0905",
};

const PX = {
  ...PX_COLORS,
  // Theme-API compatibility
  bg: `repeating-linear-gradient(0deg, ${PX_COLORS.bg} 0, ${PX_COLORS.bg} 2px, #221a14 2px, #221a14 4px)`,
  surface: PX_COLORS.parchment,
  surfaceAlt: PX_COLORS.parchmentLight,
  border: PX_COLORS.ink,
  text: PX_COLORS.ink,
  textSoft: PX_COLORS.inkSoft,
  accent: PX_COLORS.blood,
  accent2: PX_COLORS.moss,
  star: PX_COLORS.gold,
  font: '"VT323", "Press Start 2P", monospace',
  fontHead: '"Press Start 2P", "VT323", monospace',
  emoji: "⚔",
  cat: {
    dsa: "#7a4ba8",
    sd:  "#3a6a8e",
    cs:  "#a8553d",
    apt: "#a87a2c",
    hr:  "#5a7a3a",
  },
};

/* Pixel-art SVG sprites — 16x16 grid, hand-coded paths */
const ItemSprite = React.memo(function ItemSprite({ kind = 0, size = 36, color = PX.ink }) {
  const items = [
    `M7 1h2v1h1v1h1v8h-1v1h-1v1h-1v1H8v-1H7v-1H6v-1H5V3h1V2h1V1z M7 3v6h2V3H7z`,
    `M2 4h12v1h-1v6h1v1H2v-1h1V5H2V4z M4 5v6h8V5H4z M5 7h6v1H5V7z M5 9h4v1H5V9z`,
    `M6 2h4v1h1v1h1v2h-1v1h-1v6h-1v1H7v-1H6v-6H5V6H4V4h1V3h1V2z M7 4v2h2V4H7z`,
    `M3 2h10v8h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V2z M5 4v5h6V4H5z M7 5v3h2V5H7z`,
    `M6 1h4v3h1v2h1v7h-1v1h-1v1H6v-1H5v-1H4V6h1V4h1V1z M6 7v5h4V7H6z`,
    `M2 3h5v8h6v3H2V3z M3 4v6h3V4H3z M7 7v3h5V7H7z`,
    `M3 6h4v1h1v2H7v1H3V6z M3 7v2h3V7H3z M8 7h6v1H8V7z M11 9h1v1h-1V9z M13 9h1v1h-1V9z`,
    `M7 1h2v1h1v2H9v1h1v1H6V5h1V4H6V2h1V1z M7 7h2v8H7V7z`,
    `M3 2h10v12H3V2z M4 3v10h8V3H4z M6 4v8h1V4H6z M9 5h2v1H9V5z`,
    `M3 8h10v3H3V8z M3 11h10v3H3v-3z M4 5h8v3H4V5z M5 6v1h6V6H5z`,
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", display: "block" }}
      shapeRendering="crispEdges">
      <path d={items[kind % items.length]} fill={color} />
    </svg>
  );
});

const CatSprite = React.memo(function CatSprite({ cat, size = 24 }) {
  const sprites = {
    dsa: { color: PX.cat.dsa, path: "M7 1h2v1h1v1h1v8h-1v1h-1v1h-1v1H8v-1H7v-1H6v-1H5V3h1V2h1V1z M7 3v6h2V3H7z" },
    sd:  { color: PX.cat.sd,  path: "M3 2h10v8h-1v2h-1v1H9v1H7v-1H5v-1H4v-2H3V2z M5 4v5h6V4H5z M7 5v3h2V5H7z" },
    cs:  { color: PX.cat.cs,  path: "M3 2h10v12H3V2z M4 3v10h8V3H4z M6 4v8h1V4H6z M9 5h2v1H9V5z" },
    apt: { color: PX.cat.apt, path: "M3 8h10v3H3V8z M4 5h8v3H4V5z M5 6v1h6V6H5z M3 11h10v3H3v-3z" },
    hr:  { color: PX.cat.hr,  path: "M2 4h12v1h-1v6h1v1H2v-1h1V5H2V4z M4 5v6h8V5H4z M5 7h6v1H5V7z" },
  };
  const { color, path } = sprites[cat] || sprites.dsa;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated", display: "block" }}
      shapeRendering="crispEdges">
      <path d={path} fill={color} />
    </svg>
  );
});

/* useTheme stub returns PX so existing components keep working */
const useTheme = () => PX;



const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const daysBetween = (a, b) => {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.floor(ms / 86400000);
};

const dateForDay = (startISO, dayN) => {
  const d = new Date(startISO);
  d.setDate(d.getDate() + (dayN - 1));
  const opts = { weekday: "short", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", opts);
};

const computeStreak = (days) => {
  const earned = Object.entries(days || {})
    .filter(([_, v]) => v && Object.values(v.stars || {}).some(Boolean))
    .map(([k]) => parseInt(k))
    .sort((a, b) => b - a);
  if (!earned.length) return 0;
  let streak = 1;
  for (let i = 1; i < earned.length; i++) {
    if (earned[i - 1] - earned[i] === 1) streak++;
    else break;
  }
  return streak;
};

const totalStars = (days) =>
  Object.values(days || {}).reduce(
    (sum, d) => sum + Object.values(d.stars || {}).filter(Boolean).length,
    0
  );

/* =========================================================
   COMPONENT
   ========================================================= */

export default function PlacementQuest() {
  const [loaded, setLoaded] = useState(false);
  const [meta, setMeta] = useState({ startDate: todayISO() });
  const [days, setDays] = useState({}); // { 1: { stars: {dsa:1,...}, completedAt }, ... }
  const [selectedDay, setSelectedDay] = useState(null);
  const [view, setView] = useState("map"); // map | today | stats — map is home
  const [openCategory, setOpenCategory] = useState(null);
  const [celebrate, setCelebrate] = useState(false);

  // Load from window.storage
  useEffect(() => {
    (async () => {
      let metaData = { startDate: todayISO() };
      let daysData = {};
      try {
        const m = await window.storage.get("pq:meta");
        if (m?.value) metaData = JSON.parse(m.value);
      } catch { /* first run */ }
      try {
        const d = await window.storage.get("pq:days");
        if (d?.value) daysData = JSON.parse(d.value);
      } catch { /* first run */ }
      setMeta(metaData);
      setDays(daysData);
      try { await window.storage.set("pq:meta", JSON.stringify(metaData)); } catch {}
      setLoaded(true);
    })();
  }, []);

  const persistDays = async (newDays) => {
    setDays(newDays);
    try { await window.storage.set("pq:days", JSON.stringify(newDays)); } catch {}
  };

  const currentDay = Math.max(1, daysBetween(meta.startDate, todayISO()) + 1);
  const viewingDay = selectedDay ?? currentDay;
  const isFuture = viewingDay > currentDay;
  const dayData = days[viewingDay] || { stars: {} };

  const toggleStar = async (catKey) => {
    if (isFuture) return;
    const newDays = { ...days };
    const d = { stars: { ...(newDays[viewingDay]?.stars || {}) } };
    const wasOn = !!d.stars[catKey];
    d.stars[catKey] = !wasOn;
    d.completedAt = todayISO();
    newDays[viewingDay] = d;
    await persistDays(newDays);
    // celebrate on full day
    const allFive = CAT_ORDER.every((k) => d.stars[k]);
    if (allFive && !wasOn) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
    }
  };

  const resetAll = async () => {
    if (!confirm("Reset ALL progress? This wipes streaks, stars and history. Cannot be undone.")) return;
    await window.storage.set("pq:meta", JSON.stringify({ startDate: todayISO() }));
    await window.storage.set("pq:days", JSON.stringify({}));
    setMeta({ startDate: todayISO() });
    setDays({});
    setSelectedDay(null);
    setView("today");
  };

  const streak = computeStreak(days);
  const stars = totalStars(days);
  const level = Math.floor(stars / 5) + 1;
  const xpInLevel = stars % 5;

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PX.bg }}>
        <div style={{ color: PX.gold, fontFamily: PX.fontHead, fontSize: 14 }}>
          ⚔ LOADING QUEST…
        </div>
      </div>
    );
  }

  const theme = PX;

  return (
    <div className="min-h-screen w-full relative" style={{
      background: PX.bg,
      color: PX.text,
      fontFamily: PX.font,
      imageRendering: "pixelated",
    }}>
      <FontImports />
      <PixelBgPattern />

      {celebrate && <Confetti />}

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* HEADER */}
        <Header currentDay={currentDay} streak={streak} stars={stars} level={level}
          xpInLevel={xpInLevel} onReset={resetAll} />

        {/* TABS — pixel UI */}
        <div className="flex gap-0 mb-6">
          {[
            { k: "map", label: "WORLD MAP" },
            { k: "today", label: "QUESTS" },
            { k: "stats", label: "STATS" },
          ].map(({ k, label }) => {
            const active = view === k;
            return (
              <button key={k} onClick={() => { setView(k); setSelectedDay(null); setOpenCategory(null); }}
                className="px-4 py-2 transition-all flex-1 sm:flex-none anim-shake-hover"
                style={{
                  background: active ? PX.parchment : PX.parchmentDark,
                  color: active ? PX.ink : PX.inkSoft,
                  fontFamily: PX.fontHead,
                  fontSize: 10,
                  letterSpacing: 1,
                  border: `3px solid ${PX.ink}`,
                  borderRight: "none",
                  boxShadow: active ? `inset 0 -3px 0 ${PX.parchmentDark}` : `inset 0 -3px 0 ${PX.ink}`,
                  position: "relative",
                  zIndex: active ? 2 : 1,
                  cursor: "pointer",
                }}>
                {active && "▸ "}{label}
              </button>
            );
          })}
          <div style={{ flex: 1, borderBottom: `3px solid ${PX.ink}`, alignSelf: "stretch" }} />
        </div>

        {view === "today" && (
          <TodayView day={viewingDay} currentDay={currentDay} startDate={meta.startDate}
            dayData={dayData} isFuture={isFuture}
            openCategory={openCategory} setOpenCategory={setOpenCategory}
            toggleStar={toggleStar} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        )}

        {view === "map" && (
          <MapView currentDay={currentDay} days={days} startDate={meta.startDate}
            onPickDay={(d) => { setSelectedDay(d); setView("today"); setOpenCategory(null); }} />
        )}

        {view === "stats" && (
          <StatsView days={days} streak={streak} stars={stars} level={level}
            startDate={meta.startDate} currentDay={currentDay} />
        )}

        <Footer />
      </div>
    </div>
  );
}

/* =========================================================
   Pixel Background — dark earth + repeating dotted noise
   ========================================================= */
function PixelBgPattern() {
  return (
    <>
      {/* subtle diagonal noise */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: `radial-gradient(${PX.shadow} 1px, transparent 1px)`,
        backgroundSize: "4px 4px",
      }} />
      {/* corner sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[
          { l: "8%", t: "12%", d: 0 },
          { l: "92%", t: "20%", d: 1.4 },
          { l: "5%", t: "70%", d: 0.7 },
          { l: "94%", t: "85%", d: 2.1 },
          { l: "85%", t: "55%", d: 0.3 },
          { l: "12%", t: "45%", d: 1.7 },
        ].map((s, i) => (
          <div key={i} className="absolute anim-twinkle" style={{
            left: s.l, top: s.t,
            color: PX.gold, fontSize: 10,
            fontFamily: PX.fontHead,
            animationDelay: `${s.d}s`,
            opacity: 0.5,
          }}>+</div>
        ))}
      </div>
    </>
  );
}


/* =========================================================
   FontImports
   ========================================================= */
function FontImports() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Silkscreen:wght@400;700&display=swap');

      @keyframes star-pop { 0% { transform: scale(0.2) rotate(-90deg); opacity: 0; } 60% { transform: scale(1.3) rotate(10deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
      @keyframes float-up { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
      @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      @keyframes pulse-ring { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
      @keyframes pixel-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      @keyframes pixel-bob-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
      @keyframes step-bounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.04); } }
      @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      @keyframes blink-slow { 0%, 60% { opacity: 1; } 70%, 100% { opacity: 0.2; } }
      @keyframes shake-quick { 0%, 100% { transform: translate(0,0); } 20% { transform: translate(-2px, 1px); } 40% { transform: translate(2px, -1px); } 60% { transform: translate(-2px, -1px); } 80% { transform: translate(2px, 1px); } }
      @keyframes squash-in { 0% { transform: scale(0.6, 1.2); } 50% { transform: scale(1.1, 0.9); } 100% { transform: scale(1, 1); } }
      @keyframes flag-wave { 0%, 100% { transform: skewY(0deg); } 50% { transform: skewY(-2deg); } }
      @keyframes slash {
        0% { transform: translate(-30px, -30px) scale(0.3) rotate(-45deg); opacity: 0; }
        40% { opacity: 1; }
        100% { transform: translate(30px, 30px) scale(1.5) rotate(-45deg); opacity: 0; }
      }
      @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }

      .anim-star { animation: star-pop 0.4s steps(8); }
      .anim-up { animation: float-up 0.2s steps(4); }
      .anim-bob { animation: pixel-bob 1.6s steps(2) infinite; }
      .anim-bob-alt { animation: pixel-bob 1.6s steps(2) infinite; animation-delay: 0.8s; }
      .anim-bob-fast { animation: pixel-bob-fast 0.8s steps(2) infinite; }
      .anim-step-bounce { animation: step-bounce 0.6s steps(3); }
      .anim-blink { animation: blink 0.9s steps(2) infinite; }
      .anim-blink-slow { animation: blink-slow 2s steps(2) infinite; }
      .anim-shake-hover:hover { animation: shake-quick 0.25s steps(5); }
      .anim-squash:active { animation: squash-in 0.18s steps(3); }
      .anim-flag-wave { animation: flag-wave 1.4s steps(2) infinite; transform-origin: left center; }
      .anim-slash { animation: slash 0.4s ease-out forwards; }
      .anim-twinkle { animation: twinkle 1.4s steps(3) infinite; }

      /* Force pixel rendering across SVGs */
      svg { image-rendering: pixelated; image-rendering: crisp-edges; }

      /* Pixel scrollbar */
      .scroll-pretty::-webkit-scrollbar { width: 8px; }
      .scroll-pretty::-webkit-scrollbar-track { background: #2d1b0e; }
      .scroll-pretty::-webkit-scrollbar-thumb { background: #d4a04a; border: 2px solid #2d1b0e; }
    `}</style>
  );
}

/* =========================================================
   Header
   ========================================================= */
/* =========================================================
   PIXEL UI BUILDING BLOCKS
   ========================================================= */
function PixelPanel({ children, color = PX.parchment, className = "", style = {}, depth = 4 }) {
  return (
    <div className={className} style={{
      background: color,
      border: `3px solid ${PX.ink}`,
      boxShadow: `${depth}px ${depth}px 0 ${PX.ink}`,
      position: "relative",
      ...style,
    }}>
      {children}
    </div>
  );
}

function PixelButton({ children, onClick, color = PX.parchmentLight, textColor = PX.ink, disabled = false, style = {}, className = "" }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`anim-shake-hover anim-squash ${className}`}
      style={{
        background: color,
        color: textColor,
        border: `3px solid ${PX.ink}`,
        boxShadow: `3px 3px 0 ${PX.ink}`,
        padding: "8px 14px",
        fontFamily: PX.fontHead,
        fontSize: 10,
        letterSpacing: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "transform 80ms steps(2)",
        ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translate(2px, 2px)")}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = "translate(0, 0)")}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = "translate(0, 0)")}>
      {children}
    </button>
  );
}

function Header({ currentDay, streak, stars, level, xpInLevel, onReset }) {
  return (
    <div className="mb-6">
      <PixelPanel color={PX.parchment} className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="anim-bob"><CatSprite cat="dsa" size={18} /></div>
              <span style={{ fontFamily: PX.fontHead, fontSize: 8, letterSpacing: 1, color: PX.inkSoft }}>
                ⚔ PLACEMENT · QUEST ⚔
              </span>
            </div>
            <h1 style={{ fontFamily: PX.fontHead, fontSize: 18, color: PX.ink, lineHeight: 1.4 }}>
              DAY {String(currentDay).padStart(2, "0")} · LV.{level}
            </h1>
            <div style={{ fontFamily: PX.font, fontSize: 16, color: PX.inkSoft, marginTop: 4 }}>
              Defeat 5 quests today. Earn 5 stars.
            </div>
            {/* XP bar */}
            <div className="mt-3 flex items-center gap-2">
              <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.inkSoft }}>EXP</span>
              <div style={{
                width: 140, height: 12,
                background: PX.parchmentDark,
                border: `2px solid ${PX.ink}`,
                position: "relative",
              }}>
                <div style={{
                  width: `${(xpInLevel / 5) * 100}%`,
                  height: "100%",
                  background: PX.gold,
                  boxShadow: `inset 0 -3px 0 ${PX.goldDark}`,
                  transition: "width 200ms steps(8)",
                }} />
              </div>
              <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.ink }}>
                {xpInLevel}/5
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-2">
              <PixelStatBadge icon="🔥" value={streak} label="STK" />
              <PixelStatBadge icon="★" value={stars} label="★" iconColor={PX.gold} />
            </div>
            <PixelButton onClick={onReset} color={PX.parchmentDark} textColor={PX.bloodDark}
              style={{ padding: "6px 10px", fontSize: 8 }}>
              ↺ RESET
            </PixelButton>
          </div>
        </div>
      </PixelPanel>
    </div>
  );
}

function PixelStatBadge({ icon, value, label, iconColor }) {
  return (
    <div style={{
      background: PX.parchmentDark,
      border: `2px solid ${PX.ink}`,
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      gap: 6,
      boxShadow: `2px 2px 0 ${PX.ink}`,
    }}>
      <span style={{
        fontFamily: PX.fontHead, fontSize: 12,
        color: iconColor || PX.bloodDark,
      }}>{icon}</span>
      <span style={{ fontFamily: PX.fontHead, fontSize: 10, color: PX.ink }}>
        {value}
      </span>
      <span style={{ fontFamily: PX.fontHead, fontSize: 7, color: PX.inkSoft }}>
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   TodayView
   ========================================================= */
function TodayView({ day, currentDay, startDate, dayData, isFuture, openCategory, setOpenCategory, toggleStar, selectedDay, setSelectedDay }) {
  const starsToday = Object.values(dayData.stars || {}).filter(Boolean).length;
  const dateLabel = dateForDay(startDate, day);
  const isToday = day === currentDay;

  return (
    <div className="anim-up">
      {/* Day banner — JRPG dialog box */}
      <PixelPanel color={PX.parchment} className="p-4 sm:p-5 mb-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {!isToday && (
              <PixelButton onClick={() => setSelectedDay(currentDay)}
                color={PX.parchmentDark} textColor={PX.ink}
                style={{ padding: "4px 8px", fontSize: 8 }}>
                ◂ BACK
              </PixelButton>
            )}
            <div className="anim-bob-fast">
              <ItemSprite kind={(day - 1) % 10} size={40} color={PX.ink} />
            </div>
            <div>
              <div style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.inkSoft, letterSpacing: 1 }}>
                {isFuture ? "▸ LOCKED" : isToday ? "▸ TODAY" : "▸ PAST"} · {dateLabel}
              </div>
              <div style={{ fontFamily: PX.fontHead, fontSize: 14, color: PX.ink, marginTop: 4 }}>
                DAY {String(day).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Star track */}
          <div className="flex items-center gap-1.5">
            {CAT_ORDER.map((k) => (
              <div key={k} className={dayData.stars?.[k] ? "anim-star" : ""}>
                <PixelStar filled={!!dayData.stars?.[k]} size={14} />
              </div>
            ))}
            <div style={{ fontFamily: PX.fontHead, fontSize: 10, color: PX.ink, marginLeft: 6 }}>
              {starsToday}/5
            </div>
          </div>
        </div>

        {isFuture && (
          <div className="mt-3 flex items-center gap-2"
            style={{ fontFamily: PX.font, fontSize: 14, color: PX.bloodDark }}>
            ⚠ Future days locked. Time travel forbidden.
          </div>
        )}
      </PixelPanel>

      {/* Category cards */}
      <div className="space-y-3">
        {CAT_ORDER.map((catKey) => (
          <CategoryCard key={catKey}
            cat={CAT[catKey]}
            day={day}
            earned={!!dayData.stars?.[catKey]}
            isOpen={openCategory === catKey}
            onToggleOpen={() => setOpenCategory(openCategory === catKey ? null : catKey)}
            onToggleStar={() => toggleStar(catKey)}
            isFuture={isFuture}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ cat, day, earned, isOpen, onToggleOpen, onToggleStar, isFuture }) {
  const catColor = PX.cat[cat.key];

  return (
    <PixelPanel color={earned ? PX.parchmentLight : PX.parchment}
      style={{ overflow: "hidden", borderColor: earned ? catColor : PX.ink }}>
      {/* Header strip */}
      <button onClick={onToggleOpen}
        className="w-full flex items-center gap-3 sm:gap-4 text-left"
        style={{
          background: "transparent",
          padding: "12px 16px",
          border: "none",
          cursor: "pointer",
          fontFamily: PX.font,
        }}>
        <div style={{
          width: 44, height: 44,
          background: catColor,
          border: `3px solid ${PX.ink}`,
          boxShadow: `inset 0 -3px 0 ${PX.shadow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <CatSprite cat={cat.key} size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div style={{ fontFamily: PX.fontHead, fontSize: 11, color: PX.ink, letterSpacing: 1 }}>
              {cat.name.toUpperCase()}
            </div>
            {earned && (
              <span style={{
                fontFamily: PX.fontHead, fontSize: 7, letterSpacing: 1,
                background: PX.gold,
                color: PX.ink,
                padding: "2px 5px",
                border: `2px solid ${PX.ink}`,
              }}>★ DONE</span>
            )}
          </div>
          <div style={{ fontFamily: PX.font, fontSize: 14, color: PX.inkSoft, marginTop: 2 }}>
            {cat.desc}
          </div>
        </div>
        <PixelStar filled={earned} size={14} />
        <span style={{ fontFamily: PX.fontHead, fontSize: 10, color: PX.inkSoft }}>
          {isOpen ? "▾" : "▸"}
        </span>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="anim-up" style={{
          padding: "16px",
          borderTop: `3px dashed ${PX.parchmentDark}`,
          background: PX.parchmentLight,
        }}>
          <CategoryContent catKey={cat.key} day={day} earned={earned} onAutoClaim={onToggleStar} />
          {!isFuture && (
            <button onClick={onToggleStar}
              className="anim-shake-hover anim-squash"
              style={{
                marginTop: 16,
                width: "100%",
                padding: "10px 14px",
                background: earned ? PX.parchmentDark : catColor,
                color: earned ? PX.inkSoft : PX.parchmentLight,
                border: `3px solid ${PX.ink}`,
                boxShadow: `3px 3px 0 ${PX.ink}`,
                fontFamily: PX.fontHead,
                fontSize: 10,
                letterSpacing: 1,
                cursor: "pointer",
                transition: "transform 80ms steps(2)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}>
              {earned ? "✕ UNMARK STAR" : "✓ CLAIM STAR"}
            </button>
          )}
        </div>
      )}
    </PixelPanel>
  );
}

/* =========================================================
   Category-specific content
   ========================================================= */
/* =========================================================
   CodeRunner — multi-language code execution + verification
   - JavaScript runs locally in browser (instant, no setup)
   - Python / C++ / Java run on YOUR machine via a tiny Vite
     dev-server middleware (see vite.config.js). Uses the
     g++/python/javac you already have installed. No API keys.
   - Tests use stdin → stdout protocol (HackerRank-style)
   ========================================================= */
const LANGUAGES = [
  { id: "js",   label: "JS",     inBrowser: true },
  { id: "py",   label: "Python" },
  { id: "cpp",  label: "C++" },
  { id: "java", label: "Java" },
];

async function runViaLocalServer(langId, code, stdin) {
  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: langId, code, stdin: stdin || "" }),
    });
    if (res.status === 404) return { error: "LOCAL_RUNNER_MISSING" };
    if (!res.ok) return { error: `Local runner returned ${res.status}` };
    return await res.json();
  } catch (e) {
    return { error: "LOCAL_RUNNER_MISSING" };
  }
}

function runJsLocal(userCode, stdin) {
  try {
    const wrapper = `
      var stdin = ${JSON.stringify(stdin || "")};
      var __out = [];
      var console = {
        log: function() {
          var parts = [];
          for (var i = 0; i < arguments.length; i++) {
            var a = arguments[i];
            parts.push(typeof a === 'object' ? JSON.stringify(a) : String(a));
          }
          __out.push(parts.join(' '));
        }
      };
      ${userCode}
      return __out.join('\\n');
    `;
    const fn = new Function(wrapper);
    const stdout = fn();
    return { stdout };
  } catch (e) {
    return { stderr: String(e.message || e) };
  }
}

const normalizeOut = (s) => String(s ?? "").trim().replace(/\s+/g, " ");

function CodeRunner({ problem, onAllPass, alreadyEarned }) {
  const [lang, setLang] = useState("js");
  const [codes, setCodes] = useState(() => ({ ...problem.starters }));
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [missingRunner, setMissingRunner] = useState(false);
  const taRef = useRef(null);

  useEffect(() => {
    setCodes({ ...problem.starters });
    setResults(null);
    setMissingRunner(false);
  }, [problem]);

  const code = codes[lang] ?? problem.starters[lang] ?? "";
  const setCode = (c) => setCodes(prev => ({ ...prev, [lang]: c }));
  const langDef = LANGUAGES.find(l => l.id === lang);

  const allPassed = results && results.length === problem.tests.length && results.every(r => r.pass);
  const justClaimed = useRef(false);
  useEffect(() => {
    if (allPassed && !alreadyEarned && !justClaimed.current) {
      justClaimed.current = true;
      onAllPass?.();
    }
    if (!allPassed) justClaimed.current = false;
  }, [allPassed, alreadyEarned, onAllPass]);

  const run = async () => {
    setRunning(true);
    setResults([]);
    setMissingRunner(false);
    const out = [];
    for (let i = 0; i < problem.tests.length; i++) {
      const t = problem.tests[i];
      const start = performance.now();
      const res = langDef.inBrowser
        ? runJsLocal(code, t.stdin)
        : await runViaLocalServer(lang, code, t.stdin);
      const elapsed = Math.round(performance.now() - start);

      if (res.error === "LOCAL_RUNNER_MISSING") {
        setRunning(false);
        setMissingRunner(true);
        return;
      }

      if (res.error) {
        out.push({ i, pass: false, error: res.error, stdin: t.stdin, elapsed });
      } else if (res.stderr && !res.stdout?.trim()) {
        out.push({ i, pass: false, error: "RUNTIME: " + res.stderr.slice(0, 240), stdin: t.stdin, elapsed });
      } else {
        const got = normalizeOut(res.stdout);
        const exp = normalizeOut(t.expected);
        const pass = got === exp;
        out.push({
          i, pass,
          got: (res.stdout || "").trim(),
          expected: t.expected,
          stdin: t.stdin,
          elapsed,
          stderr: res.stderr,
        });
      }
      setResults([...out]);
    }
    setRunning(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        if (taRef.current) {
          taRef.current.selectionStart = taRef.current.selectionEnd = start + 2;
        }
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.bloodDark, letterSpacing: 1 }}>
          ▸ LANG
        </span>
        {LANGUAGES.map(L => {
          const active = lang === L.id;
          return (
            <button key={L.id} onClick={() => { setLang(L.id); setMissingRunner(false); }}
              className="anim-shake-hover anim-squash"
              style={{
                background: active ? PX.cat.dsa : PX.parchmentDark,
                color: active ? PX.parchmentLight : PX.inkSoft,
                border: `3px solid ${PX.ink}`,
                boxShadow: active ? `inset 0 -3px 0 ${PX.shadow}` : `2px 2px 0 ${PX.ink}`,
                padding: "5px 10px",
                fontFamily: PX.fontHead,
                fontSize: 8,
                letterSpacing: 1,
                cursor: "pointer",
              }}>
              {L.label}
            </button>
          );
        })}
        <span style={{
          fontFamily: PX.fontHead, fontSize: 7,
          color: PX.inkSoft, marginLeft: "auto", letterSpacing: 1,
        }}>
          {langDef.inBrowser ? "▸ runs in browser" : "▸ runs on your machine"}
        </span>
      </div>

      {missingRunner && (
        <div className="anim-up" style={{
          background: PX.parchmentDark,
          border: `3px solid ${PX.bloodDark}`,
          boxShadow: `3px 3px 0 ${PX.ink}`,
          padding: 14,
        }}>
          <div style={{ fontFamily: PX.fontHead, fontSize: 10, color: PX.bloodDark, letterSpacing: 1, marginBottom: 8 }}>
            ⚠ LOCAL CODE-RUNNER NOT INSTALLED
          </div>
          <div style={{ fontFamily: PX.font, fontSize: 15, color: PX.ink, lineHeight: 1.5 }}>
            To run C++/Python/Java, your <code>vite.config.js</code> needs the codeRunner plugin (a tiny middleware that compiles &amp; runs code using your installed g++/python/javac).
            <br/><br/>
            <strong>1.</strong> Replace your project's <code>vite.config.js</code> with the one I'll provide.
            &nbsp;<strong>2.</strong> Stop the dev server (Ctrl+C) and run <code>npm run dev</code> again.
            &nbsp;<strong>3.</strong> Click RUN TESTS again.
            <br/><br/>
            <em>No API keys. No internet. Runs entirely on your machine using compilers you already have.</em>
          </div>
        </div>
      )}

      <textarea
        ref={taRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        style={{
          width: "100%",
          minHeight: 240,
          background: PX.ink,
          color: "#a8e84a",
          fontFamily: '"VT323", "Courier New", monospace',
          fontSize: 17,
          lineHeight: 1.45,
          padding: 14,
          border: `3px solid ${PX.ink}`,
          boxShadow: `3px 3px 0 ${PX.shadow}, inset 0 0 0 2px #1a3a18`,
          resize: "vertical",
          outline: "none",
          tabSize: 2,
          caretColor: PX.gold,
        }}
      />

      <div className="flex gap-2 items-center flex-wrap">
        <PixelButton onClick={run} disabled={running}
          color={running ? PX.parchmentDark : PX.moss}
          textColor={PX.parchmentLight}>
          {running ? "⌛ TESTING..." : "▶ RUN TESTS"}
        </PixelButton>
        <PixelButton onClick={() => { setCode(problem.starters[lang]); setResults(null); }}
          color={PX.parchmentDark} textColor={PX.ink}>
          ↺ RESET CODE
        </PixelButton>
        {results && results.length > 0 && (
          <span style={{
            fontFamily: PX.fontHead, fontSize: 10,
            color: allPassed ? PX.moss : PX.bloodDark,
            marginLeft: "auto",
            letterSpacing: 1,
          }}>
            {results.filter(r => r.pass).length}/{problem.tests.length} PASS
          </span>
        )}
      </div>

      {results && results.length > 0 && (
        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.i} className="anim-up" style={{
              background: r.pass ? "#1a3018" : "#2e1414",
              border: `3px solid ${r.pass ? PX.moss : PX.bloodDark}`,
              boxShadow: `3px 3px 0 ${PX.shadow}`,
              padding: "8px 12px",
              fontFamily: '"VT323", "Courier New", monospace',
              fontSize: 15,
              lineHeight: 1.4,
              color: r.pass ? "#a8e84a" : "#ff9090",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              <div style={{ fontFamily: PX.fontHead, fontSize: 8, marginBottom: 6, letterSpacing: 1 }}>
                {r.pass ? "✓" : "✗"} TEST {r.i + 1}{r.elapsed != null && `  ·  ${r.elapsed}ms`}
              </div>
              {r.error ? (
                <div style={{ color: "#ff8080" }}>{r.error}</div>
              ) : (
                <div className="space-y-0.5">
                  <div><span style={{ opacity: 0.7 }}>stdin:</span> {JSON.stringify(r.stdin)}</div>
                  <div><span style={{ opacity: 0.7 }}>exp  :</span> {JSON.stringify(r.expected)}</div>
                  {!r.pass && <div><span style={{ opacity: 0.7 }}>got  :</span> {JSON.stringify(r.got)}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {allPassed && (
        <div className="anim-up" style={{
          background: PX.gold,
          border: `3px solid ${PX.ink}`,
          boxShadow: `4px 4px 0 ${PX.shadow}`,
          padding: 14,
          textAlign: "center",
        }}>
          <div style={{ fontFamily: PX.fontHead, fontSize: 13, color: PX.bloodDark, letterSpacing: 2 }}>
            ★ ALL TESTS PASSED ★
          </div>
          <div style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.ink, marginTop: 8, letterSpacing: 1 }}>
            {alreadyEarned ? "STAR ALREADY CLAIMED" : "STAR AUTO-CLAIMED FOR THIS QUEST"}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryContent({ catKey, day, earned, onAutoClaim }) {
  if (catKey === "dsa") return <DSAContent day={day} earned={earned} onAutoClaim={onAutoClaim} />;
  if (catKey === "sd") return <SDContent day={day} />;
  if (catKey === "cs") return <CSContent day={day} />;
  if (catKey === "apt") return <APTContent day={day} earned={earned} onAutoClaim={onAutoClaim} />;
  if (catKey === "hr") return <HRContent day={day} />;
  return null;
}

/* Reusable pixel-style blocks */
function Tag({ color, children }) {
  return (
    <span style={{
      fontFamily: PX.fontHead,
      fontSize: 7,
      letterSpacing: 1,
      background: color,
      color: PX.parchmentLight,
      padding: "3px 6px",
      border: `2px solid ${PX.ink}`,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}
function ContentBlock({ accentColor, icon: Ic, label, children }) {
  return (
    <div style={{
      background: PX.parchment,
      border: `3px solid ${PX.ink}`,
      boxShadow: `3px 3px 0 ${PX.ink}`,
      padding: "12px 14px",
    }}>
      <div className="flex items-center gap-2 mb-2 pb-2"
        style={{ borderBottom: `2px dotted ${PX.parchmentDark}` }}>
        {Ic && <Ic size={12} style={{ color: accentColor }} />}
        <span style={{
          fontFamily: PX.fontHead, fontSize: 8, letterSpacing: 1,
          color: accentColor,
        }}>
          ▸ {label}
        </span>
      </div>
      <p style={{
        fontFamily: PX.font, fontSize: 16, lineHeight: 1.4,
        color: PX.ink,
        whiteSpace: "pre-line",
      }}>{children}</p>
    </div>
  );
}

/* ---------- DSA: teaching mode ---------- */
function DSAContent({ day, earned, onAutoClaim }) {
  const p = DSA_PROBLEMS[(day - 1) % DSA_PROBLEMS.length];
  const [section, setSection] = useState("concept");
  const [secs, setSecs] = useState(p.time * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecs(p.time * 60); setRunning(false); setSection("concept");
  }, [day, p.time]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecs((s) => { if (s <= 1) { setRunning(false); return 0; } return s - 1; });
      }, 1000);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [running]);

  const mm = Math.floor(secs / 60).toString().padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");
  const overtime = secs === 0;
  const dsaColor = PX.cat.dsa;
  const diffColor = p.diff === "Easy" ? "#16a34a" : p.diff === "Medium" ? "#d97706" : "#dc2626";
  const hasTests = p.tests && p.starters;

  const sections = [
    { k: "concept", label: "1. Learn", icon: BookOpen, content: p.concept, lbl: "Concept" },
    { k: "pattern", label: "2. Pattern", icon: Brain, content: p.pattern, lbl: "When to use this pattern" },
    { k: "example", label: "3. Example", icon: Sparkles, content: p.example, lbl: "Walked-through example" },
    { k: "problem", label: "4. Solve", icon: Target, content: p.problem, lbl: "Your problem to solve" },
  ];
  const cur = sections.find((s) => s.k === section);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Tag color={dsaColor}>{p.topic}</Tag>
        <Tag color={diffColor}>{p.diff}</Tag>
        <Tag color={PX.inkSoft}>⌛ {p.time} MIN</Tag>
        {p.day && <Tag color={PX.inkSoft}>D{p.day}/45</Tag>}
      </div>

      <h3 style={{ fontFamily: PX.fontHead, fontSize: 13, color: PX.ink, lineHeight: 1.4 }}>
        ▸ {p.title}
      </h3>

      {/* Section tabs — pixel buttons */}
      <div className="flex gap-1 flex-wrap">
        {sections.map((s) => {
          const active = section === s.k;
          return (
            <button key={s.k} onClick={() => setSection(s.k)}
              className="anim-shake-hover anim-squash"
              style={{
                background: active ? dsaColor : PX.parchment,
                color: active ? PX.parchmentLight : PX.inkSoft,
                border: `3px solid ${PX.ink}`,
                boxShadow: active ? `inset 0 -3px 0 ${PX.shadow}` : `2px 2px 0 ${PX.ink}`,
                padding: "6px 10px",
                fontFamily: PX.fontHead,
                fontSize: 8,
                letterSpacing: 1,
                cursor: "pointer",
                flex: 1,
                minWidth: 80,
              }}>
              {s.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Section content */}
      <ContentBlock accentColor={section === "problem" ? PX.bloodDark : dsaColor}
        icon={cur.icon} label={cur.lbl.toUpperCase()}>
        {cur.content}
      </ContentBlock>

      {/* Timer — only on Solve */}
      {section === "problem" && (
        <div className="anim-up" style={{
          background: PX.parchmentDark,
          border: `3px solid ${PX.ink}`,
          boxShadow: `3px 3px 0 ${PX.ink}`,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}>
          <div className="flex items-center gap-3">
            <span className={running ? "anim-blink" : ""}
              style={{ fontFamily: PX.fontHead, fontSize: 12, color: running ? PX.bloodDark : PX.inkSoft }}>
              ⏱
            </span>
            <div style={{
              fontFamily: PX.fontHead,
              fontSize: 22,
              color: overtime ? PX.bloodDark : running ? PX.ink : PX.inkSoft,
              letterSpacing: 1,
            }}>
              {mm}:{ss}
            </div>
            {overtime && (
              <span className="anim-blink" style={{
                fontFamily: PX.fontHead, fontSize: 8,
                color: PX.bloodDark, letterSpacing: 1,
              }}>! OVERTIME !</span>
            )}
          </div>
          <div className="flex gap-2 ml-auto">
            <PixelButton onClick={() => setRunning((r) => !r)}
              color={running ? PX.bloodDark : PX.moss}
              textColor={PX.parchmentLight}>
              {running ? "❚❚ PAUSE" : (secs === p.time * 60 ? "▶ START" : "▶ RESUME")}
            </PixelButton>
            <PixelButton onClick={() => { setSecs(p.time * 60); setRunning(false); }}
              color={PX.parchment} textColor={PX.ink}
              style={{ padding: "8px 10px" }}>↺</PixelButton>
          </div>
        </div>
      )}

      {/* Code runner — only on Solve and only if problem has tests */}
      {section === "problem" && hasTests && (
        <CodeRunner problem={p} alreadyEarned={earned} onAllPass={onAutoClaim} />
      )}

      {section === "problem" && !hasTests && (
        <div style={{
          background: PX.parchmentDark,
          border: `3px dashed ${PX.inkSoft}`,
          padding: "10px 14px",
          fontFamily: PX.font, fontSize: 14, color: PX.inkSoft,
        }}>
          ☞ Auto-verify not yet wired for this day. Solve in your editor of choice, then claim the star manually below.
        </div>
      )}

      <div style={{ fontFamily: PX.font, fontSize: 14, color: PX.inkSoft }}>
        ☞ Reference:{" "}
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          style={{ color: PX.bloodDark, textDecoration: "underline" }}>
          open scroll →
        </a>
      </div>

      <div style={{ fontFamily: PX.font, fontSize: 13, color: PX.inkSoft, fontStyle: "italic" }}>
        Flow: LEARN → PATTERN → EXAMPLE → SOLVE.
      </div>
    </div>
  );
}

/* ---------- System Design ---------- */
function SDContent({ day }) {
  const t = SYSTEM_DESIGN_TOPICS[(day - 1) % SYSTEM_DESIGN_TOPICS.length];
  return (
    <div className="space-y-4">
      <Tag color={PX.cat.sd}>SYSTEM DESIGN</Tag>
      <h3 style={{ fontFamily: PX.fontHead, fontSize: 13, color: PX.ink, lineHeight: 1.4 }}>
        ▸ {t.title}
      </h3>
      <ContentBlock accentColor={PX.cat.sd} icon={BookOpen} label="CORE CONCEPT">
        {t.read}
      </ContentBlock>
      <ContentBlock accentColor={PX.bloodDark} icon={Brain} label="YOUR TASK">
        {t.practice}
      </ContentBlock>
      <div style={{ fontFamily: PX.font, fontSize: 13, color: PX.inkSoft, fontStyle: "italic" }}>
        ☞ Sketch the answer in a notebook. Drawing  reading.
      </div>
    </div>
  );
}

/* ---------- Core CS ---------- */
function CSContent({ day }) {
  const t = CORE_CS_TOPICS[(day - 1) % CORE_CS_TOPICS.length];
  return (
    <div className="space-y-4">
      <Tag color={PX.cat.cs}>{t.area.toUpperCase()}</Tag>
      <h3 style={{ fontFamily: PX.fontHead, fontSize: 13, color: PX.ink, lineHeight: 1.4 }}>
        ▸ {t.title}
      </h3>
      <ContentBlock accentColor={PX.cat.cs} icon={BookOpen} label="CONCEPT">
        {t.read}
      </ContentBlock>
      <ContentBlock accentColor={PX.bloodDark} icon={Brain} label="INTERVIEW QUESTION">
        {t.Q}
      </ContentBlock>
    </div>
  );
}

/* ---------- Aptitude ---------- */
function APTContent({ day, earned, onAutoClaim }) {
  const p = APTITUDE_PROBLEMS[(day - 1) % APTITUDE_PROBLEMS.length];
  const [showHint, setShowHint] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [checkResult, setCheckResult] = useState(null); // null | "correct" | "wrong"
  useEffect(() => {
    setShowHint(false); setShowAns(false);
    setUserAnswer(""); setCheckResult(null);
  }, [day]);

  const justClaimed = useRef(false);
  useEffect(() => {
    if (checkResult === "correct" && !earned && !justClaimed.current) {
      justClaimed.current = true;
      onAutoClaim?.();
    }
    if (checkResult !== "correct") justClaimed.current = false;
  }, [checkResult, earned, onAutoClaim]);

  const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ").replace(/[,]/g, "");
  const checkAnswer = () => {
    const u = norm(userAnswer);
    const exp = norm(p.answer);
    // Also try matching just the leading number / first word
    const uNum = u.match(/-?\d+(\.\d+)?/);
    const expNum = exp.match(/-?\d+(\.\d+)?/);
    const numMatch = uNum && expNum && uNum[0] === expNum[0];
    const exact = u === exp || exp.includes(u) || u.includes(exp);
    setCheckResult(numMatch || exact ? "correct" : "wrong");
  };

  return (
    <div className="space-y-4">
      <Tag color={PX.cat.apt}>{p.area.toUpperCase()}</Tag>
      <h3 style={{ fontFamily: PX.fontHead, fontSize: 12, color: PX.ink, lineHeight: 1.4 }}>
        ▸ {p.title}
      </h3>
      <ContentBlock accentColor={PX.cat.apt} icon={Calculator} label="PROBLEM">
        {p.brief}
      </ContentBlock>

      {/* Answer input */}
      <div style={{
        background: PX.parchment,
        border: `3px solid ${PX.ink}`,
        boxShadow: `3px 3px 0 ${PX.ink}`,
        padding: 12,
      }}>
        <div style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.bloodDark, letterSpacing: 1, marginBottom: 8 }}>
          ▸ YOUR ANSWER
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => { setUserAnswer(e.target.value); setCheckResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="type your answer..."
            style={{
              flex: 1,
              minWidth: 160,
              background: PX.parchmentLight,
              border: `3px solid ${PX.ink}`,
              boxShadow: `inset 2px 2px 0 ${PX.parchmentDark}`,
              padding: "8px 10px",
              fontFamily: PX.font, fontSize: 18,
              color: PX.ink,
              outline: "none",
            }}
          />
          <PixelButton onClick={checkAnswer} color={PX.moss} textColor={PX.parchmentLight}>
            ▶ CHECK
          </PixelButton>
        </div>
        {checkResult === "correct" && (
          <div className="anim-up" style={{
            marginTop: 10,
            background: PX.moss,
            color: PX.parchmentLight,
            border: `2px solid ${PX.ink}`,
            padding: "6px 10px",
            fontFamily: PX.fontHead, fontSize: 9, letterSpacing: 1,
          }}>
            ✓ CORRECT! {!earned && "STAR AUTO-CLAIMED."}
          </div>
        )}
        {checkResult === "wrong" && (
          <div className="anim-up" style={{
            marginTop: 10,
            background: PX.bloodDark,
            color: PX.parchmentLight,
            border: `2px solid ${PX.ink}`,
            padding: "6px 10px",
            fontFamily: PX.fontHead, fontSize: 9, letterSpacing: 1,
          }}>
            ✗ NOT QUITE. TRY AGAIN OR PEEK AT HINT.
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <PixelButton onClick={() => setShowHint(!showHint)}
          color={PX.cat.apt} textColor={PX.parchmentLight}>
          {showHint ? "✕ HIDE HINT" : "? SHOW HINT"}
        </PixelButton>
        <PixelButton onClick={() => setShowAns(!showAns)}
          color={PX.parchmentDark} textColor={PX.ink}>
          {showAns ? "✕ HIDE ANS" : "👁 PEEK ANS"}
        </PixelButton>
      </div>

      {showHint && (
        <div className="anim-up" style={{
          background: PX.parchment,
          border: `3px dashed ${PX.cat.apt}`,
          padding: 12,
          fontFamily: PX.font, fontSize: 16, color: PX.ink,
        }}>
          <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.cat.apt }}>HINT ▸ </span>
          {p.hint}
        </div>
      )}
      {showAns && (
        <div className="anim-up" style={{
          background: PX.parchment,
          border: `3px solid ${PX.cat.hr}`,
          padding: 12,
          fontFamily: PX.font, fontSize: 16, color: PX.ink,
        }}>
          <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.cat.hr }}>ANSWER ▸ </span>
          <span style={{ fontFamily: PX.fontHead, fontSize: 11, color: PX.bloodDark }}>{p.answer}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- HR / Behavioral ---------- */
function HRContent({ day }) {
  const p = BEHAVIORAL_PROMPTS[(day - 1) % BEHAVIORAL_PROMPTS.length];
  return (
    <div className="space-y-4">
      <Tag color={PX.cat.hr}>BEHAVIORAL</Tag>
      <h3 style={{ fontFamily: PX.fontHead, fontSize: 12, color: PX.ink, lineHeight: 1.4 }}>
        ▸ {p.title}
      </h3>
      <ContentBlock accentColor={PX.cat.hr} icon={MessageSquare} label="TODAY'S PROMPT">
        {p.prompt}
      </ContentBlock>
      <ContentBlock accentColor={PX.inkSoft} icon={Shield} label="FRAMEWORK">
        {p.framework}
      </ContentBlock>
      <div style={{ fontFamily: PX.font, fontSize: 13, color: PX.inkSoft, fontStyle: "italic" }}>
        ☞ Speak the answer aloud. Record yourself if possible.
      </div>
    </div>
  );
}

/* =========================================================
   MapView — Pokémon-style HORIZONTAL pixel route map
   Side-scrolling: days go left→right, path waves up/down
   ========================================================= */
function MapView({ currentDay, days, startDate, onPickDay }) {
  const [H, setH] = useState(380);
  useEffect(() => {
    const update = () => {
      // Responsive height: shorter on mobile, taller on desktop
      const vh = window.innerHeight;
      setH(Math.min(Math.max(vh * 0.55, 320), 460));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const lastNode = Math.min(45, currentDay + 5);
  const STEP = 130;          // horizontal distance between nodes
  const PAD_X = 80;
  const AMP = H / 2 - 70;    // vertical wave amplitude
  const FREQ = 0.65;
  const totalW = PAD_X * 2 + (lastNode - 1) * STEP;

  const nodes = [];
  for (let i = 1; i <= lastNode; i++) {
    const x = PAD_X + (i - 1) * STEP;
    const y = H / 2 + AMP * Math.sin((i - 1) * FREQ);
    const d = days[i] || { stars: {} };
    const earned = Object.values(d.stars || {}).filter(Boolean).length;
    nodes.push({
      day: i, x, y, earned,
      isLocked: i > currentDay,
      isCurrent: i === currentDay,
      isPerfect: earned === 5,
    });
  }

  // Stone path tiles between consecutive nodes — quadratic bezier through midpoint
  const pathDots = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i], b = nodes[i + 1];
    const steps = 9;
    for (let s = 1; s < steps; s++) {
      const t = s / steps;
      const midX = (a.x + b.x) / 2;
      // Subtle curve: x interpolates linearly through midpoint, y via bezier
      const tx = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * midX + t * t * b.x;
      const ty = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * ((a.y + b.y) / 2) + t * t * b.y;
      pathDots.push({ x: tx, y: ty, walked: b.day <= currentDay });
    }
  }

  // Trees scattered above and below the path
  const trees = [];
  for (let i = 0; i < lastNode * 3; i++) {
    const seed = i * 79 + 13;
    const x = 30 + ((seed * 23) % (totalW - 60));
    // figure out where the path is at this x
    const dayIdx = Math.round((x - PAD_X) / STEP);
    const pathY = H / 2 + AMP * Math.sin(dayIdx * FREQ);
    // trees go above OR below, away from the path
    const above = i % 2 === 0;
    const offset = 70 + ((seed * 11) % 60);
    const y = above ? pathY - offset : pathY + offset;
    if (y < 20 || y > H - 30) continue;
    trees.push({ x, y, variant: seed % 3 });
  }

  // Field decorations — flowers, mushrooms, rocks, grass tufts
  const decoKinds = ["flower", "flowerY", "mushroom", "rock", "grass", "grass", "flower", "grass"];
  const decos = [];
  for (let i = 0; i < lastNode * 6; i++) {
    const seed = i * 41 + 7;
    const x = 20 + ((seed * 19) % (totalW - 40));
    const dayIdx = Math.round((x - PAD_X) / STEP);
    const pathY = H / 2 + AMP * Math.sin(dayIdx * FREQ);
    // Place randomly in the field but not too close to the path
    const yOffset = ((seed * 7) % (H - 40)) + 20;
    const y = yOffset;
    // skip if too close to path
    if (Math.abs(y - pathY) < 35) continue;
    if (y < 15 || y > H - 15) continue;
    // Don't place where trees are (rough check)
    const tooCloseToTree = trees.some(t => Math.abs(t.x - x) < 18 && Math.abs(t.y - y) < 24);
    if (tooCloseToTree) continue;
    decos.push({ x, y, kind: decoKinds[seed % decoKinds.length] });
  }

  // Auto-scroll to current node, horizontally
  const scrollerRef = useRef(null);
  const currentRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (currentRef.current && scrollerRef.current) {
        const node = currentRef.current;
        const scroller = scrollerRef.current;
        const nodeLeft = node.offsetLeft + node.offsetWidth / 2;
        scroller.scrollTo({
          left: nodeLeft - scroller.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const warpToday = () => {
    if (currentRef.current && scrollerRef.current) {
      const node = currentRef.current;
      const scroller = scrollerRef.current;
      const nodeLeft = node.offsetLeft + node.offsetWidth / 2;
      scroller.scrollTo({ left: nodeLeft - scroller.clientWidth / 2, behavior: "smooth" });
    }
  };

  return (
    <div className="anim-up">
      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
        <div>
          <div style={{ fontFamily: PX.fontHead, fontSize: 14, color: PX.gold, letterSpacing: 2 }}>
            ▸ ROUTE 01 ◂
          </div>
          <p style={{ fontFamily: PX.font, fontSize: 16, color: PX.parchmentLight, marginTop: 2 }}>
            Walk the path. Defeat each day's challenges.
          </p>
        </div>
        <PixelButton onClick={warpToday} color={PX.gold} textColor={PX.ink}>
          ▸ WARP TO TODAY
        </PixelButton>
      </div>

      {/* Horizontal scroll viewport */}
      <div
        ref={scrollerRef}
        className="scroll-pretty"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          border: `4px solid ${PX.ink}`,
          boxShadow: `6px 6px 0 ${PX.ink}`,
          imageRendering: "pixelated",
        }}>
        {/* Map play-field — wide, fixed height */}
        <div className="relative" style={{
          width: `${totalW}px`,
          height: `${H}px`,
          background: PX.moss,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${PX.mossDark} 0, ${PX.mossDark} 2px, transparent 2px, transparent 32px),
            repeating-linear-gradient(90deg, ${PX.mossDark} 0, ${PX.mossDark} 2px, transparent 2px, transparent 32px),
            radial-gradient(${PX.mossLight}88 2px, transparent 2px),
            radial-gradient(${PX.mossLight}44 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 32px 32px, 24px 24px, 12px 12px",
          backgroundPosition: "0 0, 0 0, 4px 4px, 0 0",
          boxShadow: `inset 0 0 0 2px ${PX.mossDark}`,
          imageRendering: "pixelated",
        }}>
          {/* Trees (background layer) */}
          {trees.map((t, i) => <PixelTree key={i} {...t} />)}

          {/* Field decorations — flowers, mushrooms, rocks, grass */}
          {decos.map((d, i) => <FieldDeco key={`d${i}`} {...d} />)}

          {/* Stone path tiles */}
          {pathDots.map((p, i) => (
            <div key={i} style={{
              position: "absolute",
              left: p.x - 6, top: p.y - 6,
              width: 12, height: 12,
              background: p.walked ? PX.stoneLight : PX.stone,
              border: `2px solid ${PX.ink}`,
              boxShadow: p.walked ? `inset 0 -2px 0 ${PX.stone}` : `inset 0 -2px 0 #5a5246`,
            }} />
          ))}

          {/* Day nodes */}
          {nodes.map((n) => (
            <DayNode key={n.day} {...n}
              ref={n.isCurrent ? currentRef : null}
              onPick={() => !n.isLocked && onPickDay(n.day)} />
          ))}

          {/* Hero character — stands beside the current node */}
          {(() => {
            const cur = nodes.find(n => n.isCurrent);
            if (!cur) return null;
            return (
              <div className="absolute anim-bob" style={{
                left: cur.x - 56,         // to the left of the current node
                top: cur.y - 18,
                pointerEvents: "none",
                zIndex: 4,
              }}>
                <PixelHero size={36} />
                {/* shadow under hero */}
                <div style={{
                  position: "absolute",
                  left: 8, bottom: -2,
                  width: 22, height: 4,
                  background: PX.shadow,
                  opacity: 0.4,
                  borderRadius: "50%",
                  filter: "blur(1px)",
                  zIndex: -1,
                }} />
              </div>
            );
          })()}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-2 text-center" style={{
        fontFamily: PX.fontHead, fontSize: 8, color: PX.parchmentDark, letterSpacing: 1,
      }}>
        ◂ SCROLL TO EXPLORE THE ROUTE ▸
      </div>
    </div>
  );
}

/* Tree sprite — pixel art */
function PixelTree({ x, y, variant }) {
  const variants = [
    { trunk: "#5a3a1e", crown: "#3a5a2a", crownLight: "#5a8a3a" },
    { trunk: "#4a2e18", crown: "#2e4525", crownLight: "#4a6b3a" },
    { trunk: "#6b4522", crown: "#4a6b2a", crownLight: "#6b9a3a" },
  ];
  const v = variants[variant] || variants[0];
  return (
    <div className="absolute anim-bob-alt" style={{
      left: x - 12, top: y - 16,
      width: 24, height: 32,
      pointerEvents: "none",
    }}>
      <svg width="24" height="32" viewBox="0 0 12 16" style={{ imageRendering: "pixelated" }} shapeRendering="crispEdges">
        {/* Crown */}
        <rect x="3" y="0" width="6" height="2" fill={v.crown} />
        <rect x="2" y="2" width="8" height="2" fill={v.crown} />
        <rect x="1" y="4" width="10" height="3" fill={v.crown} />
        <rect x="2" y="7" width="8" height="2" fill={v.crown} />
        <rect x="3" y="9" width="6" height="1" fill={v.crown} />
        {/* Highlights */}
        <rect x="3" y="2" width="2" height="1" fill={v.crownLight} />
        <rect x="2" y="4" width="3" height="1" fill={v.crownLight} />
        {/* Trunk */}
        <rect x="5" y="10" width="2" height="3" fill={v.trunk} />
        {/* Outline */}
        <rect x="3" y="0" width="6" height="1" fill={PX.ink} fillOpacity="0.4" />
      </svg>
    </div>
  );
}

/* Pixel hero — Pokémon-style trainer sprite, bobs in place */
function PixelHero({ size = 32 }) {
  return (
    <svg width={size} height={size * 16 / 12} viewBox="0 0 12 16"
      style={{ imageRendering: "pixelated", display: "block" }}
      shapeRendering="crispEdges">
      {/* Hat top + brim */}
      <rect x="4" y="0" width="4" height="1" fill={PX.bloodDark} />
      <rect x="3" y="1" width="6" height="1" fill={PX.blood} />
      <rect x="3" y="2" width="6" height="1" fill={PX.bloodDark} />
      <rect x="5" y="0" width="1" height="1" fill="#d04848" />
      {/* Face */}
      <rect x="3" y="3" width="6" height="2" fill="#f0c090" />
      {/* Eyes */}
      <rect x="4" y="4" width="1" height="1" fill={PX.ink} />
      <rect x="7" y="4" width="1" height="1" fill={PX.ink} />
      {/* Neck */}
      <rect x="5" y="5" width="2" height="1" fill="#d8a878" />
      {/* Body / arms - blue tunic */}
      <rect x="2" y="6" width="8" height="3" fill={PX.cat.sd} />
      {/* Hands */}
      <rect x="2" y="8" width="1" height="1" fill="#f0c090" />
      <rect x="9" y="8" width="1" height="1" fill="#f0c090" />
      {/* Belt */}
      <rect x="3" y="9" width="6" height="1" fill={PX.goldDark} />
      {/* Pants */}
      <rect x="3" y="10" width="3" height="3" fill={PX.inkSoft} />
      <rect x="6" y="10" width="3" height="3" fill={PX.inkSoft} />
      {/* Boots */}
      <rect x="3" y="13" width="2" height="2" fill={PX.ink} />
      <rect x="7" y="13" width="2" height="2" fill={PX.ink} />
      {/* Outline detail */}
      <rect x="3" y="1" width="1" height="1" fill={PX.ink} fillOpacity="0.5" />
      <rect x="8" y="1" width="1" height="1" fill={PX.ink} fillOpacity="0.5" />
    </svg>
  );
}

/* Field decorations — flowers, mushrooms, rocks, grass tufts */
function FieldDeco({ x, y, kind }) {
  const decos = {
    // Flower (red)
    flower: (
      <svg width="10" height="10" viewBox="0 0 5 5" shapeRendering="crispEdges">
        <rect x="1" y="0" width="1" height="1" fill={PX.blood} />
        <rect x="3" y="0" width="1" height="1" fill={PX.blood} />
        <rect x="0" y="1" width="2" height="1" fill={PX.blood} />
        <rect x="3" y="1" width="2" height="1" fill={PX.blood} />
        <rect x="2" y="1" width="1" height="1" fill={PX.gold} />
        <rect x="1" y="2" width="3" height="1" fill={PX.blood} />
        <rect x="2" y="2" width="1" height="1" fill={PX.gold} />
        <rect x="2" y="3" width="1" height="2" fill="#3a5a2a" />
      </svg>
    ),
    // Yellow flower
    flowerY: (
      <svg width="10" height="10" viewBox="0 0 5 5" shapeRendering="crispEdges">
        <rect x="1" y="0" width="3" height="1" fill={PX.gold} />
        <rect x="0" y="1" width="5" height="1" fill={PX.gold} />
        <rect x="2" y="1" width="1" height="1" fill={PX.bloodDark} />
        <rect x="1" y="2" width="3" height="1" fill={PX.gold} />
        <rect x="2" y="3" width="1" height="2" fill="#3a5a2a" />
      </svg>
    ),
    // Mushroom (red cap with white spots)
    mushroom: (
      <svg width="10" height="12" viewBox="0 0 5 6" shapeRendering="crispEdges">
        <rect x="1" y="0" width="3" height="1" fill={PX.bloodDark} />
        <rect x="0" y="1" width="5" height="2" fill={PX.blood} />
        <rect x="1" y="1" width="1" height="1" fill="#fff" />
        <rect x="3" y="2" width="1" height="1" fill="#fff" />
        <rect x="1" y="3" width="3" height="1" fill="#e8d8a8" />
        <rect x="2" y="4" width="1" height="2" fill="#e8d8a8" />
      </svg>
    ),
    // Rock cluster
    rock: (
      <svg width="14" height="10" viewBox="0 0 7 5" shapeRendering="crispEdges">
        <rect x="1" y="1" width="3" height="1" fill={PX.stoneLight} />
        <rect x="0" y="2" width="5" height="2" fill={PX.stone} />
        <rect x="0" y="2" width="5" height="1" fill={PX.stoneLight} />
        <rect x="0" y="4" width="5" height="1" fill={PX.ink} />
        <rect x="4" y="3" width="3" height="1" fill={PX.stone} />
        <rect x="4" y="2" width="2" height="1" fill={PX.stoneLight} />
        <rect x="4" y="4" width="3" height="1" fill={PX.ink} />
      </svg>
    ),
    // Tall grass tuft
    grass: (
      <svg width="10" height="8" viewBox="0 0 5 4" shapeRendering="crispEdges">
        <rect x="0" y="1" width="1" height="3" fill="#3a5a2a" />
        <rect x="2" y="0" width="1" height="4" fill="#3a5a2a" />
        <rect x="4" y="1" width="1" height="3" fill="#3a5a2a" />
        <rect x="1" y="2" width="1" height="2" fill="#5a8a3a" />
        <rect x="3" y="2" width="1" height="2" fill="#5a8a3a" />
      </svg>
    ),
  };
  return (
    <div className="absolute" style={{
      left: x - 5, top: y - 5,
      pointerEvents: "none",
      imageRendering: "pixelated",
    }}>
      {decos[kind] || decos.flower}
    </div>
  );
}

/* Day node — pixel-art square chest/marker with RPG item inside */
const DayNode = React.forwardRef(function DayNode(
  { day, x, y, earned, isLocked, isCurrent, isPerfect, onPick }, ref
) {
  const SIZE = 56;

  const fill = isLocked ? PX.stone
    : isCurrent ? PX.gold
    : isPerfect ? PX.gold
    : earned > 0 ? PX.parchmentDark
    : PX.parchment;

  const fillDark = isLocked ? "#5a5246"
    : isCurrent ? PX.goldDark
    : isPerfect ? PX.goldDark
    : earned > 0 ? PX.stone
    : PX.parchmentDark;

  const iconColor = isLocked ? PX.shadow
    : isCurrent ? PX.bloodDark
    : isPerfect ? PX.bloodDark
    : earned > 0 ? PX.ink
    : PX.inkSoft;

  return (
    <div ref={ref} className="absolute" style={{
      left: x - SIZE / 2,
      top: y - SIZE / 2,
      width: SIZE,
      height: SIZE,
    }}>
      {/* TODAY flag/banner — sits ABOVE the node */}
      {isCurrent && (
        <div className="absolute anim-flag-wave" style={{
          left: "50%",
          top: -28,
          transform: "translateX(-50%)",
          fontFamily: PX.fontHead, fontSize: 8,
          color: PX.parchmentLight,
          background: PX.bloodDark,
          padding: "4px 8px",
          border: `2px solid ${PX.ink}`,
          boxShadow: `2px 2px 0 ${PX.ink}`,
          whiteSpace: "nowrap",
          letterSpacing: 1,
          zIndex: 5,
        }}>
          <span className="anim-blink">▼</span> TODAY
        </div>
      )}

      <button onClick={onPick} disabled={isLocked}
        className={`relative ${isCurrent ? "anim-bob" : isPerfect ? "anim-bob-alt" : ""}`}
        style={{
          width: SIZE,
          height: SIZE,
          background: fill,
          border: `3px solid ${PX.ink}`,
          boxShadow: isLocked
            ? `3px 3px 0 ${PX.shadow}, inset 0 -4px 0 ${fillDark}`
            : isCurrent
              ? `3px 3px 0 ${PX.shadow}, inset 0 -5px 0 ${fillDark}, inset 0 0 0 2px ${PX.parchmentLight}`
              : `3px 3px 0 ${PX.shadow}, inset 0 -4px 0 ${fillDark}`,
          cursor: isLocked ? "not-allowed" : "pointer",
          padding: 0,
          transition: "transform 80ms steps(2)",
          opacity: isLocked ? 0.85 : 1,
        }}
        onMouseDown={(e) => !isLocked && (e.currentTarget.style.transform = "translate(2px, 2px)")}
        onMouseUp={(e) => !isLocked && (e.currentTarget.style.transform = "translate(0, 0)")}
        onMouseLeave={(e) => !isLocked && (e.currentTarget.style.transform = "translate(0, 0)")}>

        {/* Inset corner pixels for that JRPG look */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -1, left: -1, width: 4, height: 4, background: PX.parchmentLight }} />
          <div style={{ position: "absolute", top: -1, right: -1, width: 4, height: 4, background: PX.parchmentLight }} />
          <div style={{ position: "absolute", bottom: -1, left: -1, width: 4, height: 4, background: PX.shadow }} />
          <div style={{ position: "absolute", bottom: -1, right: -1, width: 4, height: 4, background: PX.shadow }} />
        </div>

        {/* Item sprite (or lock) */}
        <div className="absolute" style={{
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          {isLocked ? (
            <svg width="28" height="28" viewBox="0 0 16 16" shapeRendering="crispEdges">
              {/* Shackle (top arc) */}
              <rect x="6" y="3" width="4" height="1" fill={iconColor} />
              <rect x="5" y="4" width="1" height="3" fill={iconColor} />
              <rect x="10" y="4" width="1" height="3" fill={iconColor} />
              {/* Lock body */}
              <rect x="3" y="7" width="10" height="6" fill={iconColor} />
              <rect x="4" y="6" width="8" height="1" fill={iconColor} />
              {/* Keyhole (negative space) */}
              <rect x="7" y="9" width="2" height="1" fill={fill} />
              <rect x="7" y="10" width="1" height="2" fill={fill} />
            </svg>
          ) : (
            <ItemSprite kind={(day - 1) % 10} size={32} color={iconColor} />
          )}
        </div>

        {/* Day number badge — bottom-left */}
        <div className="absolute" style={{
          left: -4, bottom: -8,
          background: isCurrent ? PX.bloodDark : PX.ink,
          color: PX.parchmentLight,
          padding: "1px 4px",
          fontFamily: PX.fontHead,
          fontSize: 8,
          border: `2px solid ${PX.ink}`,
          boxShadow: `2px 2px 0 ${PX.shadow}`,
          minWidth: 18,
          textAlign: "center",
        }}>
          {day}
        </div>

        {/* Star pip — top-right corner if perfect */}
        {isPerfect && (
          <div className="absolute anim-blink-slow" style={{
            right: -6, top: -6,
            width: 14, height: 14,
            background: PX.gold,
            border: `2px solid ${PX.ink}`,
            color: PX.bloodDark,
            fontFamily: PX.fontHead, fontSize: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `2px 2px 0 ${PX.shadow}`,
          }}>★</div>
        )}

        {/* Pulse ring for current */}
        {isCurrent && (
          <div className="absolute inset-0 pointer-events-none" style={{
            border: `3px solid ${PX.bloodDark}`,
            animation: "pulse-ring 1.6s steps(8) infinite",
          }} />
        )}
      </button>

      {/* Stars row underneath */}
      {!isLocked && (
        <div className="absolute" style={{
          left: 0, right: 0,
          bottom: -22,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <PixelStar key={i} filled={i < earned} size={8} />
          ))}
        </div>
      )}
    </div>
  );
});

function PixelStar({ filled, size = 8 }) {
  return (
    <svg width={size + 4} height={size + 4} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <path d="M3 0h2v1h1v2h2v2h-2v1H6v2H5v-1H3v1H2V6H1V5H0V3h2V1h1V0z"
        fill={filled ? PX.gold : "transparent"}
        stroke={filled ? "none" : PX.parchmentDark}
        strokeWidth={filled ? 0 : 1} />
      {filled && (
        <path d="M3 0h2v1h1v2h2v2h-2v1H6v2H5v-1H3v1H2V6H1V5H0V3h2V1h1V0z"
          fill="none" stroke={PX.ink} strokeWidth="0.5" />
      )}
    </svg>
  );
}

function Decoration() { return null; } // unused now but kept for compat

/* =========================================================
   StatsView
   ========================================================= */
function StatsView({ days, streak, stars, level, currentDay, startDate }) {
  const perCat = CAT_ORDER.reduce((acc, k) => {
    acc[k] = Object.values(days).filter((d) => d.stars?.[k]).length;
    return acc;
  }, {});

  const max = Math.max(...Object.values(perCat), 1);
  const totalDays = currentDay;
  const activeDays = Object.values(days).filter(
    (d) => Object.values(d.stars || {}).some(Boolean)
  ).length;
  const completionRate = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;
  const fullDays = Object.values(days).filter(
    (d) => CAT_ORDER.every((k) => d.stars?.[k])
  ).length;

  const startLabel = new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="anim-up space-y-5">
      <div>
        <div style={{ fontFamily: PX.fontHead, fontSize: 14, color: PX.gold, letterSpacing: 2 }}>
          ▸ ADVENTURER LOG ◂
        </div>
        <p style={{ fontFamily: PX.font, fontSize: 16, color: PX.parchmentLight, marginTop: 2 }}>
          Quest started {startLabel}
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="🔥" color={PX.bloodDark} label="STREAK" value={streak} unit="DAYS" />
        <StatCard icon="★" color={PX.gold} label="STARS" value={stars} unit={`/${currentDay * 5}`} />
        <StatCard icon="⚔" color={PX.cat.dsa} label="LEVEL" value={level} unit="" />
        <StatCard icon="◈" color={PX.cat.sd} label="ACTIVE" value={`${completionRate}%`} unit={`${activeDays}/${totalDays}`} />
      </div>

      {/* Category breakdown */}
      <PixelPanel color={PX.parchment} className="p-4">
        <div style={{
          fontFamily: PX.fontHead, fontSize: 9, color: PX.inkSoft, letterSpacing: 1,
          paddingBottom: 10, marginBottom: 12,
          borderBottom: `2px dotted ${PX.parchmentDark}`,
        }}>
          ▸ STARS BY CATEGORY
        </div>
        <div className="space-y-3">
          {CAT_ORDER.map((k) => {
            const c = CAT[k];
            const cc = PX.cat[k];
            const w = (perCat[k] / max) * 100;
            return (
              <div key={k} className="flex items-center gap-3">
                <div className="flex items-center gap-2" style={{ width: 110, flexShrink: 0 }}>
                  <CatSprite cat={k} size={16} />
                  <span style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.ink, letterSpacing: 1 }}>
                    {c.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 relative" style={{
                  height: 16,
                  background: PX.parchmentDark,
                  border: `2px solid ${PX.ink}`,
                }}>
                  <div className="absolute inset-y-0 left-0" style={{
                    width: `${Math.max(w, 2)}%`,
                    background: cc,
                    boxShadow: `inset 0 -2px 0 ${PX.shadow}`,
                    transition: "width 200ms steps(8)",
                  }} />
                </div>
                <span style={{ fontFamily: PX.fontHead, fontSize: 9, color: PX.ink, minWidth: 24, textAlign: "right" }}>
                  {perCat[k]}
                </span>
              </div>
            );
          })}
        </div>
      </PixelPanel>

      {/* Achievement */}
      <PixelPanel color={PX.gold} className="p-5 text-center">
        <div style={{ fontFamily: PX.fontHead, fontSize: 12, color: PX.bloodDark, letterSpacing: 2 }}>
          ★ ACHIEVEMENT ★
        </div>
        <div style={{ fontFamily: PX.fontHead, fontSize: 32, color: PX.ink, marginTop: 8 }}>
          {fullDays}
        </div>
        <div style={{ fontFamily: PX.fontHead, fontSize: 8, color: PX.ink, letterSpacing: 1, marginTop: 6 }}>
          PERFECT DAYS (5★)
        </div>
      </PixelPanel>
    </div>
  );
}

function StatCard({ icon, color, label, value, unit }) {
  return (
    <PixelPanel color={PX.parchment} className="p-3" depth={3}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontFamily: PX.fontHead, fontSize: 14, color: color }}>{icon}</span>
        <span style={{ fontFamily: PX.fontHead, fontSize: 7, letterSpacing: 1, color: PX.inkSoft }}>
          {label}
        </span>
      </div>
      <div style={{ fontFamily: PX.fontHead, fontSize: 18, color: PX.ink }}>
        {value}
      </div>
      {unit && (
        <div style={{ fontFamily: PX.fontHead, fontSize: 7, color: PX.inkSoft, letterSpacing: 1, marginTop: 2 }}>
          {unit}
        </div>
      )}
    </PixelPanel>
  );
}

/* Confetti — pixel-style block confetti */
function Confetti() {
  const palette = [PX.gold, PX.bloodDark, PX.moss, PX.cat.dsa, PX.cat.sd];
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.5,
    color: palette[i % palette.length],
    size: 6 + Math.floor(Math.random() * 4) * 2,  // 6, 8, 10, 12
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.left}%`, top: 0,
          width: `${p.size}px`, height: `${p.size}px`,
          background: p.color,
          border: `2px solid ${PX.ink}`,
          animation: `confetti-fall ${p.duration}s steps(20) ${p.delay}s forwards`,
        }} />
      ))}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center anim-up">
        <PixelPanel color={PX.gold} className="px-6 py-4">
          <div style={{ fontFamily: PX.fontHead, fontSize: 16, color: PX.bloodDark, letterSpacing: 2 }}>
            ★ VICTORY ★
          </div>
          <div style={{ fontFamily: PX.fontHead, fontSize: 10, color: PX.ink, marginTop: 8, letterSpacing: 1 }}>
            ALL 5 STARS CLAIMED
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-10 mb-2 text-center">
      <div style={{
        fontFamily: PX.fontHead, fontSize: 8,
        color: PX.parchmentDark, letterSpacing: 2,
      }}>
        ▸ PRESS A TO CONTINUE · STAY CONSISTENT ◂
      </div>
    </div>
  );
}