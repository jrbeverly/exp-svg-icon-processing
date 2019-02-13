# SVG Icon Processing

## Summary

Experiment with programmatically generating color variants for SVG files using a JSON definition file with the source SVG.

## Usage

The variants of each of the files is defined as a dictionary (`string:object`). The key for the dictionary matches the name of the variant. The `object` defines a collection of `id` and properties. These will be merged into the SVG to generate the variant icon. An example definition file is included below.

```json
{
  "name": "photo",
  "variants": {
    "pink": {
      "outline": {
        "stroke": "#E54E7A"
      },
      "outline_bg": {
        "stroke": "#E54E7A"
      },
      "land": {
        "fill": "#E54E7A"
      },
      "sun": {
        "fill": "#E54E7A"
      }
    },
    "default": {
      "outline": {
        "stroke": "#B35C00"
      },
      "outline_bg": {
        "stroke": "#B35C00"
      },
      "land": {
        "fill": "#3BB300"
      },
      "sun": {
        "fill": "#FFF200"
      }
    }
  }
}
```

The above definition will generate two variants (named `pink` & `default`). For the `pink` variant, the list of SVG elements that match the IDs (`outline`, `outline_bg`, `land`, `sun`) will have the defined properties merged. In this case you would have something like:

```xml
<circle id="sun" cx="23.3" cy="43" r="4.8"></circle>
```

That will add the attribute (`fill=#E54E7A`) to the SVG element.

```xml
<circle id="sun" cx="23.3" cy="43" r="4.8" fill="#E54E7A"/>
```