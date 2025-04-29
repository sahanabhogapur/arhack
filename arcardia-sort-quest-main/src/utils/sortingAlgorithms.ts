
export interface Step {
  description: string;
  array: number[];
  comparingIndices?: number[];
  swappedIndices?: number[];
}

// Bubble Sort Algorithm with detailed steps
export const bubbleSort = (array: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...array];
  
  steps.push({
    description: "Start with the unsorted array",
    array: [...arr]
  });
  
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison step
      steps.push({
        description: `Compare elements at positions ${j} and ${j + 1}`,
        array: [...arr],
        comparingIndices: [j, j + 1]
      });
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        steps.push({
          description: `${arr[j]} is smaller than ${arr[j + 1]}, swap them`,
          array: [...arr],
          swappedIndices: [j, j + 1]
        });
      }
    }
    
    if (i < n - 1) {
      steps.push({
        description: `Completed pass ${i + 1}. The largest element is now at the end.`,
        array: [...arr]
      });
    }
  }
  
  steps.push({
    description: "The array is now sorted!",
    array: [...arr]
  });
  
  return steps;
};

// Selection Sort Algorithm with detailed steps
export const selectionSort = (array: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...array];
  
  steps.push({
    description: "Start with the unsorted array",
    array: [...arr]
  });
  
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    steps.push({
      description: `Looking for the minimum element starting from position ${i}`,
      array: [...arr],
      comparingIndices: [minIndex]
    });
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        description: `Compare current minimum (${arr[minIndex]}) with element at position ${j} (${arr[j]})`,
        array: [...arr],
        comparingIndices: [minIndex, j]
      });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          description: `New minimum found: ${arr[minIndex]} at position ${minIndex}`,
          array: [...arr],
          comparingIndices: [minIndex]
        });
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      steps.push({
        description: `Swap the minimum element (${arr[i]}) with the element at position ${i}`,
        array: [...arr],
        swappedIndices: [i, minIndex]
      });
    } else {
      steps.push({
        description: `Element ${arr[i]} is already in the correct position`,
        array: [...arr]
      });
    }
  }
  
  steps.push({
    description: "The array is now sorted!",
    array: [...arr]
  });
  
  return steps;
};

// Insertion Sort Algorithm with detailed steps
export const insertionSort = (array: number[]): Step[] => {
  const steps: Step[] = [];
  const arr = [...array];
  
  steps.push({
    description: "Start with the unsorted array",
    array: [...arr]
  });
  
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    steps.push({
      description: `Take element ${key} at position ${i} and find its correct position in the sorted part`,
      array: [...arr],
      comparingIndices: [i]
    });
    
    while (j >= 0 && arr[j] > key) {
      steps.push({
        description: `Compare ${key} with ${arr[j]} at position ${j}`,
        array: [...arr],
        comparingIndices: [i, j]
      });
      
      arr[j + 1] = arr[j];
      
      steps.push({
        description: `Move ${arr[j]} one position to the right`,
        array: [...arr],
        swappedIndices: [j, j + 1]
      });
      
      j--;
    }
    
    arr[j + 1] = key;
    
    if (j + 1 !== i) {
      steps.push({
        description: `Insert ${key} at position ${j + 1}`,
        array: [...arr],
        swappedIndices: [j + 1]
      });
    }
  }
  
  steps.push({
    description: "The array is now sorted!",
    array: [...arr]
  });
  
  return steps;
};

export const algorithms = {
  bubble: {
    name: "Bubble Sort",
    description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    function: bubbleSort,
    difficulty: "Easy" as const,
    explanation: "Bubble sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which means the list is sorted."
  },
  selection: {
    name: "Selection Sort",
    description: "Selection sort divides the input list into two parts: the sorted sublist and the unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and moves it to the end of the sorted sublist.",
    function: selectionSort,
    difficulty: "Medium" as const,
    explanation: "The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the boundary between the two sublists one element to the right."
  },
  insertion: {
    name: "Insertion Sort",
    description: "Insertion sort builds the final sorted array one item at a time. It takes each element from the input data and inserts it into its correct position within the sorted part of the array.",
    function: insertionSort,
    difficulty: "Hard" as const,
    explanation: "Insertion sort iterates through the array, consuming one input element each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain."
  }
};

export type AlgorithmKey = keyof typeof algorithms;
