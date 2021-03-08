import LazyLoad from 'vanilla-lazyload';
import Glide  from '@glidejs/glide'
import inView from 'in-view';

var header;
var contact_overlay;
var overlay_buttons;
var questions_containers;
var hero_banner;
var floating_button;
var mobile_nav;
var mobile_trigger;
var overlay_exit_cross;
var forms;
var meta_counters;
var nav_controls;
var brands_container;
var gallery_container;
var testimonials_container;
var map_status = false;



function addScript( url, callback ) {
  var script = document.createElement( 'script' );
  if( callback ) script.onload = callback;
  script.type = 'text/javascript';
  script.src = url;
  document.body.appendChild( script );  
}

function loadMapsAPI() {
  if(map_status)
    return;
  
  map_status = true;
  
  addScript( 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAiH04bJ1KxgRWRHN8S7pI6mnxMMzg0NXE&callback=MyMap' );
}




function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
function animateCounter(obj, duration) {
  if(obj.innerHTML != "0")
  {
    return;
  }
    
    
  var start = 0;
  var end = obj.getAttribute('data-count');
  var range = end - start;
  var current = start;
  var increment = end > start? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function() {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}

// =========== FUNCTIONS ========== //
function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function scrollToSection(e)
{
  var lower_nav = document.querySelector('.lower-nav');
  e.preventDefault()
  var target = document.getElementById(this.getAttribute('data-scroll'));
  mobile_nav.classList.remove('active');
  mobile_trigger.classList.remove('active');
  window.scrollTo(0,(offset(target).top - header.offsetHeight - lower_nav.offsetHeight) );
  
}



function OnFormSubmit(e)
{
  e.preventDefault();
  console.log('hello');
  var input_data  = this.querySelector('input');
  contact_overlay.classList.remove('active');

  NotificationSucces();
}

function ContactOverlayUp(e)
{
  //e.preventDefault();
  contact_overlay.classList.add("active");
}


function ContactOverlayDown(e)
{
  //e.preventDefault();
  if(!e.target.classList.contains('contact-overlay') || e.target.id == "exit-cross")
    return;
  
  contact_overlay.classList.remove('active');
}


function QuestionOpen(e)
{
  e.preventDefault();
  this.classList.add('active');
  this.addEventListener('click' , QuestionClose , false);
}

function QuestionClose(e)
{
  e.preventDefault();

  if(!e.target.classList.contains('question'))
    return;

    this.classList.remove('active');

    this.removeEventListener('click' , QuestionClose);
}

function FloatingButtonUp(e)
{
  floating_button.classList.add('active');
}
function FloatingButtonDown(e)
{
  floating_button.classList.remove('active');
}


function MobileNavUp(e)
{
  e.preventDefault();

  if(mobile_trigger.classList.contains('active'))
  {
    mobile_nav.classList.remove('active');
    mobile_trigger.classList.remove('active');
    return;
  }
  mobile_nav.classList.add('active');
  mobile_trigger.classList.add('active');
}



// =========== DOMREADY ========== //

document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
  //GLOBALS
    header                  =   document.getElementById("header");
    contact_overlay         =   document.getElementById('contacts-overlay');
    overlay_buttons         =   document.getElementsByClassName('overlay-form-btn ');
    questions_containers    =   document.getElementsByClassName('question-container');
    hero_banner             =   document.getElementById('hero-banner-section');
    floating_button         =   document.getElementById('call-us-floating');
    mobile_nav              =   document.getElementById('mobile-nav-container')
    mobile_trigger          =   document.getElementById('mobile-trigger')
    overlay_exit_cross      =   document.getElementById('exit-cross');
    forms                   =   document.getElementsByTagName('form');
    nav_controls            =   document.getElementsByClassName('scroll-to-link');
    brands_container        =   document.getElementById('brands-slider');
    gallery_container       =   document.getElementById('gallery');
    testimonials_container  =   document.getElementById('testimonials');


  if(brands_container)
  {
    var Brands = new Glide(brands_container , {
      type: 'carousel',
      startAt: 0,
      perView: 5,
      autoplay : 3000,
      breakpoints: 
      {
        768: 
        {
          perView: 3,
        },
        320: 
        {
          perView: 2,
        }
      }
    }).mount();
  }

  if(gallery_container)
  {
    var Gallery = new Glide(gallery_container , {
      type: 'carousel',
      startAt: 0,
      perView: 4,
      autoplay : 4000,
      breakpoints: {
        768:{
          perView : 3,
        },
        425: {
          perView: 2
        }
      }
    }).mount();
  }
  
  
  if(testimonials_container)
  {
    var testiominals = new Glide(testimonials_container , {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay : 6000,
  }).mount();
  var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy"
  });
  }


  // ==== Event Listeners Assign ==== //
  // -- Mobile-nav
  mobile_trigger.addEventListener('click' , MobileNavUp , false);
  // -- Questions 

  for(var i = 0; i < questions_containers.length; i++)
  {
    questions_containers[i].addEventListener("click" , QuestionOpen , false);
  }

  // -- OVERLAY 


  for(var i = 0; i < overlay_buttons.length; i++)
  {
    overlay_buttons[i].addEventListener('click' , ContactOverlayUp , false);
  }

  contact_overlay.addEventListener('click' , ContactOverlayDown , false);
  overlay_exit_cross.addEventListener('click' , function(){
    contact_overlay.classList.remove('active');
  } , false);


  // window events

  inView('#hero-banner-section')
    .on('enter', FloatingButtonDown)
    .on('exit', FloatingButtonUp);

  inView('footer')
    .on('enter' , FloatingButtonDown)
    .on('exit' , FloatingButtonUp);

  inView('.meta-counter').on('enter',function(el){
      animateCounter(el , 3000);
  })
  inView('#google-map-container').once('enter' , loadMapsAPI);


  window.addEventListener('scroll' , function(){
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    
    if(scrollTop > header.offsetHeight )
      header.classList.add('floating');
    else 
    header.classList.remove('floating');
  });
  for(var i = 0; i < nav_controls.length; i++)
  {
     nav_controls[i].addEventListener('click' , scrollToSection, false);    
  }


});



