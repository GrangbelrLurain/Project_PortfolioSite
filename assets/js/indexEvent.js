{ //ASIDE EVENT
  const aside = document.querySelector('#aside');
  const asideBtn = document.querySelector('#aside .toggleBtn');
  const contents = document.querySelector('#contents');

  asideBtn.addEventListener('click', () => {
    aside.classList.toggle('close');
    contents.classList.toggle('close');
  })

 // NAV EVNET
  const mainNav = document.querySelectorAll('#aside .main > li > a');
  const allNav = document.querySelectorAll('#aside .main .sub li a')
  let href = null;

  // SUBNAV EVENT HANDELER ADD
  allNav.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      href = elem.getAttribute('href')
      navScroll()
    })
  })

  // MAINNAV EVENT HANDELER ADD
  mainNav.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      href = elem.getAttribute('href')
      navScroll()
    })
  })

  // NAV CLICK => SCROLL EVENT
  const navScroll = () => {
    nowContents = href;
    scrollMove();
    scrollBarUpdate();
    navUpdate();
  }


  // SCROLL EVENT
  const contentsList = document.querySelectorAll('#contents section');
  const scrollResetTime = 400;

  let directionY = null;
  let nowContents = 0;
  let scrollSwitch = true;

  window.addEventListener('wheel', (event) => {
    directionY = event.deltaY;
    if(scrollSwitch === true){
      scrollEventWheel();
      scrollSwitch = false;
      setTimeout(() => {
        scrollSwitch = true;
      }, scrollResetTime);
    }
  })

  window.addEventListener('touchstart', (event) => {
    directionY = event.changedTouches[0].clientY;
  })
  
  window.addEventListener('touchend', (event) => {
    directionY = directionY - event.changedTouches[0].clientY;
    if(scrollSwitch === true){
      scrollEventTouch();
      scrollSwitch = false;
      setTimeout(() => {
        scrollSwitch = true;
      }, scrollResetTime);
    }
  })

  window.addEventListener('mousedown', (event) => {
    directionY = event.clientY;
  })

  window.addEventListener('mouseup', (event) => {
    directionY = directionY - event.clientY;
    if(scrollSwitch === true){
      scrollEventTouch();
      scrollSwitch = false;
      setTimeout(() => {
        scrollSwitch = true;
      }, scrollResetTime);
    }
  })

  const scrollEventWheel = () => {
    if(directionY > 0 && nowContents < contentsList.length - 1){
      nowContents++;
      scrollMove();
      scrollBarUpdate();
      navUpdate();
    } else if (directionY < 0 && nowContents > 0){
      nowContents--;
      scrollMove();
      scrollBarUpdate();
      navUpdate();
    }
  }

  const scrollEventTouch = () => {
    if(directionY > window.innerHeight/4 && nowContents < contentsList.length - 1){
      nowContents++
      scrollMove();
      scrollBarUpdate();
      navUpdate();
    } else if (directionY < -window.innerHeight/4 && nowContents > 0){
      nowContents--
      scrollMove();
      scrollBarUpdate();
      navUpdate();
    }
  }

  const scrollMove = () => {
    contents.style.transform = `translateY(${-nowContents*100}vh)`
  }

  // scroll Bar Update
  const scrollBar = document.querySelector('#aside .scroll .bar');

  const scrollBarUpdate = () => {
    scrollBar.style.height = `${(nowContents/(contentsList.length-1))*100}vh`
  }

  // nav Update
  const navUpdate = () => {
    allNav.forEach((elem) => elem.classList.remove('active'))
    const nowNav = allNav[nowContents];
    if(nowNav === undefined){
      mainNav.forEach((elem) => {elem.parentElement.classList.remove('active')})
      mainNav[mainNav.length-1].parentElement.classList.add('active');
    } else {
      nowNav.classList.add('active');
      const nowActive = nowNav.parentElement.parentElement.parentElement;

      mainNav.forEach((mainElem) => {
        const allMain = mainElem.parentElement
        if(allMain != nowActive){
          allMain.classList.remove('active');
        } else {
          nowActive.classList.add('active');
        }
      })
      mainNav[mainNav.length-1].parentElement.classList.remove('active');
    }
  }
}

{ // SECTION PROFILE 02 EVENT
  const skillList = document.querySelectorAll('#profile02 .skill dl');
  skillList.forEach((elem) => {
    elem.addEventListener('mouseover', () => {
      skillList.forEach((allElem) => {
        if(allElem != elem){
          allElem.classList.remove('active');
        } else {
          elem.classList.add('active');
        }
      })
    })
  })
}

