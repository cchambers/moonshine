export default {
  name: 'Nav',
  data() {
    return {
      primaryItems: [{
        name: 'home',
        link: '/',
      },
      {
        name: 'components',
        children: [
          {
            name: 'Component Template',
            link: 'components/component-template'
          }
        ]
      }],
      secondaryItems: [],
    }
  }
}