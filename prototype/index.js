function Csv() {
}

Csv.prototype.parse = function (string, separator) {
  const array = string.split('\n');
  if (string && separator) {
    return this.symbolCase(array, separator);
  } else if (string) {
    const sumbolArray = [[','], [';'], ['\t']];
    for (let i = 0; i < array.length; i += 1) {
      sumbolArray[0].push(array[i].replace(/[^,]/g, '').length);
      sumbolArray[1].push(array[i].replace(/[^;]/g, '').length);
      sumbolArray[2].push(array[i].replace(/[^\t]/g, '').length);
    }
    let foundSymbol;
    let maxQuant = 0;
    for (let i = 0; i < sumbolArray.length; i += 1) {
      let count = 0;
      for (let j = 1; j < sumbolArray[i].length; j += 1) {
        if (sumbolArray[i][j] === sumbolArray[i][1]) count += 1;
      }
      if (sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
      if (sumbolArray[i].length - 1 === count 
        && sumbolArray[i][1] === maxQuant) {
        foundSymbol = sumbolArray[i][0];
      }
    }
    return this.symbolCase(array, foundSymbol);
  }
};

Csv.prototype.symbolCase = function (array, symb) {
  return array.map((item) => item.split(symb));
};

Csv.prototype.generate = function (array, separator) {
  if (array && separator) {
    return array.join(separator);
  } else if (array) {
    for (let j = 0; j < array.length; j += 1) {
      array[j] = array[j].join(',');
    }
    return array.join('\n');
  }
};

function CsvArray() {
}

CsvArray.prototype = Object.create(Array.prototype);

CsvArray.prototype.parse = function (string, separator) {
  let array = string.split('\n');
  if (string && separator) {
    array = this.smCase(array, separator);
    for (let j = 0; j < array.length; j += 1) {
      console.log(array[j]);
      this.push(array[j]);
    }
  } else if (string) {
    const sumbolArray = [[','], [';'], ['\t']];
    for (let i = 0; i < array.length; i += 1) {
      sumbolArray[0].push(array[i].replace(/[^,]/g, '').length);
      sumbolArray[1].push(array[i].replace(/[^;]/g, '').length);
      sumbolArray[2].push(array[i].replace(/[^\t]/g, '').length);
    }
    let foundSymbol;
    let maxQuant = 0;
    for (let i = 0; i < sumbolArray.length; i += 1) {
      let count = 0;
      for (let j = 1; j < sumbolArray[i].length; j += 1) {
        if (sumbolArray[i][j] === sumbolArray[i][1]) count += 1;
      }
      if (sumbolArray[i][1] > maxQuant) maxQuant = sumbolArray[i][1];
      if (
        sumbolArray[i].length - 1 === count 
        && sumbolArray[i][1] === maxQuant
      ) {
        foundSymbol = sumbolArray[i][0];
      }
    }
    array = this.smCase(array, foundSymbol);
    for (let j = 0; j < array.length; j += 1) {
      this.push(array[j]);
    }
  }
};

CsvArray.prototype.generate = function (separator) {
  if (separator) {
    for (let j = 0; j < this.length; j += 1) {
      this[j] = this[j].join(separator);
    }
  } else {
    for (let j = 0; j < this.length; j += 1) {
      this[j] = this[j].join(',');
    }
  }
  return this.join('\n');
};

CsvArray.prototype.smCase = function (ar, s) {
  return ar.map((i) => i.split(s));
};

CsvArray.prototype.getCell = function (exel) {
  const alphabet = ('abcdefghijklmnopqrstuvwxyz').split('');
  for (let j = 0; j < alphabet.length; j += 1) {
    if (alphabet[j] === exel[0].toLocaleLowerCase()) {
      const column = Number(exel.replace(exel[0], ''));
      return this[j][column - 1];
    }
  }
};