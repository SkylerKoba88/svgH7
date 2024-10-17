import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

//setting values for alt and color to be able to be referenced within the file
const goalData = [
  { name: 'No Poverty', color: '#e5243b' },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

export class svgComponent extends DDDSuper(LitElement) {

  static get tag() {
    return "svg-component";
  }

  //setting default values of defined properties
  constructor() {
    super();
    this.title = "";
    this.goal = "circle";
    this.label = "";
    //sets image default to the circle logo
    this.image = new URL(`../lib/svgs/goal-circle.svg`, import.meta.url).href;
    this.fancy = false;
    this.color = '#FFFFFF';
    this.colorOnly = false;
    //defines the specific requirements for loading images
    this.loading = 'lazy';
    this.fetchPriority = 'low';
  }

  //defining properties
  static get properties() {
    return {
      title: { type: String },
      goal: {type: String, reflect: true},
      label: {type: String},
      image: {type: String},
      imageSize: {type: Number},
      color: {type: String},
      colorOnly: {type: Boolean, reflect: true},
      loading: {type: String, reflect: true},
      fetchPriority: {type: String, reflect: true}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        //making the display inline-flex to match that of the SDG website
        display: inline-flex;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--svg-component-font-size, var(--ddd-font-size-s));
        --un-svg-component-goal-1: '#e5243b';
        --un-svg-component-goal-2: '#dda63a';
        --un-svg-component-goal-3: '#4c9f38';
        --un-svg-component-goal-4: '#c5192d';
        --un-svg-component-goal-5: '#ff3a21';
        --un-svg-component-goal-6: '#26bde2';
        --un-svg-component-goal-7: '#fcc30b';
        --un-svg-component-goal-8: '#a21942';
        --un-svg-component-goal-9: '#fd6925';
        --un-svg-component-goal-10: '#dd1367';
        --un-svg-component-goal-11: '#fd9d24';
        --un-svg-component-goal-12: '#bf8b2e';
        --un-svg-component-goal-13: '#3f7e44';
        --un-svg-component-goal-14: '#0a97d9';
        --un-svg-component-goal-15: '#56c02b';
        --un-svg-component-goal-16: '#00689d';
        --un-svg-component-goal-17: '#19486a';


      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        
      }
      div {
        display: inline-flex;
        padding: 0px;
        margin: 0;
        width: 254px;
      }
      img {
        width: 254px;
      }
      //adding a .color_only tag to style the div for when there is just a color displayed.
      .color-only {
        width: 254px;
        height: 254px;
      }
    `];
  }
  //updates the properties to their correct values according to the specific goals referenced in HTML
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
    //defines the image URL and label for goal-all (since it is not an integer)

    if (this.goal ==='all') {
      //retrieves the png. If I had more time, I would resize this to fit the whole screen
      this.image = new URL(`../lib/svgs/goal-all.png`, import.meta.url).href;
      this.label = "All of the sustainable development goals"
    } else if (this.goal ==='circle') {
    //defines the image URL and label for the circle label (since it is also not an integer)

      this.image = new URL(`../lib/svgs/goal-circle.svg`, import.meta.url).href;
      this.label = "A logo representing all sustainable development goals"
    } else {
    //defines the image URLS, colors, and labels for all goals that are integers

      const goalNum = parseInt(this.goal);
      this.color = goalData[goalNum -1].color;
      this.image = new URL(`../lib/svgs/goal-${this.goal}.svg`, import.meta.url).href;
      //must specify the indexed value in the array goalData to retrieve .name
      this.label = `${goalData[parseInt(this.goal) - 1].name}`;
    }
    }
  }

  render() {
    //renders only the color as a specified div if color_only is true
    //I can't figure out why this isn't rendering properly. tried manually typing in colors: doesn't work
    if (this.colorOnly) {
      return html `<div class='color-only' style="background-color: ${this.color}"></div>`
    }

    //regular render of each individual component
    return html`
    <div class="wrapper" style="background-color: ${this.color}">
      <div>${this.title}</div>
      ${this.colorOnly ? `` : 
      html`
      <img src=${this.image} alt="${this.label}" fetchpriority='${this.fetchPriority}'>
      `}
    </div>`;
    //not sure why when I declare this in the img tag it won't work:
    //loading="${this.loading}"
    }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
      
  }
  //new URL('./lib/svgs/goal-1.svg', import.meta.url).href
}

globalThis.customElements.define(svgComponent.tag, svgComponent);
