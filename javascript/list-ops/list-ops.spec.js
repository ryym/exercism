var List = require('./list-ops');

describe('List', function () {
  // predicates to filter by & functions to map
  var isOdd = function (x) {
    return x % 2 === 1;
  }

  var plusOne = function (x) {
    return x + 1;
  };

  var divide = function (x, acc) {
    return x / acc;
  };

  describe('append', function () {
    it('appends two empty lists', function () {
      var emptyList = new List();
      expect(emptyList.append(emptyList).values).toEqual([]);
    });

    it('appends an empty list to a non-empty list', function () {
      var emptyList = new List();
      var nonEmptyList = new List([1, 2, 3, 4]);
      expect(emptyList.append(nonEmptyList).values).toEqual([1, 2, 3, 4]);
    });

    xit('appends two non-empty lists', function () {
      var list1 = new List([1, 2]);
      var list2 = new List([2, 3, 4, 5]);
      expect(list1.append(list2).values).toEqual([1, 2, 2, 3, 4, 5]);
    });
  });

  describe('concat', function () {
    it('concatenates an empty list', function () {
      var emptyList = new List();
      expect(emptyList.concat(emptyList).values).toEqual([]);
    });

    it('concatenates a list of lists', function () {
      var list1 = new List([1, 2]);
      var list2 = new List([3]);
      var list3 = new List([]);
      var list4 = new List([4, 5, 6]);
      expect(list1
        .concat(list2)
        .concat(list3)
        .concat(list4).values
      ).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('filter', function () {
    it('filters an empty list by a function', function () {
      var list = new List();
      expect(list.filter(isOdd).values).toEqual([]);
    });

    it('filters a non-empty list by a function', function () {
      var list = new List([1, 2, 3, 5]);
      expect(list.filter(isOdd).values).toEqual([1, 3, 5]);
    });
  });

  describe('length', function () {
    it('finds the length of a empty list', function () {
      var list = new List();
      expect(list.length()).toEqual(0);
    });

    it('finds the length of a non-empty list', function () {
      var list = new List([1, 2, 3, 4]);
      expect(list.length()).toEqual(4);
    });
  });

  describe('map', function () {
    it('maps a function over an empty list', function () {
      var list = new List([]);
      expect(list.map(plusOne).values).toEqual([]);
    });

    it('maps a function over a non-empty list', function () {
      var list = new List([1, 3, 5, 7]);
      expect(list.map(plusOne).values).toEqual([2, 4, 6, 8]);
    });
  });

  describe('foldl', function () {
    it('folds an empty list from the left with the given function', function () {
      var list = new List([]);
      expect(list.foldl(divide, 2)).toEqual(2);
    });

    it('folds a non-empty list from the left with the given function', function () {
      // 1 / 24 = 1/24
      // 2 / 1/24 = 48
      // 3 / 48 = 1/16
      // 4 / 1/16 = 64
      var list = new List([1, 2, 3, 4]);
      expect(list.foldl(divide, 24)).toEqual(64);
    });
  });

  describe('foldr', function () {
    it('folds an empty list from the right with the given function', function () {
      var list = new List([]);
      expect(list.foldr(divide, 2)).toEqual(2);
    });

    it('folds a non-empty list from the right with the given function', function () {
      // 4 / 24 = 1/6
      // 3 / 1/6 = 18
      // 2 / 18 = 1/9
      // 1 / 1/9 = 9
      var list = new List([1, 2, 3, 4]);
      expect(list.foldr(divide, 24)).toEqual(9);
    });
  });

  describe('reverse', function () {
    it('reverses an empty list', function () {
      var list = new List([]);
      expect(list.reverse().values).toEqual([]);
    });

    it('reverses a non-empty list', function () {
      var list = new List([1, 3, 5, 7]);
      expect(list.reverse().values).toEqual([7, 5, 3, 1]);
    });
  });

  // XXX:
  // beforeAll is added on Jasmine 2.0
  // but jasmine-node doesn't support 2.0 yet.
  describe('must not call native Array function', function () {
    // var list = new List([1, 2, 3, 4]);
    // var list2 = new List([5, 1]);

    // beforeAll(function () {
    //   spyOn(list.values, 'map').and.callThrough();
    //   spyOn(list.values, 'filter').and.callThrough();
    //   spyOn(list.values, 'reduce').and.callThrough();
    //   spyOn(list.values, 'reduceRight').and.callThrough();
    //   spyOn(list.values, 'reverse').and.callThrough();
    //   spyOn(list.values, 'concat').and.callThrough();

    //   list.length();
    //   list.append(list2);
    //   list.concat(list2);
    //   list.reverse();
    //   list.filter(isOdd);
    //   list.map(plusOne);
    //   list.foldl(divide, 24);
    //   list.foldr(divide, 24);
    // });

    // xit('Array.prototype.map()', function () {
    //   expect(list.values.map).not.toHaveBeenCalled();
    // });
    // xit('Array.prototype.filter()', function () {
    //   expect(list.values.filter).not.toHaveBeenCalled();
    // });
    // xit('Array.prototype.reduce()', function () {
    //   expect(list.values.reduce).not.toHaveBeenCalled();
    // });
    // xit('Array.prototype.reduceRight()', function () {
    //   expect(list.values.reduceRight).not.toHaveBeenCalled();
    // });
    // xit('Array.prototype.concat()', function () {
    //   expect(list.values.concat).not.toHaveBeenCalled();
    // });
    // xit('Array.prototype.reverse()', function () {
    //   expect(list.values.reverse).not.toHaveBeenCalled();
    // });
  });
});
