const x = Vue.createApp({
  delimiters : ['[[', ']]'],
  data () {
    return {
      cards: 0
    }
  }
})

const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    }
});

x.component('return-text', {
  data() {
    return {
      grr: 'socks'
    }
  },
  template: `
    <p>{{grr}}</p>`
})

x.component('myimg', {
  emits: ['inneremit'],
  props: ['countthat'],
  data() {
    return {
      imgArray: [],
      imgLength: 0,
      testArray: [0,1,2,3,4,5]
    }
  },
  template:
    `<div>
      <p>inner {{countthat}}</p>
      <button @click="emitter">XXX</button>
    </div>`,
  // render() {
  //     // const cardImages = Vue.h('img', {'src': '/static/image/01DE001.png', 'alt': 'yey'})
  //     return Vue.h('')
  // }
  methods: {
    setLength(imgLength) {
      this.imgLength = imgLength,
      console.log(imgLength)
    },
    emitter() {
      console.log('emits')
      this.$emit("inneremit", 100)
    }
  }
})


x.component('button-counter', {
  emits: ['fetchedData'],
  data() {
    return {
      cardsArray: [],
      countthis: 6,
      count: 1,
      cardamount: [1,2,3,4,5,6],
      xxx: [1,2,3,4,5,6]
    }
  },
  template: `
    <div>
      <ul v-for="num in cardsArray">
        <li>{{num}}</li>
      </ul>
      card amount = {{cardamount}}
      <button @click="fetchCards(), testclick()">
        fetchCards {{count}}
      </button>
      <myimg :countthat="countthis" @inneremit="setcount"></myimg>
    </div>`,
  watch: {
    cardamount(newval) {
      console.log('cardamount changed')
    }
  },
  methods: {
    setcount(val) {
      console.log('outeremit')
      this.countthis = val
      console.log(this.cardsArray)
    },
    testclick() {
      console.log('enter testclick')
      this.$emit('fetchedData', 5)
      // this.count += 1,
      // this.countthis += 1,
    },
    async fetchCards() {
        axios_instance.post('/get_cards',
                [{'attribute': 'region', 'value': 'Ionia', 'operator': '='}
                ,{'attribute': 'cost', 'value': 3, 'operator': '>'}]
              )
        .then(response => {
          this.cardsArray = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
})





const AsyncComp = Vue.defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)


x.component('async-component', AsyncComp)
