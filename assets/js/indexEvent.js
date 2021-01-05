{ //ASIDE EVENT
  const aside = document.querySelector('#aside');
  const asideBtn = document.querySelector('#aside .toggleBtn');
  const contents = document.querySelector('#contents');

  asideBtn.addEventListener('click', () => {
    aside.classList.toggle('close');
    contents.classList.toggle('close');
  })

 //NAV EVNET
  const mainNav = document.querySelectorAll('#aside .main > li > a');
  const allNav = document.querySelectorAll('#aside .main .sub li a')
  let href = null;
  allNav.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      href = elem.getAttribute('href')
      activeToggle(elem);
    })
  })

  mainNav.forEach((elem) => {
    elem.addEventListener('click', () => {
      event.preventDefault();
      navToggle(elem);
    })
  })
  
  const navToggle = (elem) => {
    mainNav.forEach((findElem) => {
      const findParent = findElem.parentElement
      const parentElem = elem.parentElement;
      if(findParent != parentElem){
        findParent.classList.remove('active');
        closeHeight(findParent);
      } else {
        if(parentElem.classList == 'active'){
          parentElem.classList.remove('active');
            closeHeight(parentElem);
        } else {
          parentElem.classList.add('active');
          openHeight(parentElem);
        };
      }
    })
  }

  const openHeight = (parentElem) => {
    const sub = parentElem.querySelector('.sub');
    if(sub){
      sub.style.height = `${heightGet(parentElem)}px`
    };
  }

  const closeHeight = (parentElem) => {
    const sub = parentElem.querySelector('.sub');
    if(sub){
      sub.style.height = `0px`;
    }
  }

  const heightGet = (parentElem) => {
    let height = 0;
    parentElem.querySelectorAll('.sub li').forEach((innerElem) => {
      height += innerElem.clientHeight;
    })
    return height
  }

  const activeToggle = (elem) => {
    allNav.forEach((innerElem) => {
      if(innerElem != elem){
        innerElem.classList.remove('active');
      } else {
        elem.classList.add('active');
      }
    })
  }



  // SCROLL EVENT
  const contentsList = document.querySelectorAll('#contents section');
  const scrollResetTime = 400;

  let directionY = null;
  let nowContents = 0;
  let scrollSwitch = true;

  window.addEventListener('wheel', (event) => {
    directionY = event.deltaY;
    console.log(nowContents)
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
      scrollDown();
      scrollBarUpdate();
      navUpdate();
    } else if (directionY < 0 && nowContents > 0){
      nowContents--;
      scrollUp();
      scrollBarUpdate();
      navUpdate();
    }
  }
  const scrollEventTouch = () => {
    if(directionY > window.innerHeight/4 && nowContents < contentsList.length - 1){
      nowContents++
      scrollDown();
      scrollBarUpdate();
      navUpdate();
    } else if (directionY < -window.innerHeight/4 && nowContents > 0){
      nowContents--
      scrollUp();
      scrollBarUpdate();
      navUpdate();
    }
  }

  const scrollDown = () => {
    contents.style.transform = `translateY(${-nowContents*100}vh)`
  }
  
  const scrollUp = () => {
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