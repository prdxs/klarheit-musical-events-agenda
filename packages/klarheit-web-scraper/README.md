# Mole web scraper

Mole web scraper for the browser is a standalone library designed thinking about
general-purpose web scraping. It uses a flexible data structure as an input that
determines what information must be extracted from the web page. 

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Prerequisites

You'll need to download and install [Node.js](https://nodejs.org/) that comes
with npm. Right now I'm using Node.js v8.9.3 that comes with npm v5.6.0 but
there should be no problems if using newer versions of Node.js (if so please
fill an issue).

### Installing

To install the dependencies

```
npm install
```

### Building

To generate a bundle in `dist/bundle.js`

```
npm run build
```

Or, while developing, to watch the files and rebunble each that you are save
changes

```
npm run watch
```

## Documentation

### Extraction Query Data Structure

To keep it simple, the extraction query data structure will be explained using
the same types that are declared in Typescript typing notation in the `src`
code.

There are three basic types in which the query data structure is built on

```typescript
type CSSSelector = string;

type AttributeName = string;

const enum SelectionType {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE'
}
```

Thus, an extraction query can convey three types of extraction

```typescript
type ExtractionQuery = AttributeExtractionQuery | ObjectExtractionQuery | ArrayExtractionQuery;
```

#### Example

For the sake of explanation let's consider the following HTML

```html
<body>
  <div class="entry">
    <h1>Title 1</h1>
    <h2 alt="Alternative subtitle 1">Subtitle 1</h2>
    <div class="content">
      <p class="price">10</p>
      <a href="http://link.to.buy/1">Buy</a>
    </div>
  </div>
  <div class="entry">
    <h1>Title 2</h1>
    <h2 alt="Alternative subtitle 2">Subtitle 2</h2>
    <div class="content">
      <p class="price">12</p>
      <a href="http://link.to.buy/2">Buy</a>
    </div>
  </div>
</body>
```

#### Attribute Extraction

If we only want to extract piece of information saved in the attribute inside a
DOM element we will have to indicate it with a CSS selector and an attribute
name

```typescript
type AttributeExtractionQuery = {
  selector?: CSSSelector;
  type?: SelectionType.Single;
  query?: AttributeName;
}
```
*__Note:__ If the selector is not specified the root node will be used.*

*__Note:__ Bare in mind that attribute extractions can only have selection type `SelectionType.Single` but because of the seamless nature of the extraction query data
structure an array extraction of several attributes will only differ from the
selection type. If the extraction type is not specified it will be resolved to
`SelectionType.Single`*

*__Note:__ If the query is not specified the default attribute from the current
extraction node will be selected.*

An example could be

```javascript
const extractionQuery = {
  selector: 'div.entry > h1'
};
/* will be resolved into:
{
  selector: 'div.entry > h1',
  type: 'SINGLE',
  query: 'innerText'
};*/
```

The returned result would be the first title found in the web page
```javascript
const extractionResult = new Mole(document, extractionQuery).extract();
// Result: 'Title 1'
```

#### Object Extraction

If we want to extract different pieces of information of a whole into a
Javascript object we have to indicate a CSS selector, the selection type, and a
query descriptor.

```typescript
interface ObjectExtractionQuery {
  selector?: CSSSelector;
  type?: SelectionType.Single;
  query: ExtractionQueryDescriptor;
}
```
*__Note:__ The `selector` is optional, if not provided the root node will be
used for the extraction. Also, if no `SelectorType` indicated, it defaults to
`SelectorType.Single`*

*__Note:__ Bare in mind that attribute extractions can only have selection type `SelectionType.Single` but because of the seamless nature of the extraction query data
structure an array extraction of several objects will only differ from the
selection type. If the extraction type is not specified it will be resolved to
`SelectionType.Single`*

Object extractions introduce a new inner data structure called
`ExtractionQueryDescriptor` which come in two ways: as an
`AttributeExtractionQueryDescriptor` which is a `AttributeName` to be extracted,
or as an `ObjectExtractionQueryDescriptor` which is a key-value map that is used
to set a name to a piece of information. __These pieces of information can be
retrieved by an inner, nested `ExtractionQuery` themselves__.

