import React from 'react';
import about_GurandaL from '../../assets/images/about_GurandaL.jpeg';
import about_SabohatS from '../../assets/images/about_SabohatS.jpeg';
import about_InaFK from '../../assets/images/about_InaFK.jpg';
import rsschool from '../../assets/images/logo-rsschool3.png';
import './About.css';

const teamMembers = [
  {
    name: 'Sabohat Sobirova',
    role: 'Frontend Developer',
    bio: 'I am Front-end developer with a strong foundation in web development. I am a fast learner and always eager to expand my knowledge and skills in front-end development. As for listing my top skills, I can name the followings: hard working, attentive to details. I am a team player with good problem-solving skills and a strong work ethic',
    github: 'https://github.com/Sabohatfrontend',
    photo: about_SabohatS,
  },
  {
    name: 'Guranda Lemonjava',
    role: 'Frontend Developer',
    bio: "Hello! I am Guranda, a Junior Frontend Developer with a passion for user-centric experiences in React. I'm also building my skills in backend (Node.js, Express, MongoDB) and cloud (SAP CAP) to grasp data flow and explore cloud options. This lets me collaborate seamlessly and build adaptable apps.",
    github: 'https://github.com/guranda26',
    photo: about_GurandaL,
  },
  {
    name: 'Ina Flaryanovich-Kukharava',
    role: 'Frontend Developer',
    bio: 'I am a UI Master in transforming designs into dynamic web pages. My portfolio spans e-commerce, e-learning, beauty, handmade, and internal company sites, handling both support for existing projects and full redesigns or new design implementation from scratch. I have successfully collaborated with teams of various sizes, following Agile methodologies. Currently, I am enhancing my skills through a course focused on JavaScript and related technologies such as React.js, TypeScript.',
    github: 'https://github.com/inafk',
    photo: about_InaFK,
  },
];

function About(): React.JSX.Element {
  return (
    <>
      <section className="team-section">
        <h2>Meet Our Development Team</h2>
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <img src={member.photo} alt={member.name} className="team-photo" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
              <a
                href={member.github}
                className="github-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        ))}
      </section>

      <section className="collaboration-section">
        <h2>Team Collaboration</h2>
        <p>
          Our team’s success is rooted in our effective collaboration and
          communication. We adopted Agile methodologies to ensure continuous
          improvement and rapid iteration. Regular stand-up meetings and code
          reviews fostered a collaborative environment where ideas were freely
          shared and problems were swiftly addressed.
        </p>
        <p>
          Utilizing tools such as GitHub for version control and Trello for
          project management, we maintained a high level of organization and
          transparency. Each members unique strengths and expertise contributed
          to the successful completion of the project, from initial concept to
          final deployment.
        </p>
        <p>
          Together, we overcame numerous challenges, including complex API
          integrations, state management issues, and performance optimizations,
          to deliver a robust and user-friendly application.
        </p>
      </section>

      <section className="conclusion-section">
        <h2>Contributions</h2>
        <p>
          Our React team, comprising Sabohat Sobirova, Guranda Lemonjava, and
          Ina Flaryanovich-Kukharava, has demonstrated exceptional dedication
          and technical prowess throughout the development process. By
          leveraging the React library, CommerceTools, and a well-configured
          development environment, we have created a successful product that
          meets the highest standards of quality and performance.
        </p>
      </section>

      <section className="school-section">
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img src={rsschool} alt="RS School" className="rs-school-logo" />
        </a>
      </section>
    </>
  );
}

export default About;
