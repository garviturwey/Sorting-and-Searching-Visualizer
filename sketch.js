let slider = document.getElementById("myRange");
let inp = document.getElementById("input");
let array;
let lenght=(1700-400)/slider.value;
let comparision=0;
let colour;
let out;
let slidervalue;
let canv;



slider.oninput = function() {
  arrayChange();
}


function setup() {
  canv=createCanvas(displayWidth-25, 540);
  canv.parent('can');
  arrayCreate();
}
function draw() {
  background(205, 169, 235);
  line(50,0,50,520);

  textSize(15);
  fill(50);

  line(50,20,75,20);
  text('0', 20, 25);
  line(50,120,75,120);
  text('100', 20, 125);

  line(50,220,75,220);
  text('200', 20, 225);

  line(50,320,75,320);
  text('300', 20, 325);

  line(50,420,75,420);
  text('400', 20, 425);

  line(50,520,75,520);
  text('500', 20, 525);


  //noStroke();
  arrayshow();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function arrayCreate()
{
  //console.log("array changed");
  //document.getElementById("oo").innerHTML = "Array Changed";

  slidervalue=slider.value;
  lenght=(1700-400)/slider.value;
  array=[];
  colour=[];
  for(let k=0;k<slider.value;k++)
  {
    array.push(Math.floor(Math.random()*501));
    colour.push(0);
  }
}
function arrayChange()
{
  //console.log("array changed");
  document.getElementById("oo").innerHTML = "Array Changed";

  slidervalue=slider.value;
  lenght=(1700-400)/slider.value;
  array=[];
  colour=[];
  for(let k=0;k<slider.value;k++)
  {
    array.push(Math.floor(Math.random()*501));
    colour.push(0);
  }
}
function arrayshow()
{
  //console.log("array show");
  for(let k=0;k<slider.value;k++)
  {
    switch (colour[k]){
    case 1:
      fill(200,0,0);
      break;
    case 2:
      fill(0,200,0);
      break;
    default:
      fill(0,0,200);
      break;
  }
  rect(100+(k*lenght),20,lenght,array[k]);
  }
}
async function swap(arr, a, b) {
  await sleep(5);
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}
function myInputEvent() {
  return (/^\d+$/.test(inp.value));
}
function enable()
{
  var elements = document.getElementsByClassName("myButton");

for (var i = 0; i < elements.length; i++) {
  elements[i].disabled =false;
}
  document.getElementById('myRange').disabled=false;
}
function disable()
{
  var elements = document.getElementsByClassName("myButton");

for (var i = 0; i < elements.length; i++) {
  elements[i].disabled =true;
}
  document.getElementById('myRange').disabled=true;
}



//bubble sort
async function bsortstart()
{
  await disable();
  //console.log("bubble sort started");
  document.getElementById("oo").innerHTML = "Sorting";
  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await bubblesort();
  colour=new Array(slidervalue).fill(2);
  //console.log("bubble sort ended   comparision ="+comparision);
  document.getElementById("oo").innerHTML = "Bubble sort Completed | comparisions = "+comparision;
  await enable();

}
async function bubblesort()
{
  let swapped=false;
  for (let i = 0; i < slidervalue-1; i++)
  {
    swapped = false;
    for (let j = 0; j < slidervalue-i-1; j++)
    {
      comparision++;
      if (array[j] > array[j+1])
      {
        colour[j]=1;
        colour[j+1]=1;
        await swap(array,j, j+1);
        swapped = true;
      }
      colour[j]=0;
      colour[j+1]=0;
    }
    colour[slidervalue-i-1]=2;
    if (swapped == false)
      break;
  }
}




//quick sort
async function qsortstart()
{
  await disable();
  //console.log("quick sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await quicksort(0,slidervalue-1);
  colour=new Array(slidervalue).fill(2);
  //console.log("quick sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Quick sort Completed | comparisions = "+comparision;
  await enable();

}
async function quicksort(start,end)
{
  if(start>=end)
  {colour[start]=2;
    colour[end]=2;
    return;}
  let index=await partition(start,end);
  await quicksort(start,index-1);
  await quicksort(index+1,end) ;
}
async function partition(start,end)
{
  await sleep(20);
  let pivotindex=start;
  let pivotvalue=array[end];
  for(let i=start;i<end;i++)
  {
    comparision++;
    colour[i]=1;
    await sleep(0);
    if(array[i]<pivotvalue)
    {
      await swap(array,pivotindex,i);
      pivotindex++;
      await sleep(0);
    }
    colour[i]=0;
  }
  await swap(array,pivotindex,end);
  colour[pivotindex]=2;
  await sleep(10);
  return pivotindex;
}




//merge sort
async function merges(l,m,r)
{
  await sleep(20);
  let L=[],R=[];
  let i=l,j=m+1;
  while(i<=m)
  {
    colour[i]=1;
    L.push(array[i]);
    i++;
    await sleep(5);
    colour[i]=0;
  }
  while(j<=r)
  {
    colour[j]=1;
    R.push(array[j]);
    j++;
    await sleep(5);
    colour[j]=0;
  }
  i=0,j=0,k=l;
  let l1=m-l+1,l2=r-m;
  while(i<l1&&j<l2)
  {
    if(L[i]>R[j])
    {
      colour[k]=1;
      array[k]=R[j];
      j++;
    }
    else
    {
      colour[k]=1;
      array[k]=L[i];
      i++;
    }
    await sleep(5);
    colour[k]=0;
    k++;
  }
  while(i<l1)
  {
    colour[k]=1;
    array[k]=L[i];
    await sleep(5);
    colour[k]=0;
    i++;
    k++;
  }
  while(j<l2)
  {
    colour[k]=1;
    array[k]=R[j];
    await sleep(5);
    colour[k]=0;
    j++;
    k++;
  }
}
async function mergesort(l,r)
{
  if(r>l)
  {
    comparision+=(r-l+1);
    let m=Math.floor(l+((r-l)/2));
    await mergesort(l,m);
    await mergesort(m+1,r);
    await merges(l,m,r);
  }
}
async function msortstart()
{
  await disable();
  //console.log("merge sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await mergesort(0,slidervalue-1);
  colour=new Array(slidervalue).fill(2);
  //console.log("merge sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Merge sort Completed | comparisions = "+comparision;
  await enable();
}




//heap sort
async function heap_root(n,i) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;
  if (left < n && array[left] > array[max]) {
    max = left;
  }
  if(right < n && array[right] > array[max]){
    max = right;
  }
  comparision++;
  colour[max]=1;
  await sleep(10);
  colour[max]=0;
  if (max != i) {
    await swap(array, i, max);
    await heap_root(n,max);
  }
}
async function heapSort(size) {
  for (let i = Math.floor((size/2)-1); i >= 0; i -= 1)      {
    await heap_root(size,i);
  }
  for (let i = size - 1; i > 0; i--) {
    await swap(array, 0, i);
    colour[i]=2;
    await heap_root(i,0);
  }
}
async function hsortstart(){
  await disable();
  //console.log("heap sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await heapSort(slidervalue);
  colour=new Array(slidervalue).fill(2);
  //console.log("heap sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Heap sort Completed | comparisions = "+comparision;
  await enable();
}