{ // SECTION PROFILE 03 EVENT
  const question = document.querySelector('#profile03 .QnA .q');
  const answer = document.querySelector('#profile03 .QnA .a');
  const timer = document.querySelector('#profile03 .QnA .timer');
  const percent = document.querySelector('#profile03 .QnA .timer .percent');
  const intervalTime = 8000 // mili seconds 단위
  const QnAList = [
    {
      Q : '어떤 개발자가 되고 싶나요?',
      A : '만들고 싶은 것을 만들어 줄 수 있는 개발자가 되고싶습니다.'
    },
    {
      Q : '왜 개발자가 되려고 하나요?',
      A : '디자인과 영상을 하며 문화를 만드는 것의 즐거움을 알았습니다.<br>현재의 웹, 프론트엔드는 문화를 만들어감에서 최고라고 생각하고 있습니다.<br>그래서 프론트엔드 개발을 하고싶습니다.'
    },
    {
      Q : '왜 디자인, 영상이 아닌 개발을 하려고 하나요?',
      A : '디자인과 영상은 정말 중요합니다.<br>그것들에 생기를 주는 일이 개발이라고 생각하기 때문에 개발을 하려고 합니다.'
    }
  ]

  question.style.animation = `QnAOpacity ${intervalTime}ms infinite`
  answer.style.animation = `QnAOpacity ${intervalTime}ms infinite`
  timer.style.animation = `QnAOpacity ${intervalTime}ms infinite`
  percent.style.animation = `QnAtimer ${intervalTime}ms infinite`
  let intervalNow = 0
  setInterval(() => {
    if(intervalNow < QnAList.length - 1){
      intervalNow ++
    } else {
      intervalNow = 0;
    }

    question.innerHTML = `Q. ${QnAList[intervalNow].Q}`
    answer.innerHTML = `A. ${QnAList[intervalNow].A}`


  }, intervalTime)
}

{ // SECTION PORTFOLIO
  const viewport = document.querySelector('#portfolio01 .viewport');
  const projectList = viewport.querySelector('.project_list');
  const projectExplain = document.querySelector('#portfolio01 .viewport .project_explain');
  const listItems = projectList.querySelectorAll('.item');
  const explainItems = projectExplain.querySelectorAll('.item');

  let nowProject = 0;
  let directY = 0;

  viewport.addEventListener('wheel', (event) => {
    event.stopPropagation();
    directY = event.deltaY;
    if(directY > 0 && nowProject < listItems.length-1){
      nowProject++
    } else if (directY < 0 && nowProject > 0){
      nowProject--
    }
    projectActive();
  }, true);

  viewport.addEventListener('touchstart', (event) => {
    event.stopPropagation();
    directY = event.changedTouches[0].clientY
  })

  viewport.addEventListener('touchend', (event) => {
    event.stopPropagation();
    directY = directY - event.changedTouches[0].clientY
    if(directY > 0 && nowProject < listItems.length-1){
      nowProject++
    } else if (directY < 0 && nowProject > 0){
      nowProject--
    }
    projectActive();
  })

  listItems.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      nowProject = index;
      projectActive();
    })
  })

  const projectActive = () => {
    listItems.forEach((elem, index) => {
      elem.style.transform = `translateY(${-nowProject*projectList.clientHeight}px)`
      if(index == nowProject){
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
    })
    explainItems.forEach((elem) => {
      elem.style.transform = `translateY(${-nowProject*projectList.clientHeight}px)`
    })
  }

  // STORYBOARD Active

  const storyboard = viewport.querySelectorAll('.story');
  const layer = document.querySelector('#portfolio01 .layer');
  const iframe = layer.querySelector('iframe');
  const layerCloseBtn = layer.querySelector('.close');

  storyboard.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      pdfLink(elem);
      layerOn();
    })
  })

  layerCloseBtn.addEventListener('click', () => { layerOff() });

  const pdfLink = (elem) => {
    const href = elem.getAttribute('href');
    if(href != '#'){
      iframe.setAttribute('src', href);
    } else {
      iframe.setAttribute('src', '');
    }
  }

  const layerOn = () => {
    layer.classList.add('active');
  }

  const layerOff = () => {
    layer.classList.remove('active');
  }
}