import { createDirectus, rest, staticToken, createItem } from '@directus/sdk';

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_TOKEN = 'YOUR_ADMIN_TOKEN_HERE';

const directus = createDirectus(DIRECTUS_URL).with(staticToken(ADMIN_TOKEN)).with(rest());

async function seed() {
  try {
    const moSalahImage = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg';
    const newsImage = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80';
    const eventImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

    console.log('⏳ Seeding News...');
    const news = [
      { title: 'New Website Launch', slug: 'new-website-launch', summary: 'We launched our new website', content: '<p>Welcome to our brand new website, featuring a modern design and improved navigation.</p>', image: newsImage, published_date: new Date().toISOString(), status: 'published' },
      { title: 'Summer Internship', slug: 'summer-internship', summary: 'Internship applications are open', content: '<p>Apply now for our highly anticipated summer internship program.</p>', image: newsImage, published_date: new Date().toISOString(), status: 'published' },
      { title: 'Tech Conference', slug: 'tech-conference', summary: 'Join us at Tech Expo', content: '<p>We will be speaking at the upcoming Tech Expo. Come say hi!</p>', image: newsImage, published_date: new Date().toISOString(), status: 'published' },
      { title: 'Mobile App Release', slug: 'mobile-app-release', summary: 'Our mobile app is now live', content: '<p>Download our new mobile app from the App Store and Google Play.</p>', image: newsImage, published_date: new Date().toISOString(), status: 'published' },
      { title: 'AI Workshop', slug: 'ai-workshop', summary: 'Free AI workshop this Friday', content: '<p>Learn the basics of Artificial Intelligence in our hands-on workshop.</p>', image: newsImage, published_date: new Date().toISOString(), status: 'published' }
    ];
    for (const item of news) await directus.request(createItem('news', item));

    console.log('⏳ Seeding Events...');
    const events = [
      { title: 'React Meetup', slug: 'react-meetup', description: '<p>A local meetup for React developers.</p>', location: 'Cairo', event_date: '2026-08-01', image: eventImage, status: 'published' },
      { title: 'Hackathon', slug: 'hackathon', description: '<p>48-hour coding competition with great prizes.</p>', location: 'Alexandria', event_date: '2026-08-10', image: eventImage, status: 'published' },
      { title: 'Career Fair', slug: 'career-fair', description: '<p>Meet top employers and find your next job.</p>', location: 'Zagazig', event_date: '2026-08-20', image: eventImage, status: 'published' },
      { title: 'AI Summit', slug: 'ai-summit', description: '<p>The biggest AI summit in the region.</p>', location: 'Giza', event_date: '2026-09-01', image: eventImage, status: 'published' },
      { title: 'Startup Day', slug: 'startup-day', description: '<p>Pitch your startup idea to investors.</p>', location: 'Cairo', event_date: '2026-09-15', image: eventImage, status: 'published' }
    ];
    for (const item of events) await directus.request(createItem('events', item));

    console.log('⏳ Seeding Team Members...');
    const team = [
      { name: 'Mohamed Ali', position: 'Frontend Developer', bio: 'Expert in React and Next.js', image: moSalahImage, linkedin: 'https://linkedin.com', status: 'published' },
      { name: 'Sara Ahmed', position: 'UI/UX Designer', bio: 'Creates beautiful and intuitive interfaces', image: moSalahImage, linkedin: 'https://linkedin.com', status: 'published' },
      { name: 'Ahmed Hassan', position: 'Backend Developer', bio: 'Specializes in Node.js and Databases', image: moSalahImage, linkedin: 'https://linkedin.com', status: 'published' },
      { name: 'Omar Khaled', position: 'Project Manager', bio: 'Ensures projects are delivered on time', image: moSalahImage, linkedin: 'https://linkedin.com', status: 'published' },
      { name: 'Nour Ibrahim', position: 'QA Engineer', bio: 'Ensures the highest quality of our software', image: moSalahImage, linkedin: 'https://linkedin.com', status: 'published' }
    ];
    for (const item of team) await directus.request(createItem('team_members', item));

    console.log('✅ Data seeded successfully! Refresh your site now to see the content.');
  } catch (error) {
    console.error('❌ An error occurred. Please make sure:');
    console.error('   1. You have created the Collections in Directus first.');
    console.error('   2. The "image" field type is String (Input), NOT File.');
    console.error('   3. Your DIRECTUS_URL and ADMIN_TOKEN in this file are correct.');
    console.error('   4. Directus server is actually running.');
    if(error.errors) console.error(error.errors);
    else console.error(error.message);
  }
}

seed();
