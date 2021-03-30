const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i = 0; i < newCollection.length; i++) {
        callback(newCollection[i])
      }

      return collection;
    },

    map: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);
      const arr = []

      for (let i = 0; i < newCollection.length; i++) {
        arr.push(callback(newCollection[i]));
      }

      return arr;
    },

    reduce: function(collection, callback, acc) {
      let newCollection = collection.slice()

      if (!acc) {
        acc = newCollection[0]
        newCollection = collection.slice(1)
      }

      for (let i = 0; i < newCollection.length; i++) {
        acc = callback(acc, newCollection[i], newCollection)
      }

      return acc;
    },

    find: function(collection, predicate) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i = 0; i < newCollection.length; i++) {  
        if (predicate(newCollection[i])) return newCollection[i];
      }

      return undefined;
    },

    filter: function(collection, predicate) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      let results = [];

      for (let i = 0; i < newCollection.length; i++) {
        if (predicate(newCollection[i])){
          results.push(newCollection[i]);
        }
      }

      return results;
    },

    size: function(collection) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      let count = 0;

      for (let i = 0; i < newCollection.length; i++) {
        count++
      }

      return count;
    },

    first: function(array, n) {

      return (n) ? array.slice(0, n) : array[0];
      
    },

    last: function(array, n) {
      return (n) ? array.slice(array.length-n, array.length) : array[array.length-1]
    },

    compact: function(array) {
      let results = [];

      for (let i = 0; i < array.length; i++) {
        if (array[i]){
          results.push(array[i])
        }
      }

      return results;
    },

    sortBy: function(array, callback) {
      let newArr = [...array];
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      });
    },

    unpack: function(receiver, arr) {
      for (let val of arr) {
        receiver.push(val)
      }
    },

    flatten: function(array, boolean, newArr=[]) {
      if (!Array.isArray(array)) return newArr.push(array)
      if (boolean) {
        for (let val of array) {
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
        }
      } else {
        for (let val of array) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr;
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },

  }
})()

fi.libraryMethod()
