import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve frontend static files
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const lowerMessage = message.toLowerCase();

  const formatResponse = (response) => response;

  try {
    // Greetings
    if (
      ["hi", "hello", "hai", "hii", "hey"].some((greet) =>
        lowerMessage.includes(greet)
      )
    ) {
      return res.json({
        reply: formatResponse(
          "Hello! I am GandhigramBot. How can I assist you today regarding Gandhigram University?"
        ),
      });

      // UG courses
    } else if (
      lowerMessage.includes("ug course") ||
      lowerMessage.includes("undergraduate") ||
      lowerMessage.includes("ug")
    ) {
      return res.json({
        reply: formatResponse(`🎓Undergraduate (UG) Courses:
- B.A. Economics
- B.Sc. Computer Science
- B.Com
- B.Tech Civil
- B.Sc. Physics
- B.Ed, etc.`),
      });
    } else if (
      lowerMessage.includes("ug fees") ||
      lowerMessage.includes("ug course fees") ||
      lowerMessage.includes("ug fees structure")
    ) {
      return res.json({
        reply: formatResponse(`🎓 UG Course Fees Structure:

- B.A. Economics: ₹10,000 per year  
- B.Sc. Physics: ₹12,000 per year  
- B.Sc. Chemistry: ₹12,000 per year  
- B.Com: ₹11,000 per year  
- B.Ed: ₹13,000 per year`),
      });
    } else if (
      lowerMessage.includes("pg course") ||
      lowerMessage.includes("postgraduate") ||
      lowerMessage.includes("pg")
    ) {
      return res.json({
        reply: formatResponse(`🎓Postgraduate (PG) Courses:
- M.Sc. Physics
- M.Sc. Chemistry
- M.A. Tamil
- M.A. Development Studies
- M.Com
- MBA
- M.Ed, etc.`),
      });
    } else if (
      lowerMessage.includes("pg fees") ||
      lowerMessage.includes("pg course fees") ||
      lowerMessage.includes("pg fees structure") ||
      lowerMessage.includes("postgraduate fees")
    ) {
      return res.json({
        reply: formatResponse(`🎓 PG Course Fees Structure:

- M.Sc. Physics: ₹15,000 per year  
- M.Sc. Chemistry: ₹15,000 per year  
- M.A. Tamil: ₹12,000 per year  
- M.A. Development Studies: ₹12,000 per year  
- M.Com: ₹12,000 per year  
- MBA: ₹25,000 per year  
- M.Ed: ₹20,000 per year`),
      });
    } else if (
      lowerMessage.includes("diploma course fees structure") ||
      lowerMessage.includes("diploma fees") ||
      lowerMessage.includes("diploma course fees")
    ) {
      return res.json({
        reply: formatResponse(`💰Diploma Course Fees Structure:
- Diploma in Sanitation: ₹5,000 per year
- Diploma in Agriculture: ₹6,000 per year
- Diploma in Computer Applications: ₹8,000 per year
- Diploma in Rural Health: ₹7,000 per year
- Diploma in Nutrition and Dietetics: ₹7,500 per year.`),
      });
    } else if (
      lowerMessage.includes("diploma course") ||
      lowerMessage.includes("diploma courses") ||
      lowerMessage.includes("diploma")
    ) {
      return res.json({
        reply: formatResponse(`📘Diploma Courses:
- Diploma in Sanitation
- Agriculture
- Computer Applications
- Rural Health
- Nutrition and Dietetics.    
🎓 Scholarships available for SC/ST and economically weaker students.`),
      });
    } else if (
      lowerMessage.includes("courses offered") ||
      lowerMessage.includes("available courses") ||
      lowerMessage.includes("courses") ||
      lowerMessage.includes("available course")
    ) {
      return res.json({
        reply: formatResponse(`🎓Courses Offered:
Undergraduate (UG):
- B.A. Economics, B.Sc. Computer Science, B.Com, B.Tech Civil, B.Sc. Physics, B.Ed, etc.

Postgraduate (PG):
- M.Sc. Physics, M.Sc. Chemistry, M.A. Tamil, M.A. Development Studies, M.Com, MBA, M.Ed, etc.

Diploma:
- Diploma in Sanitation, Agriculture, Computer Applications, Rural Health, Nutrition and Dietetics.`),
      });
    } else if (
      lowerMessage.includes("facility") ||
      lowerMessage.includes("facilities")
    ) {
      return res.json({
        reply: formatResponse(`Facilities:
- Transport, Library, Laboratories, Internet, Cafeteria, Canteen, Green Park, Parking, Computer Lab with 200+ computers, Server Room, and CCTV Surveillance.`),
      });
    } else if (
      lowerMessage.includes("transport facilities") ||
      lowerMessage.includes("transportation") ||
      lowerMessage.includes("bus") ||
      lowerMessage.includes("transport")
    ) {
      return res.json({
        reply: formatResponse(`Transport Facilities:
- University buses connect major towns and cities around Dindigul, making commute convenient for students and staff.`),
      });
    } else if (
      lowerMessage.includes("library") ||
      lowerMessage.includes("books") ||
      lowerMessage.includes("reading room") ||
      lowerMessage.includes("library facilities")
    ) {
      return res.json({
        reply: formatResponse(`📚Library:
- Extensive library with a vast collection of books, journals, and digital resources to support academic research and learning.`),
      });
    } else if (
      lowerMessage.includes("canteen") ||
      lowerMessage.includes("cafeteria") ||
      lowerMessage.includes("food")
    ) {
      return res.json({
        reply: formatResponse(`☕Canteen:
- On-campus canteen serving nutritious meals at affordable prices.
- Hygienic and affordable food
- Separate vegetarian and non-veg sections
- Snacks, meals, beverages available`),
      });
    } else if (
      lowerMessage.includes("green park") ||
      lowerMessage.includes("park") ||
      lowerMessage.includes("garden")
    ) {
      return res.json({
        reply: formatResponse(`Green Park:
- Lush green spaces for relaxation, study, and recreational activities.`),
      });
    } else if (
      lowerMessage.includes("parking facilities") ||
      lowerMessage.includes("parking") ||
      lowerMessage.includes("vehicle parking")
    ) {
      return res.json({
        reply: formatResponse(`Parking Facilities:
- Ample parking space available for students, staff, and visitors.`),
      });
    } else if (
      lowerMessage.includes("computer lab") ||
      lowerMessage.includes("computer facilities") ||
      lowerMessage.includes("computers")
    ) {
      return res.json({
        reply: formatResponse(`💻Computer Lab:
- Well-equipped computer lab with over 200 computers, high-speed internet, and modern software for academic use.`),
      });
    } else if (
      lowerMessage.includes("server room") ||
      lowerMessage.includes("server facilities") ||
      lowerMessage.includes("network room")
    ) {
      return res.json({
        reply: formatResponse(`Server Room:
- Centralized server room for managing network and data services, ensuring smooth connectivity across campus.`),
      });
    } else if (
      lowerMessage.includes("cctv") ||
      lowerMessage.includes("surveillance") ||
      lowerMessage.includes("security")
    ) {
      return res.json({
        reply: formatResponse(`CCTV Surveillance:
- Comprehensive CCTV coverage across campus for enhanced security and safety of students and staff.`),
      });
    } else if (
      lowerMessage.includes("internet") ||
      lowerMessage.includes("wifi") ||
      lowerMessage.includes("data speed")
    ) {
      return res.json({
        reply: formatResponse(`Internet Facilities:
- High-speed internet access available throughout the campus, including hostels and common areas.`),
      });
    } else if (
      lowerMessage.includes("sports facilities") ||
      lowerMessage.includes("sports") ||
      lowerMessage.includes("athletics")
    ) {
      return res.json({
        reply: formatResponse(`🏅Sports Facilities:
- Comprehensive sports facilities including indoor and outdoor courts, gymnasium, and playgrounds for various sports activities.`),
      });
    } else if (
      lowerMessage.includes("sports achievements") ||
      lowerMessage.includes("sports awards") ||
      lowerMessage.includes("sports recognition")
    ) {
      return res.json({
        reply: formatResponse(`Sports Achievements:
            - The university has won numerous intercollegiate and district-level sports awards, showcasing excellence in athletics.`),
      });
    } else if (
      lowerMessage.includes("academic achievements") ||
      lowerMessage.includes("academic awards") ||
      lowerMessage.includes("academic recognition")
    ) {
      return res.json({
        reply: formatResponse(`Academic Achievements:
- The university consistently ranks among the top in Tamil Nadu, with significant contributions to research and project grants.`),
      });
    } else if (
      lowerMessage.includes("alumni") ||
      lowerMessage.includes("alumni network") ||
      lowerMessage.includes("former students")
    ) {
      return res.json({
        reply: formatResponse(`Alumni Network:
- The university has a strong alumni network with graduates placed globally in reputed companies, academia, and public service.`),
      });
    } else if (
      lowerMessage.includes("green spaces") ||
      lowerMessage.includes("garden") ||
      lowerMessage.includes("park")
    ) {
      return res.json({
        reply: formatResponse(`Green Spaces:
- The campus features lush gardens and parks that enhance the aesthetic appeal and provide a serene environment for students.`),
      });
    } else if (
      lowerMessage.includes("how to reach") ||
      lowerMessage.includes("reach us") ||
      lowerMessage.includes("directions")
    ) {
      return res.json({
        reply: formatResponse(`How to Reach:
- By Road: Buses from Madurai and Dindigul.
- By Rail: Nearest railway station is Ambathurai (4 km from campus).
- By Air: Nearest airport is Madurai Airport (70 km from campus).`),
      });
    } else if (
      lowerMessage.includes("associations") ||
      lowerMessage.includes("clubs") ||
      lowerMessage.includes("societies") ||
      lowerMessage.includes("association clubs") ||
      lowerMessage.includes("associationclub")
    ) {
      return res.json({
        reply: formatResponse(`👥Associations & Clubs:
- The university has various associations and clubs including NCC, NSS, JRC, YRC, Eco Club, Computer Club, Literary Society, etc., promoting extracurricular activities and student engagement.`),
      });
    } else if (
      lowerMessage.includes("ncc") ||
      lowerMessage.includes("national cadet corps")
    ) {
      return res.json({
        reply: formatResponse(`NCC (National Cadet Corps):
- The NCC unit at the university instills discipline, leadership, and patriotism among students through various camps, parades, and service activities.`),
      });
    } else if (
      lowerMessage.includes("nss") ||
      lowerMessage.includes("national service scheme")
    ) {
      return res.json({
        reply: formatResponse(`NSS (National Service Scheme):
- The NSS unit engages students in community service, rural development, blood donation drives, and awareness campaigns, fostering social responsibility.`),
      });
    } else if (
      lowerMessage.includes("jrc") ||
      lowerMessage.includes("junior red cross")
    ) {
      return res.json({
        reply: formatResponse(`JRC (Junior Red Cross):
- The JRC unit focuses on humanitarian service, first aid training, and participation in emergency relief activities, promoting a culture of care and service among students.`),
      });
    } else if (
      lowerMessage.includes("yrc") ||
      lowerMessage.includes("youth red cross")
    ) {
      return res.json({
        reply: formatResponse(`YRC (Youth Red Cross:
- The YRC unit encourages youth to contribute to the community through health, hygiene, and humanitarian activities, fostering a spirit of service and compassion.`),
      });
    } else if (
      lowerMessage.includes("eco club") ||
      lowerMessage.includes("eco") ||
      lowerMessage.includes("environment club")
    ) {
      return res.json({
        reply: formatResponse(`Eco Club:
- The Eco Club promotes environmental awareness through activities like tree planting, clean campus drives, and sustainability education, encouraging students to be environmentally conscious.`),
      });
    } else if (
      lowerMessage.includes("computer club") ||
      lowerMessage.includes("computer society") ||
      lowerMessage.includes("coding club")
    ) {
      return res.json({
        reply: formatResponse(`Computer Club:
- The Computer Club hosts coding contests, tech seminars, and workshops on the latest tools and innovations in computing, providing a platform for students to enhance their technical skills.`),
      });
    } else if (
      lowerMessage.includes("literary club") ||
      lowerMessage.includes("literary society") ||
      lowerMessage.includes("literature club")
    ) {
      return res.json({
        reply: formatResponse(`Literary Society:
- The Literary Society encourages creative writing, poetry, debates, and quizzes, providing a platform for expression and intellectual exchange among students.`),
      });
    } else if (
      lowerMessage.includes("innovative") ||
      lowerMessage.includes("initiative") ||
      lowerMessage.includes("innovation")
    ) {
      return res.json({
        reply: formatResponse(`Innovative Initiatives:
- The university promotes innovative initiatives such as training in mechanical, computer, and literacy skills within the campus, enhancing students' practical knowledge and employability.`),
      });
    } else if (
      lowerMessage.includes("fees") ||
      lowerMessage.includes("fee structure")
    ) {
      return res.json({
        reply: formatResponse(`📘 Gandhigram University Fee Structure:

🎓 UG Courses (per year):
- B.A. Economics: ₹16,320
- B.Com (Co-operation): ₹18,820
- B.B.A.: ₹19,320
- B.Sc. Maths/Physics/Home Sci: ₹17,070
- B.Sc. Chemistry: ₹19,070
- B.Sc. Textiles & Fashion Design: ₹35,570
- B.Tech Civil Engg: ₹46,370

🎓 PG Courses (per year):
- M.A. Tamil/Eco/Rural Dev.: ₹15,720 – ₹19,720
- M.A. English & Comms: ₹22,670
- M.Com (Co-op): ₹24,720
- M.Sc. Chemistry: ₹26,970
- M.Sc. Microbiology: ₹48,470
- MBA: ₹32,020
- M.Ed: ₹27,270

📜 PG Diplomas:
- Epigraphy: ₹23,070
- Sanitary Inspector: ₹56,520
- Yoga: ₹16,520`),
      });
    } else if (
      lowerMessage.includes("hostel") ||
      lowerMessage.includes("accommodation") ||
      lowerMessage.includes("hostel facilities") ||
      lowerMessage.includes("rooms") ||
      lowerMessage.includes("room/shostel rooms")
    ) {
      return res.json({
        reply: formatResponse(`🏨Hostel:
- Separate hostels for boys and girls with dining, study rooms, Wi-Fi, and security.`),
      });
    } else if (
      lowerMessage.includes("admission status") ||
      lowerMessage.includes("admission process") ||
      lowerMessage.includes("admission open")
    ) {
      return res.json({
        reply: formatResponse(`Admission Status:
- Admissions are open as per academic schedule. Visit www.ruraluniv.ac.in for updates.`),
      });
    } else if (
      lowerMessage.includes("laborator") ||
      lowerMessage.includes("lab") ||
      lowerMessage.includes("labs") ||
      lowerMessage.includes("laboratories")
    ) {
      return res.json({
        reply: formatResponse(`🔬Laboratories:
- Equipped for Physics, Chemistry, Biology, Computer Science, and Engineering practicals.`),
      });
    } else if (
      lowerMessage.includes("number of computers") ||
      lowerMessage.includes("computers available")
    ) {
      return res.json({
        reply: formatResponse(
          `There are more than 200 computers available for student and faculty use.`
        ),
      });
    } else if (
      lowerMessage.includes("server room") ||
      lowerMessage.includes("server facilities") ||
      lowerMessage.includes("network room") ||
      lowerMessage.includes("serverroom")
    ) {
      return res.json({
        reply: formatResponse(`Server Room:
- Centralized server room for network and data management.`),
      });
    } else if (
      lowerMessage.includes("surveillance") ||
      lowerMessage.includes("security") ||
      lowerMessage.includes("cctv")
    ) {
      return res.json({
        reply: formatResponse(`Surveillance:
- CCTV coverage across campus for safety and security.`),
      });
    } else if (
      lowerMessage.includes("data speed") ||
      lowerMessage.includes("internet speed") ||
      lowerMessage.includes("wifi") ||
      lowerMessage.includes("dataspeed")
    ) {
      return res.json({
        reply: formatResponse(`Internet Speed:
- High-speed internet across campus.`),
      });
    } else if (
      lowerMessage.includes("parking") ||
      lowerMessage.includes("vehicle") ||
      lowerMessage.includes("car")
    ) {
      return res.json({
        reply: formatResponse(`Parking:
- Designated parking for students, staff, and visitors.`),
      });
    } else if (
      lowerMessage.includes("association") ||
      lowerMessage.includes("club") ||
      lowerMessage.includes("society")
    ) {
      return res.json({
        reply: formatResponse(`👥Associations & Clubs:
- NCC, NSS, JRC, YRC, Eco Club, Computer Club, Literary Society, etc.`),
      });
    } else if (
      lowerMessage.includes("social responsibility") ||
      lowerMessage.includes("csr") ||
      lowerMessage.includes("community service")
    ) {
      return res.json({
        reply: formatResponse(`Social Responsibilities:
- Community outreach, cleanliness drives, health camps, and rural upliftment.`),
      });
    } else if (
      lowerMessage.includes("out reach") ||
      lowerMessage.includes("outreach") ||
      lowerMessage.includes("community engagement")
    ) {
      return res.json({
        reply: formatResponse(`Outreach Programmes:
- Community engagement, rural health awareness, and service learning.`),
      });
    } else if (
      lowerMessage.includes("dress code") ||
      lowerMessage.includes("attire") ||
      lowerMessage.includes("uniform")
    ) {
      return res.json({
        reply: formatResponse(`Dress Code:
- Modest and formal attire encouraged as per university culture.`),
      });
    } else if (
      lowerMessage.includes("examination") ||
      lowerMessage.includes("exam") ||
      lowerMessage.includes("semester")
    ) {
      return res.json({
        reply: formatResponse(`Examinations:
- Semester exams conducted as per the academic calendar.`),
      });
    } else if (
      lowerMessage.includes("holiday") ||
      lowerMessage.includes("holidays") ||
      lowerMessage.includes("vacation")
    ) {
      return res.json({
        reply: formatResponse(`Holidays:
- As per Tamil Nadu state government academic calendar.`),
      });
    } else if (
      lowerMessage.includes("festival") ||
      lowerMessage.includes("celebration") ||
      lowerMessage.includes("event")
    ) {
      return res.json({
        reply: formatResponse(`Festivals & Celebrations:
- University Day, Founder's Day, Hostel Day, Freshers Day, Intercollege Meet and more.
See Gallery: https://www.ruraluniv.ac.in/gallery/festivals`),
      });

      // Founder's Day - Updated image URL for production
    } else if (
      lowerMessage.includes("founder day") ||
      lowerMessage.includes("founder's day") ||
      lowerMessage.includes("founder")
    ) {
      return res.json({
        reply: formatResponse(`Founder's Day:
<br>- Celebrated to honor Dr. G. Ramachandran, the visionary behind Gandhigram University. The day includes speeches, cultural events, and student recognition.<br><img src="/public/images/founder.jpg" alt="Founder" width="300">`),
      });

      // University Day
    } else if (
      lowerMessage.includes("university day") ||
      lowerMessage.includes("university's day")
    ) {
      return res.json({
        reply: formatResponse(`University Day:
- Marks the anniversary of the university's founding. It features academic presentations, guest lectures, and award ceremonies.
- University Day: https://www.ruraluniv.ac.in/events/university-day`),
      });

      // College Day
    } else if (
      lowerMessage.includes("college day") ||
      lowerMessage.includes("college's day")
    ) {
      return res.json({
        reply: formatResponse(`College Day:
- A celebration of campus life, talent, and student achievements. Includes cultural programs, prize distribution, and alumni talks.
- College Day: https://www.ruraluniv.ac.in/events/college-day`),
      });
    } else if (
      lowerMessage.includes("gandhigram") ||
      lowerMessage.includes("history") ||
      lowerMessage.includes("background") ||
      lowerMessage.includes("about gandhigram") ||
      lowerMessage.includes("college")
    ) {
      return res.json({
        reply: formatResponse(`Gandhigram University:
- Established in 1956 by Dr. G. Ramachandran, a close associate of Mahatma Gandhi.
- Focuses on rural development, education, and social justice.
- Offers a range of undergraduate, postgraduate, and diploma courses.
- Located in Gandhigram, Tamil Nadu, India.
- Known for its commitment to Gandhian principles of self-reliance, sustainability, and community service.`),
      });
    } else if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("where is gandhigram") ||
      lowerMessage.includes("address")
    ) {
      return res.json({
        reply: formatResponse(`Location:
Gandhigram Rural Institute,
Gandhigram - 624302,
Dindigul District, Tamil Nadu, India.
Google Maps: https://maps.app.goo.gl/uXKko2B62EeTKDKq5`),
      });
    } else if (lowerMessage.includes("contact information")) {
      return res.json({
        reply: formatResponse(`Contact Information:
- Website: www.ruraluniv.ac.in
- Phone: +91-451-2452371
- Email: registrar@ruraluniv.ac.in`),
      });
    } else if (lowerMessage.includes("website")) {
      return res.json({
        reply: formatResponse(`
   🌐Website: [ruraluniv.ac.in](https://www.ruraluniv.ac.in)`),
      });
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("phone")
    ) {
      return res.json({
        reply: formatResponse(`
-📞Phone: +91-451-2452371`),
      });
    } else if (lowerMessage.includes("email")) {
      return res.json({
        reply: formatResponse(`
- 📧Email: registrar@ruraluniv.ac.in`),
      });
    } else if (
      lowerMessage.includes("sanitary office") ||
      lowerMessage.includes("sanitary inspector") ||
      lowerMessage.includes("sanitary number")
    ) {
      return res.json({
        reply: formatResponse(`Sanitary office number: 0451-2452371
- The Sanitary Inspector's office handles health and hygiene-related queries and services on campus.`),
      });
    } else if (
      lowerMessage.includes("main office number") ||
      lowerMessage.includes("main office") ||
      lowerMessage.includes("main office contact")
    ) {
      return res.json({
        reply: formatResponse(`Main Office Number: 0451-2452371
- The main office handles general inquiries, admissions, and administrative services.`),
      });
    } else if (
      lowerMessage.includes("admission office") ||
      lowerMessage.includes("admission office number") ||
      lowerMessage.includes("admission contact")
    ) {
      return res.json({
        reply: formatResponse(`Admission Office Number: 0451-2452371
- The admission office provides information on courses, eligibility, and application procedures.`),
      });
    } else if (
      lowerMessage.includes("registrar office") ||
      lowerMessage.includes("registrar contact") ||
      lowerMessage.includes("registrar number")
    ) {
      return res.json({
        reply: formatResponse(`Registrar Office Number: 0451-2452371
- The registrar's office manages academic records, examinations, and official communications.`),
      });
    } else if (
      lowerMessage.includes("general office") ||
      lowerMessage.includes("general office number") ||
      lowerMessage.includes("general office contact")
    ) {
      return res.json({
        reply: formatResponse(`General Office Number: 0451-2452371
- The general office handles administrative tasks, student services, and general inquiries.`),
      });
    } else if (
      lowerMessage.includes("security") ||
      lowerMessage.includes("security office") ||
      lowerMessage.includes("security contact")
    ) {
      return res.json({
        reply: formatResponse(`Security office: 0451-2452371
- The security office ensures the safety and security of the campus and its residents. For any security-related issues, please contact them at the number above.`),
      });
    } else if (
      lowerMessage.includes("controller of examinations") ||
      lowerMessage.includes("controller contact") ||
      lowerMessage.includes("controller number")
    ) {
      return res.json({
        reply: formatResponse(`Controller of Examinations Number: 0451-2452371
- The Controller of Examinations oversees all examination-related activities, including schedules, results, and academic policies.`),
      });
    } else if (
      lowerMessage.includes("hostel contact") ||
      lowerMessage.includes("hostel number") ||
      lowerMessage.includes("hostel office")
    ) {
      return res.json({
        reply: formatResponse(`Hostel Office Number: 0451-2452371
- The hostel office manages accommodation, facilities, and student welfare in hostels.`),
      });
    } else {
      // Fallback to OpenAI only if API key is available
      if (!process.env.OPENAI_API_KEY) {
        return res.json({
          reply: formatResponse("I can help you with questions about Gandhigram University courses, facilities, fees, contact information, and more. Please ask me something specific about the university!"),
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are GandhigramBot, a helpful assistant for Gandhigram University. Answer questions based only on the university's courses, facilities, contact info, and background.`,
          },
          { role: "user", content: message },
        ],
      });

      return res.json({
        reply: formatResponse(completion.choices[0].message.content.trim()),
      });
    }
  } catch (err) {
    console.error("Error:", err.response?.data || err.message || err);
    return res
      .status(500)
      .json({ reply: "Server error. Please try again later." });
  }
});

// Serve index.html for all unmatched routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Use PORT from environment variables (Render provides this)
const PORT = process.env.PORT || 4003;
app.listen(PORT,() => {
  console.log(`🚀 Server running on port ${PORT}`);
});