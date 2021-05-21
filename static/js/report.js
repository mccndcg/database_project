const y = Vue.createApp({
  delimiters : ['[[', ']]'],
  data () {
    return {}
  }
})


y.component('reportdoc', {
  mounted() {
    this.student_name = localStorage.getItem("name")
    this.updatedTime = localStorage.getItem("updatedTime")
    this.course = localStorage.getItem("course")
    this.gender = localStorage.getItem("gender")
  },
  data() {
    return {
      student_name: '',
      course: '',
      updatedTime: '',
      gender: ''
    }
  },
  template: `
  <div class="eh">
    <div class="d-flex" style="padding-left:180px;">
        <img src="./static/images/cvsu.png" alt="" class="logo">
        <div style="line-height: 0.3; padding-top:80px; padding-bottom:60px; padding-left: 20px;">
          <div class=" center">
            <p>Republic of the Philippines</p>
            <p style="font-size:20px"><strong>CAVITE STATE UNIVERSITY</strong></p>
            <p><strong>Don Severino de las Alas Campus</strong></p>
            <p style="font-size:15px">Indang, Cavite</p>
          </div>
        </div>
    </div>

    <div style="padding-bottom:50px">
      <p class="center"><strong>COLLEGE OF ENGINEERING AND INFORMATION TECHNOLOGY</strong></p>
    </div>
    <p class="center big"><strong>CERTIFICATION OF GOOD MORAL CHARACTER</strong></p>
    <div class="d-flex justify-content-end" style="padding-right:50px; padding-top:50px"><p class="center">{{updatedTime}}</p>
    </div>
    <div class="content" style="padding-top:50px">
      <p class=""><strong>TO WHOM IT MAY CONCERN:</strong></p>
      <br><br>
      <div class="indent lh-lg"><p>This is to certify that <strong>{{student_name}}</strong> a {{course}} student has shown good moral character.
      She was well-disciplined and had not violated any of the rules and regulations in our College.</p></div>
      <div class="indent lh-lg"><p>This certification is issued upon request of the bearer for whatever legal purpose it may
      serve {{gender}}.</p></div>
    </div>
    <div class="d-flex justify-content-end" style="padding-right:50px; padding-top:50px; line-height: 0.5;">
      <div class="">
        <p class="center">ANDY DIZON</p>
        <p class="center">College Guidance Facilitator</p>
      </div>
    </div>

  </div>`
})
