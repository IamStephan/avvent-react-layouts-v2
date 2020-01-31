# **Avvent studio** presents: <!-- omit in toc -->
## @avvent/react-layouts <!-- omit in toc -->

> A react component library that eases layout creation using css grids and flexbox coupled with a smart box component.

[![NPM](https://img.shields.io/npm/v/@avvent/react-layouts.svg)](https://www.npmjs.com/package/@avvent/react-layouts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of contents <!-- omit in toc -->
- [Install](#install)
- [Breakpoints (Responsive design)](#breakpoints-responsive-design)
  - [Smart Props](#smart-props)
- [Roadmap](#roadmap)
- [License](#license)

## Install
**npm**
```bas
npm install --save @avvent/react-layouts styled-components@^5.0.0 deepmerge@^4.2.2
```

**yarn**
```bas
yarn add @avvent/react-layouts styled-components@^5.0.0 deepmerge@^4.2.2
```

## Breakpoints (Responsive design)
Breakpoints are used by the layout components to determine how the layout should look or behave depending on the device screen size.

> They are also used by  smart props to behave as indented.

**Default breakpoints**

| Name    | Value  |
| :------ | :----: |
| phone   | `425`  |
| tablet  | `768`  |
| laptop  | `1024` |
| desktop | `1440` |

```js
[
  { phone: 425 },
  { tablet: 768 },
  { laptop: 1024 },
  { desktop: 1440 }
]
```

Default breakpoints can be custom (More can be added, removed or changed).

> **NOTE:** All breakpoints apply max-width media query.

### Smart Props

Smart props are used by both the layout components and the box component. They align with the breakpoints defined on the components and follow a `prop-breakpoint` syntax.

Each component will have smart props and will be indicated in their documentation.

> **NOTE:** Props will be ignored if not supplied.



## Roadmap

- [ ] Add universal smart prop (style-*)
- [ ] Add Examples (Storybook?)
- [ ] More in- depth code
- [ ] Add a float layout parent component
- [ ] Setup a showcase website
- [ ] Add more functionality to debug prop
- [ ] Performance optimizations ?
- [ ] Add unit Tests
- [ ] Add gutter prop to Flex component
- [ ] Turn hidden-* to hidden-from-* & hidden-to-*
- [ ] Add helper functions


## License
MIT © [Avvent Studio](https://studio.avvent.io)
