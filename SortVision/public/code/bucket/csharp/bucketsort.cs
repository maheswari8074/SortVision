using System;
using System.Collections.Generic;

public class BucketSort
{
    public static void Sort(int[] arr)
    {
        if (arr == null || arr.Length <= 1)
            return;

        int maxValue = arr[0];
        int minValue = arr[0];

        foreach (int num in arr)
        {
            if (num > maxValue) maxValue = num;
            if (num < minValue) minValue = num;
        }

        int bucketCount = (int)Math.Sqrt(arr.Length);
        List<int>[] buckets = CreateBuckets(bucketCount);

        DistributeToBuckets(arr, buckets, bucketCount, minValue, maxValue);
        SortBuckets(buckets);
        int[] sorted = ConcatenateBuckets(buckets);

        for (int i = 0; i < arr.Length; i++)
        {
            arr[i] = sorted[i];
        }
    }

    private static List<int>[] CreateBuckets(int n)
    {
        List<int>[] buckets = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            buckets[i] = new List<int>();
        }
        return buckets;
    }

    private static void DistributeToBuckets(int[] arr, List<int>[] buckets, int bucketCount, int min, int max)
    {
        foreach (int num in arr)
        {
            int bucketIndex = (int)((float)(num - min) / (max - min + 1) * bucketCount);
            buckets[bucketIndex].Add(num);
        }
    }

    private static void SortBuckets(List<int>[] buckets)
    {
        foreach (var bucket in buckets)
        {
            bucket.Sort();
        }
    }

    private static int[] ConcatenateBuckets(List<int>[] buckets)
    {
        List<int> result = new List<int>();
        foreach (var bucket in buckets)
        {
            result.AddRange(bucket);
        }
        return result.ToArray();
    }
}
