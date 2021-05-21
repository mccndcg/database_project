

const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    }
});

const x = Vue.createApp({
  delimiters : ['[[', ']]'],
  data () {
    return {
      cards: 0
    }
  }
})

x.component('testing', {
  template: `<p>TESTING</p>`
  }
)

x.component('search-form', {
  data() {
    return {
      fetchedData: '',
      name: '',
      student_number: '',
      birthday: '',
      year: '',
      course: '',
      sex: '',
      query: ''
    }
  },
  template: `
    <div class="card" style="width: 60rem; margin-top: 50px">
      <div class="card-body">
        <img src="./static/images/banner.jpg" class="img-fluid">
        <p class="card-text">A quick-and-dirty job towards a directory for students of Cavite State Univerity. Draft stage.</p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="searchbar" placeholder="Enter name or student number" v-model="query">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="fetchData()">Search</button>
        </div>
        <p class="ital">Test data: Kacy Duligal, Denni McOwen, 198226446, 200255451</p>
        <error :queryString="query" id='error' style="display: none"></error>
        <div id='hider' style="display: none">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab">Basic Info</button>
              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab">Student Record</button>
              <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab">Good Moral</button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel">
            <div class="container" style="margin-top: 25px">
              <div class="row">
                <div class="col">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item ital">Name: </li>
                    <li class="list-group-item ital">Student #: </li>
                    <li class="list-group-item ital">Age: </li>
                    <li class="list-group-item ital">Year, course:</li>
                    <li class="list-group-item ital">Sex: </li>
                  </ul>
                </div>
                <div class="col-10">
                  <ul class="list-unstyled">
                    <li class="list-group-item">{{name}}</li>
                    <li class="list-group-item">{{student_number}}</li>
                    <li class="list-group-item">{{birthday}}</li>
                    <li class="list-group-item">{{year}} {{course}}</li>
                    <li class="list-group-item">{{sex}}</li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel">...</div>
            <div class="tab-pane fade" id="nav-contact" role="tabpanel">...</div>
          </div>
        </div>
      </div>
    </div>
    `,
  methods: {
    async fetchData() {
      axios_instance.post('/fetchData', {'query': this.query})
      .then(response => {
        this.show = true
        this.fetchedData = response.data
        this.name = response.data.name
        this.student_number = response.data.student_number
        this.birthday = response.data.birthday
        this.year = response.data.year
        this.course = response.data.course
        this.sex = response.data.sex
        var x = document.getElementById('searchbar')
        x.classList.remove('is-invalid')
        x.className += ' is-valid'
        document.getElementById('error').style.display = 'none'
        document.getElementById('hider').style.display = 'block'
      })
      .catch(function (error) {
        var x =  document.getElementById('searchbar')
        x.classList.remove('is-valid')
        x.className += ' is-invalid'
        document.getElementById('error').style.display = 'block'
        document.getElementById('hider').style.display = 'none'

      })
    }
  }
})

x.component('error', {
  props: ['queryString'],
  template: `
    <div style="margin: 50px 30px 50px">
    <p style="color: red"><img style="height: 36px; width: 36px;" src = './static/images/warning.png'>   No information regarding search value '{{queryString}}'.</p>
    </div>
  `
})