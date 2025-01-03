const arrayContainer = document.getElementById('array-container');
const sortButton=document.getElementById('sort-button');
const arrayInput=document.getElementById('arrayinput');
const sortAlgo=document.getElementById('sort-algo');
const sortedNumbersElement=document.getElementById('sorted-numbers');
let array=[];
let delay=500;
function generateBars(inputArray){
    arrayContainer.innerHTML='';
    array=inputArray.map(Number);
    array.forEach((value)=>{
        const bar=document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value*3}px`;
        bar.style.backgroundColor= '#D3D3D3'
        arrayContainer.appendChild(bar);
    });
}
function sleep(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
}
async function bubbleSort() {
    arrayInput.disabled = true; 
    sortAlgo.style.display="none";
    sortButton.style.display="none";
    const bars = document.getElementsByClassName('bar');
    console.log(bars);
    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false; // Flag to detect if any swaps occurred
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#ffeb3b'; // Highlight the current bars
            bars[j + 1].style.backgroundColor = '#ffeb3b';

            if (array[j] > array[j + 1]) {
                await swap(bars[j], bars[j + 1], j, j + 1);
                swapped = true; // Mark that a swap occurred
            }
            await sleep(delay);
            bars[j].style.backgroundColor = '#03a9f4'; // Reset color after comparison
            bars[j + 1].style.backgroundColor = '#03a9f4';
        }
        await sleep(delay);
        bars[array.length - i - 1].style.backgroundColor = '#00e676'; // Mark the sorted bar

        if (!swapped) break; // Terminate early if no swaps occurred
    }

    // Mark all bars green to indicate sorting completion
    for (let k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = '#00e676';
    }

    sortedNumbersElement.textContent = array.join(', '); // Display the sorted array
    arrayInput.disabled = false;
    sortAlgo.style.display="flex";
    sortButton.style.display="flex";
}
async function swap(bar1,bar2,idx1,idx2){
    await sleep(delay);
    const temp=array[idx1];
    array[idx1]=array[idx2];
    array[idx2]=temp;
    bar1.style.height=`${array[idx1]*3}px`;
    bar2.style.height=`${array[idx2]*3}px`;
}
async function selectionSort() {
    arrayInput.disabled = true; 
    sortAlgo.style.display="none";
    sortButton.style.display="none";
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#ffeb3b'; // Highlight the current bar

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#ffeb3b'; // Highlight the bar being compared
            await sleep(delay); // Wait to visualize the comparison

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    
                    bars[minIndex].style.backgroundColor = '#03a9f4'; // Reset the previous minimum bar
                }
                minIndex = j; // Update minIndex
            } else {
                bars[j].style.backgroundColor = '#03a9f4'; // Reset color after comparison
            }
        }

        if (minIndex !== i) {
            // Swap the bars visually and update the array
            await swap(bars[i], bars[minIndex], i, minIndex);
        }
        await sleep(delay);
        bars[i].style.backgroundColor = '#00e676'; // Mark the bar as sorted
    }
    // Correctly color all bars green after sorting
    for (let k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = '#00e676';
    }
    // Ensure all bars are green at the end
    sortedNumbersElement.textContent = array.join(', ');
    arrayInput.disabled = false;
    sortAlgo.style.display="flex";
    sortButton.style.display="flex";
}

async function insertionSort() {
    arrayInput.disabled = true; 
    sortAlgo.style.display="none";
    sortButton.style.display="none";
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = '#ffeb3b';
        while (j >= 0 && array[j] > key) {
            await sleep(delay);
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 3}px`;
            await sleep(delay);
            bars[j].style.backgroundColor = '#ffeb3b';
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        await sleep(delay);
        bars[i].style.backgroundColor = '#00e676';
    }

    // Correctly color all bars green after sorting
    for (let k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = '#00e676';
    }

    sortedNumbersElement.textContent = array.join(', ');
    arrayInput.disabled = false;
    sortAlgo.style.display="flex";
    sortButton.style.display="flex";
}
async function mergeSort(start, end) {
    if (start >= end) return; // Base case: one element

    const mid = Math.floor((start + end) / 2);
    
    await mergeSort(start, mid); // Sort the left half
    await mergeSort(mid + 1, end); // Sort the right half

    await merge(start, mid, end); // Merge the two halves
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName('bar');
    let left = start, right = mid + 1;
    const temp = [];

    // Highlight the range being merged
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = '#ffeb3b';
    }
    await sleep(delay);

    // Merge the two halves
    while (left <= mid && right <= end) {
        if (array[left] <= array[right]) {
            temp.push(array[left]);
            left++;
        } else {
            temp.push(array[right]);
            right++;
        }
    }

    // Add any remaining elements from the left half
    while (left <= mid) {
        temp.push(array[left]);
        left++;
    }

    // Add any remaining elements from the right half
    while (right <= end) {
        temp.push(array[right]);
        right++;
    }

    // Copy sorted elements back to the original array and update the bars
    for (let i = start; i <= end; i++) {
        array[i] = temp[i - start];
        bars[i].style.height = `${array[i] * 3}px`;
        await sleep(delay); // Visualize the update
    }

    // Mark the merged range as sorted
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = '#00e676';
    }
}