//selectin sort
async function selectionsort(n)
{
  let i, j, min_idx;
  for (i = 0; i < n-1; i++)
  {
    min_idx = i;
    for (j = i+1; j < n; j++)
    {
      colour[j]=1;
      await sleep(3);
      comparision++;
      if (array[j] < array[min_idx])
        min_idx = j;
      colour[j]=0;
    }
    await swap(array,min_idx,i);
    colour[i]=2;
    await sleep(0);
  }
}
async function ssortstart()
{
  await disable();
  //console.log("selection sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await selectionsort(slidervalue);
  colour=new Array(slidervalue).fill(2);
  //console.log("selection sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Selection sort Completed | comparisions = "+comparision;
  await enable();
}



//insertion sort
async function insertionsort(n)
{
  let i, key, j;
  for (i = 1; i < n; i++)
  {
    key = array[i];
    j = i - 1;
    while (j >= 0 && array[j] > key)
    {
      comparision++;
      colour[j]=1;
      await sleep(20);
      array[j + 1] = array[j];
      colour[j]=0;
      j = j - 1;
    }
    array[j + 1] = key;
  }
}
async function isortstart()
{
  await disable();
  //console.log("insertion sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await insertionsort(slidervalue);
  colour=new Array(slidervalue).fill(2);
  //console.log("insertion sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Insertion sort Completed | comparisions = "+comparision;
  await enable();
}


