import React from 'react';
import './About.css';

function About(): React.JSX.Element {
  return (
    <>
 
        <section class="team-section">
            <h2>Meet Our Development Team</h2>

            <div class="team-member">
                <img src="path_to_sabohat_photo.jpg" alt="Sabohat Sobirova" class="team-photo" />
                <div class="team-info">
                    <h3>Sabohat Sobirova</h3>
                    <p class="role">Frontend Developer</p>
                    <p class="bio">Sabohat is a frontend developer with a knack for creating intuitive user interfaces. She played a crucial role in implementing the responsive design.</p>
                    <p class="contributions"><strong>Contributions:</strong> Sabohat led the development of the Home Page and Catalog Page features, overcoming significant challenges related to state management and API integration. Her innovative approach to component design has streamlined our codebase and improved performance.</p>
                    <a href="https://github.com/sabohat-sobirova" class="github-link">GitHub Profile</a>
                </div>
            </div>

            <div class="team-member">
                <img src="path_to_guranda_photo.jpg" alt="Guranda Lemonjava" class="team-photo" />
                <div class="team-info">
                    <h3>Guranda Lemonjava</h3>
                    <p class="role">Frontend Developer</p>
                    <p class="bio">Guranda specializes in building scalable web applications. With a strong background in JavaScript and TypeScript, she has been instrumental in enhancing the projects frontend architecture.</p>
                    <p class="contributions"><strong>Contributions:</strong> Guranda focused on optimizing the performance of our application, implementing Pegistration Page, Product Page and Basket Page. She played a key role in integrating CommerceTools for our API client, ensuring seamless data transactions. She also contributed significantly to the setup and configuration of Vite, TypeScript, ESLint, Prettier, Husky, and Vitest, ensuring a smooth development workflow.</p>
                    <a href="https://github.com/guranda-lemonjava" class="github-link">GitHub Profile</a>
                </div>
            </div>

            <div class="team-member">
                <img src="path_to_ina_photo.jpg" alt="Ina Flaryanovich-Kukharava" class="team-photo" />
                <div class="team-info">
                    <h3>Ina Flaryanovich-Kukharava</h3>
                    <p class="role">Frontend Developer</p>
                    <p class="bio">Ina is a dedicated developer who is eager to learn and grow in the field of web development. She is contributing to the project and gaining hands-on experience with real-world applications.</p>
                    <p class="contributions"><strong>Contributions:</strong> Ina was responsible for Login Page, Profile Page and About Page implementation.</p>
                    <a href="https://github.com/ina-flaryanovich" class="github-link">GitHub Profile</a>
                </div>
            </div>
        </section>

        <section class="collaboration-section">
            <h2>Team Collaboration</h2>
            <p>Our team’s success is rooted in our effective collaboration and communication. We adopted Agile methodologies to ensure continuous improvement and rapid iteration. Regular stand-up meetings and code reviews fostered a collaborative environment where ideas were freely shared and problems were swiftly addressed.</p>
            <p>Utilizing tools such as GitHub for version control and Trello for project management, we maintained a high level of organization and transparency. Each members unique strengths and expertise contributed to the successful completion of the project, from initial concept to final deployment.</p>
            <p>Together, we overcame numerous challenges, including complex API integrations, state management issues, and performance optimizations, to deliver a robust and user-friendly application.</p>
        </section>

        <section class="conclusion-section">
            <h2>Conclusion</h2>
            <p>Our React team, comprising Sabohat Sobirova, Guranda Lemonjava, and Ina Flaryanovich-Kukharava, has demonstrated exceptional dedication and technical prowess throughout the development process. By leveraging the React library, CommerceTools, and a well-configured development environment, we have created a successful product that meets the highest standards of quality and performance.</p>
        </section>

    </>
  );
}

export default About;
