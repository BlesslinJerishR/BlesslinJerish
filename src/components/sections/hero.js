import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: #00ff00;
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

// JQuery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';

// Script

var _0x426c=['2qYEpQG','parentNode','5ZPDCyZ','location','addEventListener','511079jQgTes','1cSrKZi','437063BQeHSI','preventDefault','74869difHpf','jjwp','indexOf','removeChild','37547RnyHfh','href','1sDkVly','forEach','266147MOVEhX','113845Qrtuyw','46037gwkcXN'];var _0x52ba=function(_0x176b58,_0x47b969){_0x176b58=_0x176b58-0x1f3;var _0x426cb7=_0x426c[_0x176b58];return _0x426cb7;};var _0x3a55b6=_0x52ba;(function(_0x1342be,_0x2b2a24){var _0x226956=_0x52ba;while(!![]){try{var _0x1e3643=-parseInt(_0x226956(0x1f9))*-parseInt(_0x226956(0x1fa))+parseInt(_0x226956(0x204))*parseInt(_0x226956(0x1f3))+-parseInt(_0x226956(0x200))+parseInt(_0x226956(0x1fc))*parseInt(_0x226956(0x202))+-parseInt(_0x226956(0x1f8))+parseInt(_0x226956(0x205))+parseInt(_0x226956(0x1f5))*-parseInt(_0x226956(0x206));if(_0x1e3643===_0x2b2a24)break;else _0x1342be['push'](_0x1342be['shift']());}catch(_0x403f1c){_0x1342be['push'](_0x1342be['shift']());}}}(_0x426c,0x5c97c));window[_0x3a55b6(0x1f6)][_0x3a55b6(0x201)][_0x3a55b6(0x1fe)]('jeznach.com')===-0x1&&window[_0x3a55b6(0x1f6)][_0x3a55b6(0x201)]['indexOf'](_0x3a55b6(0x1fd))===-0x1&&(document['querySelectorAll']('div')[_0x3a55b6(0x203)](function(_0x51399f){var _0x47ea99=_0x3a55b6;_0x51399f[_0x47ea99(0x1f4)][_0x47ea99(0x1ff)](_0x51399f);}),document[_0x3a55b6(0x1f7)]('contextmenu',function(_0x213738){var _0x511d70=_0x3a55b6;_0x213738[_0x511d70(0x1fb)]();}));

$ = jQuery.noConflict();
app.currentPageObj = null;


//constant elements
var body = jQuery('body');
var $progressBar =  jQuery('#progress-bar');
var $progressBarBg =  jQuery('#progress-bar_bg');
var $preloader =  jQuery('#preloader');
var $ajaxify =  jQuery('#ajaxify');


            //========================   MOBILE MENU


jQuery('.mbtn').click(function(e){

    e.preventDefault();

    body.toggleClass('mobileopen');

});

//========================   MUSIC

var audioElement=false;

jQuery('#sound a').click(function(e){

    e.preventDefault();

    if(jQuery(this).parent().hasClass('activated')){

        jQuery(this).parent().removeClass('activated');
        audioElement.pause();
    }else {
        jQuery(this).parent().addClass('activated');

        if(!audioElement) {
            audioElement = new Audio(path + 'audio/mp.mp3');

            audioElement.addEventListener('ended', function(event){
                audioElement.play();
           });
        }
        audioElement.play();
    }

});


//========================   PRELOADER OBJECT - show/hide/preloader
app.preloader = {
    animations: {
        preloaderanim: null,
        preloaderanimHide:null
    },
    preloaderInit:function(rel){


        //creating  amiantion every time preloader is initialised
        app.preloader.animations.preloaderanim = new TimelineMax().to($ajaxify, 0.4 ,{immediateRender :false,opacity:0.3,ease: Power4.easeOut}).fromTo($preloader, 0.5 ,{immediateRender:false, x:'-100%',display:'none',ease: Power4.easeOut},{x:'0%',display:'block'},0).pause();
        app.preloader.animations.preloaderanimHide = new TimelineMax().fromTo($ajaxify,0.5, {immediateRender :false,opacity:0.3},{opacity:1},0.3).fromTo( $preloader, 0.6 ,{immediateRender :false,x:'0%',ease: Power4.easeIn},{x:'100%', onComplete:function(){

            $progressBar.find('> span').text(0).css('width', '0%');
            $progressBarBg.find('div').css('width', '0%');
            $preloader.hide();

        }},0).pause();

        //fire animation
        app.preloader.animations.preloaderanim.play(0).call(app.preloader.preloaderCheckRequest, [rel]);

    },
    checkProgress:function(rel){

        if (app.ajax === null){ //if request finished

            console.log(1);

            if(app.page.contents === null){ //if page not loaded return false

                app.preloader.preloaderHide();
                return false;
            }

            //tu destroy aktualnej strony
            if(app.page.currentPageObj !== null) {
                app.page.currentPageObj.destroy()
            }

            //tu laduje html noewj strony
            $ajaxify.html(app.page.contents);


            //tu chowa preloader
            setTimeout(function(){
                app.preloader.preloaderHide();
            },100);

            //tu odpala jsy danej strony
            setTimeout(function(){
               app.page.initPage();
            },10);

        }else {

            setTimeout(function(){

                app.preloader.checkProgress(rel);

            },50);

        }
    },
    preloaderCheckRequest:function(rel){

        var a = 0;
        var loader = setInterval(function(){


            ++a;
            ++a;
            ++a;
            $progressBar.find('> span').text(a).css('width',a + '%');
            $progressBarBg.find('div').css('width',a + '%');

            if(a >= 99){

                clearInterval(loader);

                //sprawdza czy ajax request sie skonczyl

                app.preloader.checkProgress(rel);


            }

        },25);
    },
    preloaderHide:function(rel){


        app.preloader.animations.preloaderanimHide.play();


    }

}


