// const synth = window.speechSynthesis;
// //Grab all the Dom elements....
// const textForm = document.querySelector("form");
// const textInput = document.querySelector("#text-input");
// const voiceSelect = document.querySelector("#voice-select");//List of Languages..
// const rate = document.querySelector("#rate");
// const rateValue = document.querySelector("#rate-value");
// const pitch = document.querySelector("#pitch");
// const pitchValue = document.querySelector("#pitch-value");
// const done = document.querySelector("#done");
// //Init Voices Array...

// let voices = [];

// function getVoices(){
//     voices =synth.getVoices();
//    //Iteration voices.
//    voices.forEach(voice=>{
//    const option = document.createElement('option');
//    //Fill option with voice Language
//    option.textContent = voice.name +'('+voice.lang+')';
//    //Set needed option attributes..
//    option.setAttribute('data-lang', voice.lang);
//    option.setAttribute('data-lang', voice.name);
//    voiceSelect.appendChild(option);
//    })
    
// }
// getVoices();
// if(synth.onvoiceschanged!==undefined){
//     synth.onvoiceschanged = getVoices();

// }
// //Speak
// function speak(){
//     if(synth.speaking){
//         console.log('Already');
//         return;
//     }
//     //If String is not Empty.
//     if(textInput.value!==''){
//       //Get Speak Text,
//       const speakText = new SpeechSynthesisUtterance(textInput.value);
    
//     //Speak End..
//     speakText.onend = e=>{
//         console.log('Done Speaking');
//     }
//     //Speak Error
//     speakText.onerror = e=>{
//         console.log('Something went wrong');
//     }

//     //Selected Voice
//       const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
//       //Loop through Voices..
//       voices.forEach(voice=>{
//         if(voice.name===SelectedVoice){
//             speakText.voice = voice;

//         }
//       })
//    //This is for Changing Rate Value that apperars in the left side of the slider..
//       speakText.rate = rate.value;
//       speakText.rate = pitch.value;
//    //Speak..
//    synth.speak(speakText);   

//     }
// };

// //Event Listener

// //Text form Submit,,
// textForm.addEventListener('submit',e=>{
//     // e.preventDefault();
//     speak();
//     textInput.blur();
// })

// //Change value of slider display in the div box.......


// //this is for rate.
// rate.addEventListener('change',e=> rateValue.textContent = rate.value)
// // This is for value 
// pitch.addEventListener('change',e=> pitchValue.textContent = pitch.value)

// //Voice Select change......
//  voiceSelect.addEventListener('change',speak());
// // done.addEventListener('click',e=>speak());
// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const done  = document.querySelector('#done');
//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

//Line 35, 36 causes voice list duplication
/*getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}*/

//Fix for duplication, run code depending on the browser
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

// Speak
const speak = () => {
    6
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    // Add background animation
    body.style.background = '#141414  url(./wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
   
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

done.addEventListener('click',e=>speak());