//count sort
async function csortstart()
{
  await disable();
  //.log("count sort started");
  document.getElementById("oo").innerHTML = "Sorting";

  colour=new Array(slidervalue).fill(0);
  await sleep(0);
  comparision=0;
  await countsort();
  colour=new Array(slidervalue).fill(2);
  //console.log("count sort ended  comaprision = "+comparision);
  document.getElementById("oo").innerHTML = "Count sort Completed | comparisions = "+comparision;
  await enable();
}
async function countsort()
{
  let output=new Array(slidervalue).fill(2);
  let cnt=new Array(501).fill(0);
  let i;
  for(i = 0; i<slidervalue; ++i)
  {
    colour[i]=1;
    await sleep(10);
    comparision++;
    ++cnt[array[i]];
    colour[i]=0;
  }
  for (i = 1; i <= 500; ++i)
  {
    cnt[i] += cnt[i-1];
    comparision++;
  }
  for (i = 0; i<slidervalue; ++i)
  {
    output[cnt[array[i]]-1] = array[i];
    --cnt[array[i]];
  }
  for (i = 0; i<slidervalue; ++i)
  {
    array[i] = output[i];
    colour[i]=2;
    await sleep(0);
  }
}



//linear search
async function linearstart()
{
  await disable();
  if(myInputEvent()&&inp.value<501&&inp.value>-1)
  {
    document.getElementById("oo").innerHTML = "Searching";
    //console.log("linear search started");
    colour=new Array(slidervalue).fill(0);
    await sleep(0);
    comparision=0;
    await linearsearch();
    colour=new Array(slidervalue).fill(0);
    //console.log("linear search ended  comaprision = "+comparision);
  }
  else
    document.getElementById("oo").innerHTML = "Wrong Input";
  await enable();
}
async function linearsearch()
{
  let xx=inp.value;
  for(let i=0;i<slidervalue;i++)
  {
    comparision++;
    colour[i]=1;
    await sleep(30);
    if(xx==array[i])
    {
      comparision++;
      colour[i]=2;
      await sleep(20);
      document.getElementById("oo").innerHTML = "Linear search Completed | comparisions = "+comparision+" | Position = "+(i+1);
      return;
    }
    colour[i]=0;
  }
  document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
}


//binary search
async function Binarystart()
{
  await disable();
  if(myInputEvent()&&inp.value<501&&inp.value>-1)
  {
    document.getElementById("oo").innerHTML = "Searching";
    //console.log("binary search started");
    array.sort(function(a, b){return a - b});
    colour=new Array(slidervalue).fill(0);
    await sleep(0);
    comparision=0;
    await binarySearch(0,slidervalue-1,inp.value);
    colour=new Array(slidervalue).fill(0);
    //console.log("binary search ended  comaprision = "+comparision);
  }
  else
    document.getElementById("oo").innerHTML = "Wrong Input";
  await enable();
}
async function binarySearch(l,r,x)
{
    while (l <= r) {
      for(let i=l;i<=r;i++)
        colour[i]=2;
      await sleep(500);
      comparision++;
      let m = Math.floor(l + (r - l) / 2);
      colour[m]=1;
      await sleep(500);
      if (array[m] == x)
      {
        colour[m]=2;
        document.getElementById("oo").innerHTML = "Binary search Completed | comparisions = "+comparision+" | Position = "+(m+1);
        return ;
      }
      comparision+=2;
      colour[m]=0;
      await sleep(500);
      for(let i=l;i<=r;i++)
        colour[i]=0;
      await sleep(500);
      if (array[m] < x)
          l = m + 1;
      else
          r = m - 1;
    }
    document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
}





//jump Searching
async function Jumpstart()
{
  await disable();
  if(myInputEvent()&&inp.value<501&&inp.value>-1)
  {
    document.getElementById("oo").innerHTML = "Searching";
    //console.log("jump search started");
    array.sort(function(a, b){return a - b});
    colour=new Array(slidervalue).fill(0);
    await sleep(0);
    comparision=0;
    await jumpSearch(inp.value,slidervalue-1);
    colour=new Array(slidervalue).fill(0);
    //console.log("jump search ended comparision = "+comparision);
  }
  else
    document.getElementById("oo").innerHTML = "Wrong Input";
  await enable();
}
async function jumpSearch(x,n)
{
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (array[Math.min(step, n)-1] < x)
  {
    for(let i=prev;i<=step;i++)
      colour[i]=2;
    await sleep(500);
    for(let i=prev;i<=step;i++)
      colour[i]=0;
    comparision++;
    prev = step;
    step += step;
    if (prev >= n)
    {
      document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
      return ;
    }
  }
  colour[step]=1;
  while (array[prev] < x)
  {
    colour[prev]=2;
    await sleep(100);
    colour[prev]=0;
    prev++;
    comparision++;
    if (prev == Math.min(step, n))
    {
      document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
      return ;
    }
  }
  if (array[prev] == x)
  {
    colour[step]=0;
    colour[prev]=2;
    await sleep(100);
    document.getElementById("oo").innerHTML = "Jump search Completed | comparisions = "+comparision+" | Position = "+(prev+1);
    return ;
  }
  document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
  return ;
}



