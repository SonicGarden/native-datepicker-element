export class NativeDatepicker extends HTMLElement {
  static formAssociated = true
  static get observedAttributes() {
    return ['value', 'min', 'max']
  }

  private _internals: ElementInternals
  private _shadow: ShadowRoot

  // eslint-disable-next-line custom-elements/no-constructor
  constructor() {
    super()
    this._internals = this.attachInternals()
    this.attachShadow({mode: 'open'})

    if (!this.shadowRoot) throw new Error('Failed to attach shadowRoot')
    this._shadow = this.shadowRoot
  }

  connectedCallback(): void {
    this.setupStructure()
    this.setupStyles()
    this.input?.addEventListener('change', this.onChange)
  }

  disconnectedCallback(): void {
    this.input?.removeEventListener('change', this.onChange)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (!this.input) return

    switch (name) {
      case 'value': {
        this.input.value = newValue
        this._internals.setFormValue(newValue)
        break
      }
      case 'min': {
        this.input.min = newValue
        break
      }
      case 'max': {
        this.input.max = newValue
        break
      }
    }
  }

  setupStructure() {
    // eslint-disable-next-line github/no-inner-html
    this._shadow.innerHTML = `
      <span>
        <slot></slot>
        <input type="date" />
      </span>
    `

    if (!this.input) throw new Error('Failed to create input element')

    this.input.min = this.getAttribute('min') ?? ''
    this.input.max = this.getAttribute('max') ?? ''
    this.input.value = this.getAttribute('value') ?? ''
  }

  private onChange = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) return

    const value = event.target.value
    this._internals.setFormValue(value)
    this.dispatchEvent(new CustomEvent('change', {detail: value, bubbles: true}))
  }

  private setupStyles() {
    const style = document.createElement('style')

    // SEE: https://github.com/codeclown/native-datepicker/blob/9eb992e85e416764dbf860d6009278831a5a0a42/src/index.js#L92-L120
    // SEE: https://dev.to/codeclown/styling-a-native-date-input-into-a-custom-no-library-datepicker-2in
    style.textContent = `
      :host {
        display: inline-block;
        position: relative;
      }

      input {
        box-sizing: border-box;
        cursor: pointer;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      input::-webkit-calendar-picker-indicator {
        cursor: pointer;
        height: 100%;
        left: 0;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `
    this._shadow.append(style)
  }

  get input(): HTMLInputElement | undefined {
    return this._shadow.querySelector('input') ?? undefined
  }
}

declare global {
  interface Window {
    NativeDatepicker: typeof NativeDatepicker
  }
}

if (!window.customElements.get('native-datepicker')) {
  window.NativeDatepicker = NativeDatepicker
  window.customElements.define('native-datepicker', NativeDatepicker)
}
