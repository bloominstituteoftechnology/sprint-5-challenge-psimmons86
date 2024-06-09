async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  try {
    // Fetch data from both endpoints
    const learnersResponse = await fetch('http://localhost:3003/api/learners');
    const mentorsResponse = await fetch('http://localhost:3003/api/mentors');

    // Check if the fetch was successful
    if (!learnersResponse.ok || !mentorsResponse.ok) {
      throw new Error('Failed to fetch data from endpoints');
    }

    const learnersData = await learnersResponse.json();
    const mentorsData = await mentorsResponse.json();

    // Log the fetched data for debugging
    console.log('Learners Data:', learnersData);
    console.log('Mentors Data:', mentorsData);

    // Combine the data into a single data structure
    const combinedData = learnersData.map(learner => {
      return {
        id: learner.id,
        email: learner.email,
        fullName: learner.fullName,
        mentors: learner.mentorIds.map(id => {
          const mentor = mentorsData.find(mentor => mentor.id === id);
          return mentor ? mentor.fullName : null;
        }).filter(name => name)
      };
    });

    // Log the combined data for debugging
    console.log('Combined Data:', combinedData);

    // Create a function to generate a learner card
    function createLearnerCard(learner) {
      const card = document.createElement('div');
      card.className = 'learner-card';

      const name = document.createElement('h3');
      name.textContent = learner.fullName;
      card.appendChild(name);

      const email = document.createElement('p');
      email.textContent = `Email: ${learner.email}`;
      card.appendChild(email);

      const mentorList = document.createElement('ul');
      mentorList.className = 'mentor-list hidden';
      learner.mentors.forEach(mentor => {
        const mentorItem = document.createElement('li');
        mentorItem.textContent = mentor;
        mentorList.appendChild(mentorItem);
      });
      card.appendChild(mentorList);

      card.addEventListener('click', () => {
        card.classList.toggle('highlighted');
        mentorList.classList.toggle('hidden');
      });

      return card;
    }

    // Render the learner cards to the DOM
    const container = document.getElementById('learners-container');
    combinedData.forEach(learner => {
      const card = createLearnerCard(learner);
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
