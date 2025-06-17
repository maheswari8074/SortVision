using System;
using System.Collections.Generic;

public class BucketSort
{
    // Main sorting method
    public static void Sort(float[] array)
    {
        // The edge case: if array is null or has <= 1 element, it's already sorted
        if (array == null || array.Length <= 1)
            return;

        // Step 1: Find min and max values in the array
        float min = array[0];
        float max = array[0];
        foreach (var num in array)
        {
            if (num < min) min = num;
            if (num > max) max = num;
        }

        // Step 2: Create buckets
        int bucketCount = array.Length; // Number of buckets = number of elements
        List<List<float>> buckets = CreateBuckets(bucketCount);

        // Step 3: Calculate the range of each bucket
        float bucketRange = (max - min) / bucketCount;

        // Step 4: Distribute array elements into buckets
        foreach (var num in array)
        {
            int index = (int)((num - min) / bucketRange);
            // Handle edge case where index equals bucketCount
            if (index == bucketCount) index--;
            buckets[index].Add(num);
        }

        // Step 5: Sort each bucket
        foreach (var bucket in buckets)
        {
            bucket.Sort(); // Using built-in sort for simplicity
        }

        // Step 6: Concatenate all buckets into the original array
        int arrayIndex = 0;
        foreach (var bucket in buckets)
        {
            foreach (var num in bucket)
            {
                array[arrayIndex++] = num;
            }
        }
    }

    // Initialization of empty buckets
    private static List<List<float>> CreateBuckets(int count)
    {
        var buckets = new List<List<float>>(count);
        for (int i = 0; i < count; i++)
        {
            buckets.Add(new List<float>());
        }
        return buckets;
    }
}
