const CONN = 'https://project-database-bunbun.herokuapp.com/'
//const CONN = 'http://127.0.0.1:5000/'

const axios_instance = axios.create({
  baseURL: CONN,
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

x.component('violations-record', {
  props: ['fetchedData'],
  data() {
    return {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  },
  computed: {
    updatedTime() {
      var time = new Date();
      return this.months[time.getMonth()] + ' ' + time.getDate() + ', '+ time.getFullYear()
    },
    gender() {
      if (this.fetchedData.sex === 'Male') {
        return 'him'
      }
      else if (this.fetchedData.sex === 'Female') {
        return 'her'
      }
    }
  },
  methods: {
    open_certificate() {
      localStorage.setItem("gender", this.fetchedData.gender)
      localStorage.setItem("course", this.fetchedData.course)
      localStorage.setItem("name", this.fetchedData.name)
      localStorage.setItem("updatedTime", this.updatedTime)
      window.open(CONN+'certificate')}
  },
  template: `
    <template v-if="fetchedData.violations">
    <p style="text-align: center; padding-top:25px">Actions:</p>
    <div class="d-flex justify-content-center" style="padding-bottom: 25px">
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#violation-form">
      Add Violation
      </button>
    </div>
    <template v-for="violation in fetchedData.violations">
      <div class="container" >
        <div class="row">
          <div class="col">
            <ul class="list-group list-group-flush">
              <li class="list-group-item ital">Date: </li>
              <li class="list-group-item ital">Infraction: </li>
              <li class="list-group-item ital">Details: </li>
            </ul>
          </div>
          <div class="col-10">
            <ul class="list-unstyled">
              <li class="list-group-item">{{violation.date}}</li>
              <li class="list-group-item">{{violation.infraction}}</li>
              <li class="list-group-item">{{violation.details}}</li>
            </ul>
          </div>
        </div>
      </div>
      </template>
    </template>
    <template v-else>
      <div style="padding-top:25px;">
        <p style="text-align: center;">Actions:</p>
        <div class="d-flex justify-content-center" style="margin-bottom: 25px;">
        <button @click="open_certificate" class="btn btn-success" >Download certificate</button>
            </div>
        <div class="d-flex justify-content-center" style="margin-bottom: 50px;">
             <!-- Button trigger modal -->
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#violation-form">
                Add Violation
                </button>

        </div>
      </div>
    </template>
  `
})


x.component('detailPane', {
  data() {
    return {
      this_violations_count: this.violations_count,
      this_fetchedData: this.fetchedData
    }
  },
  mounted() {
    document.querySelector('#form').addEventListener('click', e => {
      axios_instance.post('/fetchData', {'query': localStorage.getItem("name")})
      .then(response => {
        this.this_fetchedData = response.data
        this.this_violations_count = response.data.violations.length
        document.getElementById("toasttext").innerHTML = '<p>Updated record: '+localStorage.getItem("name")+'</p><p>Violation: '+localStorage.getItem("new_violation")+'</p>'
        $('.toast').toast("show")

        })
      .catch(function (error) {console.log(error)})
    })
  },
  watch: {
    fetchedData(a, b) {
      this.this_fetchedData = this.fetchedData
    },
    violations_count(a, b) {
      this.this_violations_count = this.violations_count
      console.log(this.violations_count +   this.this_violations_count )
    }
  },
  props:['fetchedData', 'student_found', 'violations_count'],
  computed: {
    roman_numeral() {
      switch (this.this_fetchedData.year){
        case '1': return 'I -';
        case '2': return 'II -';
        case '3': return 'III -';
        case '4': return 'IV -';
        case '5': return 'V -';
      }
    }
  },
  template:
  `
  <div id="hide2" style="display:none;">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab">Basic Info</button>
          <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab">Violations Record</button>
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
                <li class="list-group-item ital">Violations: </li>
              </ul>
            </div>
            <div class="col-10">
              <ul class="list-unstyled">
                <li class="list-group-item">{{this_fetchedData.name}}</li>
                <li class="list-group-item">{{this_fetchedData.student_number}}</li>
                <li class="list-group-item">{{this_fetchedData.birthday}}</li>
                <li class="list-group-item">{{this_fetchedData.roman_numeral}} {{this_fetchedData.course}}</li>
                <li class="list-group-item">{{this_fetchedData.sex}}</li>
                <li class="list-group-item">{{this_violations_count}}</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel">
          <div style="overflow-y: scroll; height: 50vh; background:white; ">

          <violations-record :fetchedData="this_fetchedData"></violations-record></div>
        </div>
      </div></div>`
})

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
      query: '',
      student_found: false  ,
      student_not_found: true  ,
      violations: '',
      violations_count: 'None'
    }
  },
  template: `
    <div class="card" style="width: 60rem; margin-top: 50px">
      <div class="card-body">
        <img src="./static/images/banner.jpg" class="img-fluid">
        <hr>
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="searchbar" placeholder="Enter name or student number" v-model="query">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="fetchData()">Search</button>
        </div>
        <toast></toast>
        <p class="ital">Test data: Juan dela Cruz, John Smith, 200901010, 200971717</p>
        <error id="hide1" style="display:none" :queryString="query"></error>
        <detailPane :fetchedData="fetchedData" :student_found="student_found" :violations_count="violations_count"></detailPane>
      </div>
    </div>
    `,
  methods: {
    async fetchData() {
      axios_instance.post('/fetchData', {'query': this.query})
      .then(response => {
        this.fetchedData = response.data
        if ('violations' in response.data){
          this.violations_count = response.data.violations.length
        }
        else {
          this.violations_count = 'None'
        }
        this.student_found = true
        var x = document.getElementById('searchbar')
        x.classList.remove('is-invalid')
        x.className += ' is-valid'
        document.getElementById('hide1').style.display = 'none'
        document.getElementById('hide2').style.display = 'block'
        localStorage.setItem("name", this.fetchedData.name)
      })
      .catch(function (error) {
        var x =  document.getElementById('searchbar')
        x.classList.remove('is-valid')
        x.className += ' is-invalid'
        this.student_found = false
        document.getElementById('hide1').style.display = 'block'
        document.getElementById('hide2').style.display = 'none'

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