// Initialize merge sort
async function startMergeSort() {
    arrayInput.disabled = true; 
    sortAlgo.style.display="none";
    sortButton.style.display="none";
    await mergeSort(0, array.length - 1);

    // Update the sorted numbers display
    sortedNumbersElement.textContent = array.join(', ');
    arrayInput.disabled = false;
    sortAlgo.style.display="flex";
    sortButton.style.display="flex";
}





async function quickSort(start, end) {
    if (start >= end) return;

    const bars = document.getElementsByClassName('bar');
    
    // Partition and get the pivot index
    const pivotIndex = await partition(start, end);

    // Recursively sort the left and right partitions
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);

    // Mark the current range as sorted
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = '#00e676'; // Green for sorted
    }
}

async function partition(start, end) {
    const bars = document.getElementsByClassName('bar');
    const pivotValue = array[end];
    let pivotIndex = start;

    // Highlight the pivot bar
    bars[end].style.backgroundColor = '#ff9800'; // Orange for pivot

    for (let i = start; i < end; i++) {
        // Highlight current bar being compared
        bars[i].style.backgroundColor = '#ffeb3b'; // Yellow for comparison
        await sleep(delay);

        if (array[i] < pivotValue) {
            // Swap elements and highlight swapped bars
            await swap(bars[i], bars[pivotIndex], i, pivotIndex);
            bars[i].style.backgroundColor = '#03a9f4'; // Light blue after swap
            bars[pivotIndex].style.backgroundColor = '#03a9f4'; // Light blue after swap
            pivotIndex++;
        } else {
            // Reset color if no swap occurs
            bars[i].style.backgroundColor = '#03a9f4'; // Light blue
        }
    }

    // Swap the pivot to its correct position
    await swap(bars[pivotIndex], bars[end], pivotIndex, end);

    // Reset colors of swapped bars
    bars[pivotIndex].style.backgroundColor = '#00e676'; // Green for correct position
    bars[end].style.backgroundColor = '#03a9f4'; // Reset pivot bar to light blue

    return pivotIndex;
}

async function startQuickSort() {
    arrayInput.disabled = true; 
    sortAlgo.style.display="none";
    sortButton.style.display="none";
    await quickSort(0, array.length - 1);
    sortedNumbersElement.textContent = array.join(', ');
    arrayInput.disabled = false;
    sortAlgo.style.display="flex";
    sortButton.style.display="flex";
}



sortButton.addEventListener('click',()=>{
    const input=arrayInput.value;
     if(!input) return;
     const inputArray=input.split(',').map((num)=>parseInt(num.trim(),10));
     generateBars(inputArray);
     const algorithm=sortAlgo.value;
     if(algorithm==='bubble'){
        bubbleSort();
     }else if(algorithm==='selection'){
        selectionSort();
     }else if(algorithm==='insertion'){
        insertionSort();
     }else if(algorithm==='merge'){
        startMergeSort();
     }else if(algorithm==='quick'){
        startQuickSort()
    }
});