//interpolation search
async function istart()
{
  await disable();
  if(myInputEvent()&&inp.value<501&&inp.value>-1)
  {
    document.getElementById("oo").innerHTML = "Searching";
    //console.log("interpolation search started");
    array.sort(function(a, b){return a - b});
    colour=new Array(slidervalue).fill(0);
    await sleep(0);
    comparision=0;
    await interpolationSearch(0,slidervalue-1,inp.value);
    colour=new Array(slidervalue).fill(0);
    //console.log("interpolation search ended comaprision = "+comparision);
  }
  else
    document.getElementById("oo").innerHTML = "Wrong Input";
    await enable();
}
async function interpolationSearch(l,h,x)
{
  while (l <= h && x >= array[l] && x <= array[h])
  {
    for(let i=l;i<=h;i++)
      colour[i]=2;
    await sleep(500);
    comparision++;
    if (l == h)
    {
      if (array[l] == x)
      {
        colour[l]=2;
        document.getElementById("oo").innerHTML = "Interpolation search Completed | comparisions = "+comparision+" | Position = "+(m+1);
        await sleep(500);
        return ;
      }
      document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
      return ;
    }
    let m = l+ Math.floor(((h - l) /(array[h] - array[l])) * (x - array[l]));
    colour[m]=1;
    await sleep(500);
    if (array[m] == x)
    {
      colour[m]=2;
      document.getElementById("oo").innerHTML = "Interpolation search Completed | comparisions = "+comparision+" | Position = "+(m+1);
      await sleep(500);
      return ;
    }
    comparision+=2;
    colour[m]=0;
    await sleep(500);
    for(let i=l;i<=h;i++)
      colour[i]=0;
    await sleep(500);
    if (array[m] < x)
      l = m + 1;
    else
      h = m - 1;
  }
  document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
}



//exponential Searching
async function estart()
{
  await disable();
  if(myInputEvent()&&inp.value<501&&inp.value>-1)
  {
    document.getElementById("oo").innerHTML = "Searching";
    //console.log("exponential search started");
    array.sort(function(a, b){return a - b});
    colour=new Array(slidervalue).fill(0);
    await sleep(0);
    comparision=0;
    await exponentialSearch(slidervalue,inp.value);
    colour=new Array(slidervalue).fill(0);
    //console.log("exponential search ended comaprision = "+comparision);
  }
  else
    document.getElementById("oo").innerHTML = "Wrong Input";
  await enable();
}
async function exponentialSearch(n,x)
{
  if (array[0] == x)
  {
    colour[0]=2;
    document.getElementById("oo").innerHTML = "Exponential search Completed | comparisions = "+comparision+" | Position = "+(m+1);
    await sleep(500);
    return;
  }
  let i = 1;
  while (i < n && array[i] <= x)
  {
    for(let j=i;j<n;j++)
    {
      colour[j]=2;
    }
    await sleep(500);
    for(let j=i;j<n;j++)
    {
      colour[j]=0;
    }
    comparision++;
    i = i*2;
  }
  let end=Math.min(i, n);
  if(end==n)
  {
    end--;
  }
  colour[i/2]=1;
  colour[end]=1;
  await binarySearch2(i/2,end, x);
}
async function binarySearch2(l,r,x)
{
    while (l <= r) {
      for(let i=l;i<=r;i++)
        colour[i]=2;
      await sleep(500);
      comparision++;
      let m = Math.floor(l + (r - l) / 2);
      colour[m]=1;
      await sleep(500);
      if (array[m] == x)
      {
        colour[m]=2;
        document.getElementById("oo").innerHTML = "Exponential search Completed | comparisions = "+comparision+" | Position = "+(m+1);
        return ;
      }
      comparision+=2;
      colour[m]=0;
      await sleep(500);
      for(let i=l;i<=r;i++)
        colour[i]=0;
      await sleep(500);
      if (array[m] < x)
          l = m + 1;
      else
          r = m - 1;
    }
    document.getElementById("oo").innerHTML = "Element not Found | comparisions = "+comparision;
}
