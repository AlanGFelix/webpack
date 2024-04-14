import getData from '@utils/getData.js';
import twitter from '@images/twitter.png'
import github from '@images/github.png'
import linkedin from '@images/linkedin.png'

const Template = async () => {
  const data = await getData();
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
            <img src="${data.picture.large}" alt="${data.name.first}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_title">Hi, My name is</p>
          <p class="card_value">${data.name.first} ${data.name.last}</p>
        </div>
        <div class="card_userdata">
          <ul>
            <li>${data.email}</li>
            <li>${data.location.country}</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/AlanFlix18" target="_blank"">
            <img src="${twitter}" />
          </a>
          <a href="https://github.com/AlanGFelix" target="_blank"">
            <img src="${github}" />
          </a>
          <a href="https://www.linkedin.com/in/alan-giovani-f%C3%A9lix-rodr%C3%ADguez-ab0046213/" target="_blank">
            <img src=${linkedin} />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;