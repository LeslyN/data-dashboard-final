window.addEventListener('load', function() {
/* TABS */
  var tabs = document.querySelectorAll('.tab');
  var overviewSection = document.querySelector('#overview');
  var studentsSection = document.querySelector('#students');
  var teachersSection = document.querySelector('#teachers');

  function showTab(event) {
    var tab = event.target.textContent;
    switch (true) {
    case (tab === 'Overview'):
      overviewSection.classList.remove('display-none');
      studentsSection.classList.add('display-none');
      teachersSection.classList.add('display-none');
      break;
    case (tab === 'Students'):
      overviewSection.classList.add('display-none');
      studentsSection.classList.remove('display-none');
      teachersSection.classList.add('display-none');
      break;
    case (tab === 'Teachers'):
      overviewSection.classList.add('display-none');
      studentsSection.classList.add('display-none');
      teachersSection.classList.remove('display-none');
      break;
    default:
      overviewSection.classList.add('display-none');
      studentsSection.classList.add('display-none');
      teachersSection.classList.add('display-none');
      break;
    }
  }

  for (var i = 0;i < tabs.length;i++) {
    tabs[i].addEventListener('click', showTab);
  }

  /* Sedes y Generación */
  // Arequipa
  var dataA2017I = document.getElementById('dataA_2017I');
  var dataA2016II = document.getElementById('dataA_2016II');
  // México
  var dataM2017I = document.getElementById('dataM_2017I');
  var dataM2017II = document.getElementById('dataM_2017II');
  // Lima
  var dataL2017I = document.getElementById('dataL_2017I');
  var dataL2017II = document.getElementById('dataL_2017II');
  var dataL2016II = document.getElementById('dataL_2016II');
  // Chile
  var dataC2017I = document.getElementById('dataC_2017I');
  var dataC2017II = document.getElementById('dataC_2017II');
  var dataC2016II = document.getElementById('dataC_2016II');
  resultSede('LIM', '2017-2');

  dataA2017I.addEventListener('click', function() {
    resultSede('AQP', '2017-1');
  });
  dataA2016II.addEventListener('click', function() {
    resultSede('AQP', '2016-2');
  });
  dataM2017I.addEventListener('click', function() {
    resultSede('CDMX', '2017-1');
  });
  dataM2017II.addEventListener('click', function() {
    resultSede('CDMX', '2017-2');
  });
  dataL2017I.addEventListener('click', function() {
    resultSede('LIM', '2017-1');
  });
  dataL2017II.addEventListener('click', function() {
    resultSede('LIM', '2017-2');
  });
  dataL2016II.addEventListener('click', function() {
    resultSede('LIM', '2016-2');
  });
  dataC2017I.addEventListener('click', function() {
    resultSede('SCL', '2017-1');
  });
  dataC2017II.addEventListener('click', function() {
    resultSede('SCL', '2017-2');
  });
  dataC2016II.addEventListener('click', function() {
    resultSede('SCL', '2016-2');
  });


  /* Funciones que obtienen información */
  function resultSede(branch, generation) {
    var title = document.querySelector('.title-principal');
    title.textContent = branch + ' Generation : ' + generation ; 
    enrollment(branch, generation);
    achievement(branch, generation);
    nps(branch, generation);
    jediMasterRating(branch, generation); // Lorena
    teacherRating(branch, generation); // Claudia
    satisfaction(branch, generation); // Eleyne
    showTech(branch, generation);
    showHse(branch, generation);


    studentFilter(branch, generation);
  };
  /* funciones*/

  function showTech(branch, generation) {
    var select = document.querySelector('.sprint');
    var tech = document.querySelector('.tech');
    var percentageTech = document.querySelector('.percentage-tech');
    var percent;
    
    // inicializa
    tech.textContent = techSkills(branch, generation)[1];
    percentageTech.textContent = ((techSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
    percent = ((techSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
    if (percent >= 80) {
      percentageTech.classList.add('green');
      percentageTech.classList.remove('red');
      percentageTech.classList.remove('orange');
    } else if (percent < 80 && percent >= 70) {
      percentageTech.classList.add('orange');
      percentageTech.classList.remove('red');
      percentageTech.classList.remove('green');
    } else if (percent < 70) {
      percentageTech.classList.add('red');
      percentageTech.classList.remove('green');
      percentageTech.classList.remove('orange');
    }
   
    
    $(document).ready(function() {
      var datos8 = {
        type: 'bar',
        data: {
          datasets: [{
            data: [
              ((techSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1),
              ((techSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1),
              ((techSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1),
              ((techSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1),
            ],
            backgroundColor: [
              '#ffc107',
              '#ffc107',
              '#ffc107',
              '#ffc107',
            ]
          }],
          labels: [
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas8 = document.getElementById('canvas-tech').getContext('2d');
      window.pie = new Chart(canvas8, datos8);
    });
    select.addEventListener('change', function(event) {
      if (select.value === 'v1') {
        tech.textContent = techSkills(branch, generation)[0];
        percentageTech.textContent = ((techSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1);
        // semaforo de colores
        percent = ((techSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageTech.classList.add('green');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageTech.classList.add('orange');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('green');
        } else if (percent < 70) {
          percentageTech.classList.add('red');
          percentageTech.classList.remove('green');
          percentageTech.classList.remove('orange');
        }
      }
      if (select.value === 'v2') {
        tech.textContent = techSkills(branch, generation)[1];
        percentageTech.textContent = ((techSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
        percent = ((techSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageTech.classList.add('green');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageTech.classList.add('orange');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('green');
        } else if (percent < 70) {
          percentageTech.classList.add('red');
          percentageTech.classList.remove('green');
          percentageTech.classList.remove('orange');
        }
      }
      if (select.value === 'v3') {
        tech.textContent = techSkills(branch, generation)[2];
        percentageTech.textContent = ((techSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1);
        percent = ((techSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageTech.classList.add('green');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageTech.classList.add('orange');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('green');
        } else if (percent < 70) {
          percentageTech.classList.add('red');
          percentageTech.classList.remove('green');
          percentageTech.classList.remove('orange');
        }
      }
      if (select.value === 'v4') {
        tech.textContent = techSkills(branch, generation)[3];
        percentageTech.textContent = ((techSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1);
        percent = ((techSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageTech.classList.add('green');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageTech.classList.add('orange');
          percentageTech.classList.remove('red');
          percentageTech.classList.remove('green');
        } else if (percent < 70) {
          percentageTech.classList.add('red');
          percentageTech.classList.remove('green');
          percentageTech.classList.remove('orange');
        }
      }
    });
  }

  function showHse(branch, generation) {
    var select = document.querySelector('.sprintHSE');
    var hse = document.querySelector('.hse');
    var percentageHse = document.querySelector('.percentage-hse');
    var percent;
    // inicializa
    hse.textContent = hseSkills(branch, generation)[1];
    percentageHse.textContent = ((hseSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
    percent = ((hseSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
    if (percent >= 80) {
      percentageHse.classList.add('green');
      percentageHse.classList.remove('red');
      percentageHse.classList.remove('orange');
    } else if (percent < 80 && percent >= 70) {
      percentageHse.classList.add('orange');
      percentageHse.classList.remove('red');
      percentageHse.classList.remove('green');
    } else if (percent < 70) {
      percentageHse.classList.add('red');
      percentageHse.classList.remove('green');
      percentageHse.classList.remove('orange');
    }
    
    $(document).ready(function() {
      var datos9 = {
        type: 'bar',
        data: {
          datasets: [{
            data: [
              ((hseSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1),
              ((hseSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1),
              ((hseSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1),
              ((hseSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1),
            ],
            backgroundColor: [
              '#00BFFF',
              '#00BFFF',
              '#00BFFF',
              '#00BFFF',
            ]
          }],
          labels: [
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas9 = document.getElementById('canvas-life').getContext('2d');
      window.pie = new Chart(canvas9, datos9);
    });
    
    select.addEventListener('change', function(event) {
      if (select.value === 'v1') {
        hse.textContent = hseSkills(branch, generation)[0];
        percentageHse.textContent = ((hseSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1);
        percent = ((hseSkills(branch, generation)[0] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageHse.classList.add('green');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageHse.classList.add('orange');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('green');
        } else if (percent < 70) {
          percentageHse.classList.add('red');
          percentageHse.classList.remove('green');
          percentageHse.classList.remove('orange');
        }
      }
      if (select.value === 'v2') {
        hse.textContent = hseSkills(branch, generation)[1];
        percentageHse.textContent = ((hseSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
        percent = ((hseSkills(branch, generation)[1] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageHse.classList.add('green');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageHse.classList.add('orange');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('green');
        } else if (percent < 70) {
          percentageHse.classList.add('red');
          percentageHse.classList.remove('green');
          percentageHse.classList.remove('orange');
        }
      }
      if (select.value === 'v3') {
        hse.textContent = hseSkills(branch, generation)[2];
        percentageHse.textContent = ((hseSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1);
        percent = ((hseSkills(branch, generation)[2] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageHse.classList.add('green');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageHse.classList.add('orange');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('green');
        } else if (percent < 70) {
          percentageHse.classList.add('red');
          percentageHse.classList.remove('green');
          percentageHse.classList.remove('orange');
        }
      }
      if (select.value === 'v4') {
        hse.textContent = hseSkills(branch, generation)[3];
        percentageHse.textContent = ((hseSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1);
        percent = ((hseSkills(branch, generation)[3] / active(branch, generation)) * 100).toFixed(1);
        if (percent >= 80) {
          percentageHse.classList.add('green');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('orange');
        } else if (percent < 80 && percent >= 70) {
          percentageHse.classList.add('orange');
          percentageHse.classList.remove('red');
          percentageHse.classList.remove('green');
        } else if (percent < 70) {
          percentageHse.classList.add('red');
          percentageHse.classList.remove('green');
          percentageHse.classList.remove('orange');
        }
      }
    });
  }
  

  function enrollment(branch, generation) {
    var boxStudentsActive = document.querySelector('.students-active');
    var percentageDropout = document.querySelector('.percentage-dropout'); 
    
    
    var totalStudents = data[branch][generation]['students'].length; // 15
    
    var percentageActive = ((active(branch, generation)) * (100 / (totalStudents))).toFixed(1);
    var percentageInactive = ((inactive(branch, generation)) * (100 / (totalStudents))).toFixed(1);
    percentageDropout.classList.add('red');
    
    boxStudentsActive.textContent = active(branch, generation);
    percentageDropout.textContent = percentageInactive;
    $(document).ready(function() {
      var datos2 = {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              ((active(branch, generation)) * (100 / (totalStudents))).toFixed(1),
              ((inactive(branch, generation)) * (100 / (totalStudents))).toFixed(1)
            ],
            backgroundColor: [
              '#01DF74',
              '#FE2E2E',
            ]
          }],
          labels: [
            'active',
            'dropout',
            
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas2 = document.getElementById('canvas-enrollment').getContext('2d');
      window.pie = new Chart(canvas2, datos2);
    });
  }
  
  function active(branch, generation) {
    var students = data[branch][generation]['students'];
    var active = 0;
    for (var i = 0; i < students.length; i++) {
      // true o false
      if (students[i]['active'] == true) {
        active++;
      }
    }
    return active;
  };

  function inactive(branch, generation) {
    var students = data[branch][generation]['students'];
    var inactive = 0;
    for (var i = 0; i < students.length; i++) {
      // true o false
      if (students[i]['active'] == false) {
        inactive++;
      }
    }
    return inactive;
  };

  // LIzbeth
  // Función para crear y añadir el # y % de estudiantes que superan la meta de puntos en promedio de todos los sprints cursado
  function achievement(branch, generation) {
    // Crea y agrega el # de estudiantes que superan la meta en HSE y Tech
    var goldenStudentsParagraph = document.querySelector('.golden-students');
    goldenStudentsParagraph.textContent = studentAchievement(branch, generation);
    // Crea y agrega el % de estudiantes que superan la meta en HSE y Tech
    var percentageGoldenStudentsParagraph = document.querySelector('.percentage-golden');
    percentageGoldenStudentsParagraph.textContent = percentageGoldenStudents(branch, generation) ;
    // Semaforo de colores
    var percent = percentageGoldenStudents(branch, generation) ;
    if (percent >= 80) {
      percentageGoldenStudentsParagraph.classList.add('green');
      percentageGoldenStudentsParagraph.classList.remove('red');
      percentageGoldenStudentsParagraph.classList.remove('orange');
    } else if (percent < 80 && percent >= 70) {
      percentageGoldenStudentsParagraph.classList.add('orange');
      percentageGoldenStudentsParagraph.classList.remove('red');
      percentageGoldenStudentsParagraph.classList.remove('green');
    } else if (percent < 70) {
      percentageGoldenStudentsParagraph.classList.add('red');
      percentageGoldenStudentsParagraph.classList.remove('green');
      percentageGoldenStudentsParagraph.classList.remove('orange');
    }

    
    $(document).ready(function() {
      var datos3 = {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              percentageGoldenStudents(branch, generation),
              100 - percentageGoldenStudents(branch, generation),
            ],
            backgroundColor: [
              '#01DF74',
              '#FE2E2E',
            ]
          }],
          labels: [
            'Student goal ',
            'Student No goal ',
        
            
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas3 = document.getElementById('canvas-achievement').getContext('2d');
      window.pie = new Chart(canvas3, datos3);
    });
  };

  // Función para calcular el # de estudiantes que superan la meta de 70% de puntos en HSE y Tech
  function studentAchievement(branch, generation) {
    var students = data[branch][generation]['students'];
    var allScoresAverageArr = [];

    for (i = 0; i < students.length; i++) {
      var sumTechScores = 0;
      var sumHseScores = 0;
      if (students[i].active === true) {
        var numSprint = students[i].sprints.length;
        for (j = 0; j < numSprint; j++) {
          var pointsTech = students[i].sprints[j].score.tech;
          var pointsHSE = students[i].sprints[j].score.hse;
          sumTechScores += pointsTech;
          sumHseScores += pointsHSE;
        }
        var averageTech = sumTechScores / numSprint;
        var averageHSE = sumHseScores / numSprint;
        allScoresAverageArr.push([averageTech, averageHSE]);
      }
    }
    var studentsReachingGoal = 0;
    for (k = 0 ; k < allScoresAverageArr.length ;k++) {
      if (allScoresAverageArr[k][0] >= 1260 && allScoresAverageArr[k][1] >= 840) {
        studentsReachingGoal ++;
      }
    }
    return studentsReachingGoal;
  }

  function percentageGoldenStudents(branch, generation) {
    var percentageGoldenStudent = ((studentAchievement(branch, generation) / active(branch, generation)) * 100).toFixed(1);
    return percentageGoldenStudent;
  }
  // FIn Lizbeth

  function nps(branch, generation) {
    var netPromoter = document.querySelector('.net-promoter-score');
    netPromoter.textContent = (averageNet(branch, generation)).toFixed(1);

    // Semaforo de colores
    var percent = (averageNet(branch, generation)).toFixed(1) ;
    if (percent >= 80) {
      netPromoter.classList.add('green');
      netPromoter.classList.remove('red');
      netPromoter.classList.remove('orange');
    } else if (percent < 80 && percent >= 70) {
      netPromoter.classList.add('orange');
      netPromoter.classList.remove('red');
      netPromoter.classList.remove('green');
    } else if (percent < 70) {
      netPromoter.classList.add('red');
      netPromoter.classList.remove('green');
      netPromoter.classList.remove('orange');
    }


    var averageSprintPromoters = document.querySelector('.average-promoters');
    averageSprintPromoters.textContent = averagePromoters(branch, generation);
    var averageSprintPassive = document.querySelector('.average-passive');
    averageSprintPassive.textContent = averagePassive(branch, generation);
    var averageSprintDetractors = document.querySelector('.average-detractors');
    averageSprintDetractors.textContent = averageDetractors(branch, generation);
    $(document).ready(function() {
      var datos4 = {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              averagePromoters(branch, generation), 
              averagePassive(branch, generation),
              averageDetractors(branch, generation),
            ],
            backgroundColor: [
              '#01DF74',
              '#ffc107',
              '#FE2E2E',
             
            ]
          }],
          labels: [
            'Promoter',
            'Passive',
            'Detractor',
                   
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas4 = document.getElementById('canvas-nps').getContext('2d');
      window.pie = new Chart(canvas4, datos4);
    });
  }

  function averageNet(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var sumSprints = 0;

    for (var i = 0; i < ratings.length; i++) {
      var sprintPromoters = ratings[i]['nps']['promoters'];
      var sprintDetractors = ratings[i]['nps']['detractors'];
      var sprintPassive = ratings[i]['nps']['passive'];
      var netps = sprintPromoters - sprintDetractors;
      sumSprints += netps;
      var averageNps = sumSprints / ratings.length;
    }
    return averageNps;
  }

  function averagePromoters(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var sumSprintPromoters = 0;
    var sprintPromoters;

    for (var i = 0; i < ratings.length; i++) {
      sprintPromoters = ratings[i]['nps']['promoters'];
      sumSprintPromoters += sprintPromoters;
    }
    var averageSprintPromoters = (sumSprintPromoters / (ratings.length)).toFixed(1);
    return averageSprintPromoters;
  };
  function averagePassive(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var sumSprintPassive = 0;

    var sprintPassive;
    
    for (var i = 0; i < ratings.length; i++) {
      sprintPassive = ratings[i]['nps']['passive'];
      sumSprintPassive += sprintPassive;
    }
    var averageSprintPassive = (sumSprintPassive / (ratings.length)).toFixed(1);
    return averageSprintPassive;
  };
  function averageDetractors(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var sumSprintDetractors = 0;

    var sprintDetractors;
    
    for (var i = 0; i < ratings.length; i++) {
      sprintDetractors = ratings[i]['nps']['detractors'];
      sumSprintDetractors += sprintDetractors;
    }
    var averageSprintDetractors = (sumSprintDetractors / (ratings.length)).toFixed(1);
    return averageSprintDetractors;
  };


  /*  LORE */
  function jediMasterRating(branch, generation) {
    var boxJediRating = document.querySelector('.jedi-master-rating');

    boxJediRating.textContent = jediMasterAverage(branch, generation);
    $(document).ready(function() {
      var datos6 = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              jediMasterAverage(branch, generation),
              5 - jediMasterAverage(branch, generation),
            ],
            backgroundColor: [
              '#01DF74',
              '#FE2E2E',
             
            ]
          }],
          labels: [
            'Jedi Rating',
           
                   
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas6 = document.getElementById('canvas-jedi').getContext('2d');
      window.pie = new Chart(canvas6, datos6);
    });
  }

  function jediMasterAverage(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var jediMasterTotalScore = 0;

    for (var i = 0; i < ratings.length; i++) {
      jediMasterTotalScore += ratings[i]['jedi'];
    }
    var average = jediMasterTotalScore / ratings.length;
    return average.toFixed(1);
  }
  /* FIN LORE */

  /** Claudia */
  function teacherRating(branch, generation) {
    var boxTeacherRating = document.querySelector('.teach-rat');
    boxTeacherRating.textContent = teacherAverage(branch, generation);
    $(document).ready(function() {
      var datos5 = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              teacherAverage(branch, generation),
              5 - teacherAverage(branch, generation),
            ],
            backgroundColor: [
              '#01DF74',
              '#FE2E2E',
             
            ]
          }],
          labels: [
            'Teacher Rating',
           
                   
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas5 = document.getElementById('canvas-teacher').getContext('2d');
      window.pie = new Chart(canvas5, datos5);
    });
  }

  function teacherAverage(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var teacherTotalRating = 0;
    for (var i = 0; i < ratings.length; i++) {
      teacherTotalRating += ratings[i]['teacher'];
    }
    var teachAverage = teacherTotalRating / ratings.length;
    return teachAverage.toFixed(1);
  }

  /** FIn claudia */

  /** ELeyne */
  function satisfaction(branch, generation) {
    var boxSatisfaction = document.querySelector('.average');
    boxSatisfaction.textContent = satisfactionStudent(branch, generation);

    // Semaforo de colores
    var percent = satisfactionStudent(branch, generation) ;
    if (percent >= 80) {
      boxSatisfaction.classList.add('green');
      boxSatisfaction.classList.remove('red');
      boxSatisfaction.classList.remove('orange');
    } else if (percent < 80 && percent >= 70) {
      boxSatisfaction.classList.add('orange');
      boxSatisfaction.classList.remove('red');
      boxSatisfaction.classList.remove('green');
    } else if (percent < 70) {
      boxSatisfaction.classList.add('red');
      boxSatisfaction.classList.remove('green');
      boxSatisfaction.classList.remove('orange');
    }


    $(document).ready(function() {
      var datos = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              satisfactionStudent(branch, generation),
              100 - satisfactionStudent(branch, generation),
            ],
            backgroundColor: [
              '#01DF74',
              '#FE2E2E',
                      
            ]
          }],
          labels: [
            'Satisfaction',
            
          ]
        },
        options: {
          reponsive: true,
        }
      };
      var canvas = document.getElementById('canvas-satisfaction').getContext('2d');
      window.pie = new Chart(canvas, datos);
    });
  };
  function satisfactionStudent(branch, generation) {
    var ratings = data[branch][generation]['ratings'];
    var totalSatisfaction = 0;
    for (var i = 0; i < ratings.length;i++) {
      var sprintLatest = data[branch][generation]['ratings'];
      var meet = ratings[i]['student']['cumple'];
      var beats = ratings[i]['student']['supera'];
      var Satisf = meet + beats;
      totalSatisfaction += Satisf;
      var prom = (totalSatisfaction / (ratings.length)).toFixed(1);
    };
     
    return prom;
  };
  /** FIn Eleyne */
  /** Inicio Lizbeth */
  function techSkills(branch, generation) {
    var students = data[branch][generation]['students'];


    var totalTechArray = [];
    var countTechSp1 = 0;
    var countTechSp2 = 0;
    var countTechSp3 = 0;
    var countTechSp4 = 0;

    for (var i = 0; i < students.length; i++) {
      var quantitySprints = students[i].sprints.length;
      if (students[i].active === true) {
        for (var j = 0; j < quantitySprints; j++) {
          if (students[i].sprints[j].number === 1) {
            var techScoreSp1 = students[i].sprints[j].score.tech;
            if (techScoreSp1 >= 1260) {
              countTechSp1++;
            }
          } else if (students[i].sprints[j].number === 2) {
            var techScoreSp2 = students[i].sprints[j].score.tech;
            if (techScoreSp2 >= 1260) {
              countTechSp2++;
            }
          } else if (students[i].sprints[j].number === 3) {
            var techScoreSp3 = students[i].sprints[j].score.tech;
            if (techScoreSp3 >= 1260) {
              countTechSp3++;
            }
          } else if (students[i].sprints[j].number === 4) {
            var techScoreSp4 = students[i].sprints[j].score.tech;
            if (techScoreSp4 >= 1260) {
              countTechSp4++;
            }
          }
        }
      }
    }
    totalTechArray.push(countTechSp1, countTechSp2, countTechSp3, countTechSp4);
    return totalTechArray;
  }

  
  /** Fin Lizbeth */
  /** Inicio Lesly */
  function hseSkills(branch, generation) {
    var totalHseArray = [];
    var studentsHse = data[branch][generation]['students'];
    var countHseSp1 = 0, countHseSp2 = 0, countHseSp3 = 0, countHseSp4 = 0;

    for (var i = 0; i < studentsHse.length; i++) {
      var quantitySprint = studentsHse[i].sprints.length;
      if (studentsHse[i].active === true) {
        for (var j = 0 ; j < quantitySprint; j++) {
          if (studentsHse[i].sprints[j].number === 1) {
            var hseScoreSp1 = studentsHse[i].sprints[j].score.hse;
            if (hseScoreSp1 >= 840) {
              countHseSp1++;
            }
          } else if (studentsHse[i].sprints[j].number === 2) {
            var hseScoreSp2 = studentsHse[i].sprints[j].score.hse;
            if (hseScoreSp2 >= 840) {
              countHseSp2++;
            }
          } else if (studentsHse[i].sprints[j].number === 3) {
            var hseScoreSp3 = studentsHse[i].sprints[j].score.hse;
            if (hseScoreSp3 >= 840) {
              countHseSp3++;
            }
          } else if (studentsHse[i].sprints[j].number === 4) {
            var hseScoreSp4 = studentsHse[i].sprints[j].score.hse;
            if (hseScoreSp4 >= 840) {
              countHseSp4++;
            }
          }
        }
      }
    }
    
    totalHseArray.push(countHseSp1, countHseSp2, countHseSp3, countHseSp4);
    return totalHseArray;
  }


  function studentFilter(branch, generation) {
    // Obtener la referencia del html
    var containerStudents = document.getElementById('container-students');
    // limpiar datos cargados
    containerStudents.textContent = '';
    // declarando variables    
    var arrayPhoto = [];
    var arrayName = [];
    var arrayAverageTech = [];
    var arrayAverageHse = [];
    // obteniendo información de la base de datos
    var students = data[branch][generation].students;
    var arrHse = [];
    var arrTech = [];
    for (var i = 0; i < students.length; i++) {
      if (students[i].active == true) {
        var quantitySprints = data[branch][generation]['students'][i]['sprints'].length;
        var acumHse = 0;
        var acumTech = 0;
        for (var j = 0; j < quantitySprints; j++) { 
          var pointsHse = students[i]['sprints'][j]['score']['hse'];
          var pointsTech = students[i]['sprints'][j]['score']['tech'];
          acumHse += pointsHse;
          acumTech += pointsTech;      
        }
        arrHse.push(((((acumHse / quantitySprints) * 100) / 1200)).toFixed(1));
        arrTech.push(((((acumTech / quantitySprints) * 100) / 1800)).toFixed(1));
      }
    }
    
    
    for (i = 0 ; i < students.length;i++) {
      if (students[i].active == true) {
        arrayName.push(students[i].name);
        arrayPhoto.push(students[i].photo);
      }
    } 
 
    // creando contenedores de información de acuerdo a la cantidad de alumnas
    for (var j = 0; j < arrayName.length; j++) {
      var textCell = document.createElement('div');
      var containerName = document.createElement('div');
      var nameStudent = document.createElement('p');
      var specialization = document.createElement('p');
      var boxTech = document.createElement('div');
      var textTech = document.createElement('p');
      var textDescriptionTech = document.createElement('p');
      var boxHse = document.createElement('div');
      var textHse = document.createElement('p');
      var textDescriptionHse = document.createElement('p');
      var english = document.createElement('div');
      var image = document.createElement('img');
      
      textCell.classList.add('container-cell');
      boxTech.classList.add('minibox-style');
      boxHse.classList.add('minibox-style');
      english.classList.add('minibox-style');
      containerName.classList.add('container-name');
      
      image.setAttribute('src', arrayPhoto[j]);
      nameStudent.textContent = arrayName[j];
      specialization.textContent = 'Fronted Developer';
      textTech.textContent = arrTech[j] + '%';
      textDescriptionTech.textContent = 'Tech Skills';
      textHse.textContent = arrHse[j] + '%';
      textDescriptionHse.textContent = 'Life Skills';
      english.innerHTML = '<p>Interm</p><p>English</p>';
      
      
      // insertando info a los contenedores
      boxTech.appendChild(textTech);
      boxTech.appendChild(textDescriptionTech);
      boxHse.appendChild(textHse);
      boxHse.appendChild(textDescriptionHse);
      containerName.appendChild(nameStudent);
      containerName.appendChild(specialization);
      textCell.appendChild(image);
      textCell.appendChild(containerName);
      textCell.appendChild(boxTech);
      textCell.appendChild(boxHse);
      textCell.appendChild(english);
      // insertando al contenedor en html
      containerStudents.appendChild(textCell);
    }
  }
});