# natural-order

### **Sort arrays of strings or objects naturally**

**_Sorting with support for numbers, dates, unicode and more._**

<a id="/features"></a>&nbsp;

- Returns a new list
- Sort an array of string _or_ objects in a natural way
- Allows for sorting by nested objects
- Numbers are handled properly – “2” is before “10”
- Strings are after numbers
- Empty strings are after “z”
- “a” is before “B”
- Semver-compatible sorting of version numbers

<a id="/usage"></a>&nbsp;

## Usage

```javascript
// ES6
import naturalOrder from "natural-order";

// CommonJS
const naturalOrder = require("natural-order");

naturalOrder: (list: any[], 
               sortBy?: string[], 
               orderBy?: 1 | -1 | "asc" | "desc" | ("asc" | "desc")[] | (1 | -1)[], 
               options?: { blankAtTop?: boolean, caseSensitive?: boolean }
              ) => any[]

```

`list: any[]`

any list (strings, numbers, or objects)

`sortBy?: string[]`

The keys by which to sort. May be null. If sorting objects, defaults to the first key it finds.

`orderBy?: 1 | -1 | "asc" | "desc" | ("asc" | "desc")[] | (1 | -1)[]`

Order by which to sort. Defaults to ascending. Enter a value for each key you are using for sorting.
If not enough values are passed, the last provided will be used when they run out.
(example: You may just pass "desc", and all keys will be sorted in descending order.)

The number values 1 and -1 can be used instead of "asc" and "desc", respectively.

`options?: { blankAtTop?: boolean, caseSensitive?: boolean}`

Optional parameters:
- blankAtTop: If true, places null or blank parameters opposite the order option
  - If ascending, null or blank are at the top.
  - If descending, null or blank are at the bottom.
- caseSensitive: If true, capital letters are ranked higher than lowercase.

<a id="/examples"></a>&nbsp;

## Examples

```javascript
const list = ["b", "z", "a"];

naturalOrder(list);

// ["a", "b", "z"]

naturalOrder(list, null, "desc");

// ["z", "b", "a"]

naturalOrder(list, null, -1);

// ["z", "b", "a"]

const list2 = [{ name: "George" }, { name: "Fred" }, { name: "Alice" }];

naturalOrder(list2, ["name"]);

// [{name: "Alice"}, {name: "Fred""}, {name: "George"}]

const list3 = [
  { name: { first: "bob", last: "temple" } },
  { name: { first: "steve", last: "martin" } },
  { name: { first: "george", last: "martin" } },
  { name: { first: "adam", last: "temple" } }
];

naturalOrder(list3, ["name.last", "name.first"]);

// [ { name: { first: 'george', last: 'martin' } },
//   { name: { first: 'steve', last: 'martin' } },
//   { name: { first: 'adam', last: 'temple' } },
//   { name: { first: 'bob', last: 'temple' } } ]

naturalOrder(list3);

// [ { name: { first: 'adam', last: 'temple' } },
//   { name: { first: 'bob', last: 'temple' } },
//   { name: { first: 'george', last: 'martin' } },
//   { name: { first: 'steve', last: 'martin' } } ]

const list4 = ["a", "B"];

naturalOrder(list4, null, "asc", { caseSensitive: true });

// ["B", "a"]

const list5 = ["z", "", "a"];

naturalOrder(list5);

// ["a", "z", ""]

naturalOrder(list5, null, "asc", { blankAtTop: true });

// ["", "a", "z"]

```

<a id="/credits"></a>&nbsp;

## Credits

This project uses code from _[natural-sort](https://github.com/studio-b12/natural-sort)_ for its natural sorting method.

<a id="/license"></a>&nbsp;

## License

This project is MIT Licensed.
