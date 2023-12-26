const setupTextarea = document.getElementById('setup-textarea');
const setuploading = document.getElementById('loading-container');
const setupInputContainer = document.getElementById('setup-input-container');
const careerBossText = document.getElementById('movie-boss-text');
const OPENAI_API_KEY0 = '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';
const OPENAI_API_KEY1 = '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';
const OPENAI_API_KEY2 = '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';
const OPENAI_API_KEY3 = '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';
const OPENAI_API_KEY4 = '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';

const url = "https://api.openai.com/v1/completions";
const url1 = 'https://api.openai.com/v1/images/generations'

$(window).on('load', function() {
  $("#loading-container").css('display', 'block');
});

setupTextarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("send-btn").click();
  }
});

document.getElementById("send-btn").addEventListener("click", () => {
  debugger;
  var userInput = $("#setup-textarea").val();
  $("#loading-container").css('display', 'none');
  careerBossText.innerText = "Let me take a quick pause to let my virtual neurons process and understand the input.";
  fetchBotReply(userInput);
});

async function fetchBotReply(userInput) {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY0
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Generate a 2 line motivating message about how their interests sound interesting and that you need some minutes to think about it.
        
    ###
    interests: Art and Creativity
    message: I'm truly excited about your interests in art and creativity! Embracing your artistic side can lead to a world of self-expression and endless possibilities.
    ###
    interests: Entrepreneurship and Social Impact
    message: Your interests in entrepreneurship and social impact are both inspiring and impactful! The combination of business acumen and a desire to create positive change is a potent force for transforming lives. 
    ###
    interests: Health and Fitness
    message: Your commitment to health and fitness is truly motivating! Taking care of your well-being not only benefits you but also radiates positive energy to those around you.
    ###
    interests: ${userInput}
    message: 
    `,
        'max_tokens': 100, // Replace with your desired value
        'temperature': 0.4 // Replace with your desired value
      })
    });

    const data = await response.json();
    console.log(data.choices[0].text);
    setTimeout(function() {
      $("#loading-container").css('display', 'block');
      careerBossText.innerText = data.choices[0].text;
      fetchCareer(userInput);
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchCareer(userInput) {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY1
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Generate the top 5 best career choices to pursue with the given interests and strengths.
        ###
        interests: Art and Creativity
        career: Art Director:- Art directors are responsible for overseeing the visual style and creative elements of projects, leading teams of artists and designers to bring concepts to life.

        Graphic Designer:- Graphic designers use visual elements to communicate ideas and messages through various media, such as logos, websites, advertisements, and publications.
        
        Creative Writer:- Creative writers craft compelling narratives, poems, or scripts, using their imagination and linguistic skills to captivate audiences and evoke emotions.
        
        Animator:- Animators create animated sequences, characters, and special effects for films, video games, and other multimedia projects, adding movement and life to visual content.
        
        Art Therapist:- Art therapists utilize the therapeutic power of art to help individuals explore emotions, reduce stress, and improve mental well-being through guided creative processes.
        ###
        interests: ${userInput}
        career: 
        `
        ,
        max_tokens: 600
      })
    });

    const data = await response.json();
    const career = data.choices[0].text.trim();
    document.getElementById('heading1').innerText = "CAREER CHOICES"
    document.getElementById('output-career').innerText = career;
    fetchEducation(career);
    fetchImagePrompt(userInput);
    // fetchPlaces(career);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchEducation(career) {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY2
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Generate the best education paths to follow for the following career choices:\n\n${career}`,
        'max_tokens': 600,
        'temperature': 0.4
      })
    });

    const data = await response.json();
    const education = data.choices[0].text.trim();
    document.getElementById('heading2').innerText = "EDUCATION PATHS"
    document.getElementById('output-edu').innerText = education;
    fetchPlaces(education)
    // fetchImagePrompt(places, career);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchPlaces(education) {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY3
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `
          List the best countries to study in for these education paths: 
          ###
          education: Bachelor's Degree in Fine Arts, Master's in Graphic Design, Creative Writing Courses
          places: Rome, England, USA
          ###
          education: ${education}
          places:   
        `,
        'max_tokens': 200
      })
    });

    const data = await response.json();
    const extractedText = data.choices[0].text.trim();
    const places = extractedText.replace('Countries:', '').trim();
    document.getElementById('heading3').innerText = "COUNTRIES TO STUDY"
    document.getElementById('output-place').innerText = places;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchImagePrompt(userInput) {
  try {
    const response = await fetchAPI(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY4
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Give a short description of an image that could be used to represent a person interested in ${userInput}. The description should be rich in visual detail but contain no text in any language.
        ###
        interests: Sports and Health
        image description:  a vibrant and energetic individual with a genuine passion for sports and health. This person embodies an active and healthy lifestyle.Dressed in comfortable and athletic attire, reflecting their readiness to engage in physical activities and sports. Their attire might include sports shoes, athletic shorts or leggings, and a moisture-wicking sports top, signifying their readiness to jump into any sporting activity.
        ###
        interests: ${userInput}
        image description: 
        `,
        temperature: 0.6,
        max_tokens: 100
      })
    });

    const data = await response.json();
    const imagePrompt = data.choices[0].text.trim();
    fetchImageUrl(imagePrompt);
   //careerBossText.innerText = imagePrompt;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchImageUrl(imagePrompt){
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY0}`
    },
    body: JSON.stringify({
      prompt:`${imagePrompt}. There should be no text in this image.`,
      n: 1,
      size: '512x512',
      response_format: 'b64_json'
    })
  };
  fetch(url1, requestOptions)
  .then(response => response.json())
  .then(data => {
    //const imageData = data.data[0].b64_json;
    if (data.data && data.data.length > 0) {
      document.getElementById('output-img-container').innerHTML = `<img src="data:image/png;base64,${data.data[0].b64_json}">`;
    }
    setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
    document.getElementById('view-pitch-btn').addEventListener('click', ()=>{
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    careerBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
  })
}



// Helper function to handle fetch and rate limits
async function fetchAPI(url, options) {
  const response = await fetch(url, options);
  if (response.status === 429) {
    // Handle rate limit by waiting and retrying the request after a delay
    const retryAfter = parseInt(response.headers.get('Retry-After')) || 1;
    await sleep(retryAfter * 1000);
    return fetchAPI(url, options); // Retry the request
  }
  return response;
}

// Helper function to introduce delay using setTimeout
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

