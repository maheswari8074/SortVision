/*
Selection Sort Algorithm in Scala 

What this file includes :-

-Implemented Selection Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Selection Sort Algorithm - Sorts the array by selecting a smallest integer and arraging it in ascending order.

*/

//Implementation

//Finding Minimum number's Index
object SelectionSort{
  def findMinIndex(arr: Array[Int], start: Int, end: Int): Int = {
    //assuming first element as minimum at start
    var minIdx = start

    //updating the minIdx
    for(i <- start+1 to end) {
      if(arr(i) < arr(minIdx)) {
        minIdx = i
      }
    }

    minIdx
  }

  //Sorting the array
  def selectionSort(arr: Array[Int]): Array[Int] = {

    val n = arr.length


    //arraging the elements at their appropriate place
    for(i <- 0 until n-1) {
      val minIdx = findMinIndex(arr, i, n-1)

      val temp = arr(i)
      arr(i) = arr(minIdx)
      arr(minIdx) = temp
    }

    arr
  }
}

/*

-Time Complexity - O(n^2)
-Space Complexity - O(1) -> Because of inplace substitution

*/


object SelectionSortTest {
  def main(args: Array[String]): Unit = {
     // Example Case
    val arr1 = Array(64, 34, 25, 12, 22, 11, 90)
    println("Original Array: " + arr1.mkString(", "))
    val sorted1 = SelectionSort.selectionSort(arr1.clone())
    println("Sorted Array:   " + sorted1.mkString(", "))


    //Test Cases
    // Test Case 1: Already sorted
    val arr2 = Array(1, 2, 3, 4, 5)
    assert(SelectionSort.selectionSort(arr2.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 2: Reverse order
    val arr3 = Array(5, 4, 3, 2, 1)
    assert(SelectionSort.selectionSort(arr3.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 3: All elements equal
    val arr4 = Array(7, 7, 7, 7)
    assert(SelectionSort.selectionSort(arr4.clone()).sameElements(Array(7, 7, 7, 7)))

    // Test Case 4: Empty array
    val arr5 = Array[Int]()
    assert(SelectionSort.selectionSort(arr5.clone()).isEmpty)

    // Test Case 5: Single Element
    val arr6 = Array[Int](1)
    assert(SelectionSort.selectionSort(arr6.clone()).sameElements(Array(1)))

    println("All tests passed!")
  }
}

/* Performace Optimization Notes */ 

/* 
-Not stable by default
- Good for small datasets
- Minimizes number of swaps compared to Bubble Sort
*/