```typescript
type ExtractionQueryDescriptor =
  AttributeExtractionQueryDescriptor | ObjectExtractionQueryDescriptor;

type AttributeExtractionQueryDescriptor = AttributeName;

interface ObjectExtractionQueryDescriptor {
  [key: string]: ExtractionQuery;
}
```

An example could be

```javascript
const extractionQuery = {
  selector: 'div.entry',
  // type: SelectionType.Single (resolved)
  query: {
    title: {
      selector: 'h1',
      // type: SelectionType.Single (resolved)
      // query: 'innerText' (resolved)
    }
    subtitle: {
      selector: 'h2',
      // type: SelectionType.Single (resolved)
      query: 'alt'
    }
  }
};
```

The returned result would be the first title and subtitle from the first entry
with the custom `alt` attribute for the subtitle

```javascript
const extractionResult = new Mole(document, extractionQuery).extract();
/* Result:
{
  title: 'Title 1',
  subtitle: 'Alternative subtitle 1'
}*/
```

Another example with an inner, nested `ExtractionQuery` could be

```javascript
const extractionQuery = {
  selector: 'div.entry',
  // type: SelectionType.Single (resolved)
  query: {
    title: {
      selector: 'h1',
      // type: SelectionType.Single (resolved)
      // query: 'innerText' (resolved)
    },
    subtitle: {
      selector: 'h2',
      // type: SelectionType.Single (resolved)
      // query: 'innerText' (resolved)
    },
    content: {
      selector: '.content',
      query: {
        price: {
          selector: '.price',
          // type: SelectionType.Single (resolved)
          // query: 'innerText' (resolved)
        },
        link: {
          selector: 'a',
          // type: SelectionType.Single (resolved)
          // query: 'innerText' (resolved)
        }
      }
    }
  }
};
```
*__Note:__ The default attribute used for the extraction on anchor elements is
`href` instead of `innerText`*

In this case the result will include a `content` key containing both
`price` and `link` key/values

```javascript
const extractionResult = new Mole(document, extractionQuery).extract();
/* Result:
{
  title: 'Title 1',
  subtitle: 'Subtitle 1',
  content: {
    price: '10',
    link: 'http://link.to.buy/1'
  }
}*/
```

#### Array Extraction

Most of the cases in web scraping we want to extract an array of repeated
data entries that can be pieces of information alone or a group of information.
To do so we have to indicate a CSS selector, the
selection type, and a query descriptor. The selection type will always be
`SelectionType.Multiple` because it would be an attribute or an object
extraction otherwise.

```typescript
interface ArrayExtractionQuery {
  selector: CSSSelector;
  type: SelectionType.Multiple;
  query?: ExtractionQueryDescriptor;
}
```

The extractor in charge of extracting these queries is called `ArrayExtractor`
and it serves as a previous step to object extraction queries or attribute
extraction queries. It creates a new `Mole` instance for each one of those
nodes selected by the provided CSS selector regardless of the type of query
descriptor provided. Afterthat, each one of those `Mole` instances are in
charge of selecting the extractor that will do the work whether it is
`AttributeExtractor` or `ObjectExtractor`.

An example could be

```javascript
const extractionQuery = {
  selector: 'div.entry',
  type: 'MULTIPLE',
  query: {
    title: {
      selector: 'h1',
      // type: SelectionType.Single (resolved)
      // query: 'innerText' (resolved)
    },
    subtitle: {
      selector: 'h2',
      // type: SelectionType.Single (resolved)
      // query: 'innerText' (resolved)
    },
  }
};
```

The returned result would be the first title and subtitle from all the entries

```javascript
const extractionResult = new Mole(document, extractionQuery).extract();
/* Result:
[
  {
    title: 'Title 1',
    subtitle: 'Subtitle 1'
  },
  {
    title: 'Title 2',
    subtitle: 'Subtitle 2'
  },
]*/
```

## Built With

* [Webpack](https://webpack.js.org/) - Static module bundler
* [Typescript](https://www.typescriptlang.org/) - A typed superset of Javascript


## Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available,
see the
[tags on this repository](https://github.com/prdxs/mole-web-scraper/tags). 

## Authors

* **prdxs (Rubén Fernández)** - *Initial work* - [prdxs](https://github.com/prdxs)

See also the list of [contributors](https://github.com/prdxs/mole-web-scraper/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
