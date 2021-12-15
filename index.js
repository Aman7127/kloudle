//const { forEach } = require('./tests');
const TESTS = require('./tests');

/**
 * Returns an array that does not have any duplicates
 * and is sorted in the order of decreasing amount of duplicates.
 * If two numbers have the same amount of duplicates,
 * the number that appeared earlier in `source` array
 * is to be kept before.
 *
 * @param {Array<Number>} source
 *
 * @returns {Array<Number>}
 */
function compute(source) {
  console.log(source);
  const counts = {};
  source.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  //console.log(counts);
  let arr = [];
  while (Object.keys(counts).length) {
    let maxOccur = 0,
      maxOccurArr = [];
    for (let elem in counts) {
      if (counts[elem] > maxOccur) {
        maxOccur = counts[elem];
        maxOccurArr = [];
        maxOccurArr.push(elem);
      } else if (counts[elem] == maxOccur) {
        maxOccurArr.push(elem);
      }
    }
    // console.log(maxOccurArr);
    if (maxOccurArr.length == 1) {
      arr.push(maxOccurArr[0]);
      delete counts[maxOccurArr[0]];
    } else {
      let or = {};
      maxOccurArr.forEach((x) => {
        or[x] = source.indexOf(parseInt(x));
        delete counts[x];
      });
      // console.log(or);
      while (Object.keys(or).length) {
        let min = Number.MAX_SAFE_INTEGER,
          element = 0;
        for (let e in or) {
          if (or[e] < min) {
            min = or[e];
            element = e;
          }
        }
        arr.push(element);
        delete or[element];
      }
    }
  }
  arr.forEach((x, ind) => {
    arr[ind] = parseInt(x);
  });
  return arr;
}

function runTests() {
  TESTS.forEach((test, index) => {
    const passed =
      JSON.stringify(compute(test.source)) === JSON.stringify(test.answer);

    console.log(`Test #${index + 1}:`, passed ? 'passed' : 'failed');
  });
}

runTests();
