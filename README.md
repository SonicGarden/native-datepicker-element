# &lt;native-datepicker&gt; element

Custom Element for a lightweight, library-free datepicker that enhances native date inputs with modern styling and extended functionality.
Easy to integrate and customize, this solution provides a seamless user experience without additional dependencies.

## Installation

```
$ npm install --save @sonicgarden/native-datepicker-element
```

## Usage

### Example

```js
import '@sonicgarden/native-datepicker-element'
```


```html
<form>
  <native-datepicker name="date" value="2024-08-10" min="2024-08-01" max="2024-08-31">
    <span class="calendar-icon"></span>
  </native-datepicker>
</form>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].
- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## License

Distributed under the MIT license. See LICENSE for details.
