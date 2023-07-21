const minDifference = (nums = []) => {
  const middle = parseInt(nums.length / 2);
  const firstHalf = nums.slice(0, middle);
  const secondHalf = nums.slice(middle);
  const firstHalfSum = firstHalf.reduce((a, b) => a + b);
  const secondHalfSum = secondHalf.reduce((a, b) => a + b);
  const findKSum = (array, set, sum, index, k) => {
    if (k === 0) return set.add(sum);
    if (index === array.length) return;
    findKSum(array, set, sum, index + 1, k);
    findKSum(array, set, sum + array[index], index + 1, k - 1);
  };
  const populateArray = (array, dp, isSecondArray) => {
    for (let i = 1; i <= array.length; i++) {
      let set = new Set();
      findKSum(array, set, 0, 0, i);
      set = [...set.values()];
      if (isSecondArray) {
        set.sort((a, b) => a - b);
      }
      dp[i] = set;
    }
  };
  const firstDp = [[0]];
  const secondDp = [[0]];
  populateArray(firstHalf, firstDp, false);
  populateArray(secondHalf, secondDp, true);
  let min = Infinity;
  for (let i = 1; i < firstDp.length; i++) {
    for (const num1 of firstDp[i]) {
      const remainingNum1 = firstHalfSum - num1;
      const remainingLength = secondHalf.length - i;
      let left = 0;
      let right = secondDp[remainingLength].length - 1;
      while (left <= right) {
        let mid = left + parseInt((right - left) / 2);
        const num2 = secondDp[remainingLength][mid];
        const remainingNum2 = secondHalfSum - num2;
        const firstSum = num1 + num2;
        const secondSum = remainingNum1 + remainingNum2;
        if (firstSum === secondSum) return 0;
        min = Math.min(min, Math.abs(firstSum - secondSum));
        if (firstSum > secondSum) right = mid - 1;
        else left = mid + 1;
      }
    }
  }
  console.log("minimum Diff -- ", min);
  return min;
};

minDifference([3, 9, 7, 3]);