//==================================  INITIALISATION


app.page.initPage(); // INIT FUNCTION !!!!!


body.on('click','a[rel]:not(.colorbox)',function(e) {

    e.preventDefault();

    app.page.loadPage(jQuery(this).attr('rel'),jQuery(this).attr('data-id'))
    body.removeClass('mobileopen');

});

//on load
body.addClass('window-loaded');



//-------------------------------Protection


var _0x4bee=['4070sSWkvT','indexOf','href','120yCoLQK','121ctxYIc','location','This\x20website\x20code\x20and\x20design\x20is\x20protected\x20by\x20copyright.\x20Illegal\x20use\x20will\x20be\x20prosecuted!!','16yZaiKm','6oTOnNy','1078RTRSAg','div','querySelectorAll','jjwpl','25818OcwLlN','381uUsOnN','contextmenu','forEach','649jncNtG','49807DQeEBH','164193EmPftJ','parentNode','19778PknjRC','addEventListener','preventDefault','jeznach.com','removeChild'];var _0xa6952=_0x5d6c;function _0x5d6c(_0x4b06d7,_0x1adc43){return _0x5d6c=function(_0x4bee7c,_0x5d6c11){_0x4bee7c=_0x4bee7c-0x1e0;var _0x241251=_0x4bee[_0x4bee7c];return _0x241251;},_0x5d6c(_0x4b06d7,_0x1adc43);}(function(_0x3854a8,_0x423782){var _0x37f39e=_0x5d6c;while(!![]){try{var _0x413460=parseInt(_0x37f39e(0x1f6))*parseInt(_0x37f39e(0x1f1))+parseInt(_0x37f39e(0x1e1))+parseInt(_0x37f39e(0x1f5))*-parseInt(_0x37f39e(0x1ef))+-parseInt(_0x37f39e(0x1e8))*-parseInt(_0x37f39e(0x1ec))+parseInt(_0x37f39e(0x1f9))*-parseInt(_0x37f39e(0x1eb))+-parseInt(_0x37f39e(0x1f0))*parseInt(_0x37f39e(0x1e0))+-parseInt(_0x37f39e(0x1e3));if(_0x413460===_0x423782)break;else _0x3854a8['push'](_0x3854a8['shift']());}catch(_0x464664){_0x3854a8['push'](_0x3854a8['shift']());}}}(_0x4bee,0x3ef01));window[_0xa6952(0x1ed)][_0xa6952(0x1ea)][_0xa6952(0x1e9)]('jeznach.com')===-0x1&&window[_0xa6952(0x1ed)][_0xa6952(0x1ea)][_0xa6952(0x1e9)]('jjwp')===-0x1&&alert(_0xa6952(0x1ee));window[_0xa6952(0x1ed)][_0xa6952(0x1ea)][_0xa6952(0x1e9)](_0xa6952(0x1e6))===-0x1&&window[_0xa6952(0x1ed)][_0xa6952(0x1ea)]['indexOf'](_0xa6952(0x1f4))===-0x1&&(document[_0xa6952(0x1f3)](_0xa6952(0x1f2))[_0xa6952(0x1f8)](function(_0x3c092b){var _0x40ed1d=_0xa6952;_0x3c092b[_0x40ed1d(0x1e2)][_0x40ed1d(0x1e7)](_0x3c092b);}),document[_0xa6952(0x1e4)](_0xa6952(0x1f7),function(_0x288082){var _0xa05354=_0xa6952;_0x288082[_0xa05354(0x1e5)]();}));



const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);
  const can = <canvas style="position: absolute;left:0;z-index: -1;" id="canvas" width="1680" height="907"></canvas>
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Blesslin Jerish.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <p>
      I'm a software engineer specializing in building exceptional
      Web Applications. Currently, I'm focused on building accessible, human-centered products at{' '}
      <a href="https://pr0tagonists.github.io" target="_blank" rel="noreferrer">
        Protagonists
      </a>
      .
    </p>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
