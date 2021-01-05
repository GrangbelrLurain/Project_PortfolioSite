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
  const allNav = document.querySelectorAll('#aside .main li a')
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
      scrollDown();
      nowContents++;
      scrollBarUpdate();
    } else if (directionY < 0 && nowContents > 0){
      scrollUp();
      nowContents--;
      scrollBarUpdate();
    }
  }
  const scrollEventTouch = () => {
    if(directionY > window.innerHeight/4 && nowContents < contentsList.length - 1){
      scrollDown();
      nowContents++
      scrollBarUpdate();
    } else if (directionY < -window.innerHeight/4 && nowContents > 0){
      scrollUp();
      nowContents--
      scrollBarUpdate();
    }
  }

  const transformGet = () => {
    const lastTransform = contents.style.transform;
    const cutF = lastTransform.indexOf('(') + 1;
    const cutL = lastTransform.indexOf('vh');
    const lastTransitionY = Number(lastTransform.substring(cutF,cutL));

    return lastTransitionY;
  }

  const scrollDown = () => {
    contents.style.transform = `translateY(${transformGet() - 100}vh)`
  }
  
  const scrollUp = () => {
    contents.style.transform = `translateY(${transformGet() + 100}vh)`
  }

  // scroll Bar Update
  const scrollBar = document.querySelector('#aside .scroll .bar');

  const scrollBarUpdate = () => {
    scrollBar.style.height = `${(nowContents/(contentsList.length-1))*100}vh`
  }
}