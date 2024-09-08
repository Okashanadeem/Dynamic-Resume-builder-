document.getElementById('resume-form')!.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const location = (document.getElementById('location') as HTMLInputElement).value;
  const dob = (document.getElementById('dob') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

  // Handle image upload
  const fileInput = document.getElementById('profile-pic') as HTMLInputElement;
  const file = fileInput.files?.[0];
  let profilePicURL = '';

  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          profilePicURL = e.target!.result as string;
          generateResume();
      };
      reader.readAsDataURL(file);
  } else {
      generateResume();
  }

  function generateResume() {
      const resumeOutput = `
          <header>
              ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">` : ''}
              <h1>${name}</h1>
              <p>Email: ${email}</p>
              <p>Phone: ${phone}</p>
              <p>Location: ${location}</p>
              <p>Date of Birth: ${dob}</p>
          </header>
          <section id="education">
              <h2>Education</h2>
              <p>${education}</p>
          </section>
          <section id="work-experience">
              <h2>Work Experience</h2>
              <p>${workExperience}</p>
          </section>
          <section id="skills">
              <h2>Skills</h2>
              <ul>
                  ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
              </ul>
          </section>
      `;

      document.getElementById('resume-output')!.innerHTML = resumeOutput;
      document.getElementById('generated-resume')!.style.display = 'block';
  }
});
