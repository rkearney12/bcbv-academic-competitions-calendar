// Edit this file to update the calendar. See README.md for the field guide.
// Timings below are typical month-level windows transcribed from the supplied
// reference calendar. Exact dates, eligibility and official URLs need checking.

export const competitions = [
  { id: "conrad", name: "Conrad Challenge", subjects: ["Engineering", "Science", "Business"], month: 8, phase: "Registration typically opens", department: "Science / Design Technology", status: "Department considering" },
  { id: "hcgcc", name: "Harvard Crimson Global Case Competition", subjects: ["Business", "Economics"], month: 8, phase: "Registration typically opens", department: "Business & Economics", status: "Department considering" },
  { id: "wsc", name: "World Scholar’s Cup", subjects: ["English", "Humanities", "Science"], month: 8, phase: "Global rounds typically in final phase", department: "English / Humanities", status: "Department considering" },
  { id: "ymun", name: "Yale Model United Nations (YMUN)", subjects: ["Humanities", "History"], month: 9, phase: "Registration typically opens", department: "Humanities", status: "Department considering" },
  { id: "hmun", name: "Harvard Model United Nations (HMUN Boston)", subjects: ["Humanities", "History"], month: 9, phase: "Registration typically opens", department: "Humanities", status: "Department considering" },
  { id: "wharton", name: "Wharton Global High School Investment Competition", subjects: ["Economics", "Business", "Mathematics"], month: 9, phase: "Typical participation window begins (Sep–Apr)", department: "Business & Economics", status: "Department considering" },
  { id: "concord", name: "The Concord Review", subjects: ["History", "English"], month: 9, phase: "Typical opening / submission cycle", department: "History / English", status: "Department considering" },
  { id: "moot", name: "International High School Moot Court", subjects: ["Law"], month: 9, phase: "Registration typically opens", department: "Humanities", status: "Department considering" },
  { id: "earth-prize", name: "The Earth Prize", subjects: ["Science", "Engineering"], month: 10, phase: "Registration typically opens", department: "Science / Design Technology", status: "Department considering" },
  { id: "amc", name: "American Mathematics Competition 10/12", subjects: ["Mathematics"], month: 10, phase: "Registration typically opens; competition typically November", department: "Mathematics", status: "Department considering" },
  { id: "writing-olympiad", name: "International Writing Olympiad", subjects: ["English"], month: 10, phase: "Registration typically opens", department: "English", status: "Department considering" },
  { id: "blue-ocean", name: "Blue Ocean Competition", subjects: ["Business", "Economics"], month: 11, phase: "Registration typically opens", department: "Business & Economics", status: "Department considering" },
  { id: "ritangle", name: "Ritangle", subjects: ["Mathematics"], month: 11, phase: "Competition typically active", department: "Mathematics", status: "Department considering" },
  { id: "diamond", name: "Diamond Challenge", subjects: ["Business", "Economics"], month: 12, phase: "Registration typically opens", department: "Business & Economics", status: "Department considering" },
  { id: "rethink", name: "Cambridge Re:Think Essay Competition", subjects: ["Medicine", "Science", "Philosophy", "English"], month: 1, phase: "Typically open for registration", department: "English / Science / Humanities", status: "Department considering" },
  { id: "im2c", name: "International Mathematical Modeling Challenge", subjects: ["Mathematics", "Science"], month: 1, phase: "Registration typically opens", department: "Mathematics", status: "Department considering" },
  { id: "first", name: "FIRST Robotics Competition", subjects: ["Engineering", "Science"], month: 2, phase: "Registration / programme activity typically underway", department: "Design Technology / Science", status: "Department considering" },
  { id: "m3", name: "MathWorks Math Modeling Challenge", subjects: ["Mathematics", "Engineering"], month: 2, phase: "Registration typically opens", department: "Mathematics", status: "Department considering" },
  { id: "dna", name: "Annual DNA Day Essay Contest", subjects: ["Medicine", "Science", "English"], month: 3, phase: "Registration / submission cycle typically opens", department: "Science / English", status: "Department considering" },
  { id: "john-locke", name: "John Locke Essay Competition", subjects: ["Law", "Economics", "History", "Philosophy", "Humanities"], month: 3, phase: "Questions typically released; later deadlines need verification", department: "Humanities / Business & Economics", status: "Department considering" },
  { id: "breakthrough", name: "Breakthrough Junior Challenge", subjects: ["Science", "Mathematics"], month: 4, phase: "Registration typically opens", department: "Science / Mathematics", status: "Department considering" },
  { id: "stockholm", name: "Stockholm Junior Water Prize", subjects: ["Science", "Engineering"], month: 4, phase: "Typical annual cycle active", department: "Science / Design Technology", status: "Department considering" },
  { id: "regen-iseff", name: "Regeneron International Science and Engineering Fair", subjects: ["Science", "Engineering", "Medicine"], month: 5, phase: "Participation period typically in May", department: "Science / Design Technology", status: "Department considering" },
  { id: "queens", name: "The Queen’s Commonwealth Essay Competition", subjects: ["English", "History", "Humanities"], month: 6, phase: "Registration / submission period typically active", department: "English / Humanities", status: "Department considering" },
  { id: "nyt-summer", name: "New York Times Summer Reading Contest", subjects: ["English"], month: 6, phase: "Typically begins in June", department: "English", status: "Department considering" },
  { id: "james-dyson", name: "James Dyson Award", subjects: ["Engineering", "Design"], month: 7, phase: "Registration typically opens", department: "Design Technology", status: "Department considering" },
  { id: "brain-bee", name: "International Brain Bee", subjects: ["Medicine", "Science"], month: 7, phase: "Participation period typically active", department: "Science", status: "Department considering" }
].map((competition) => ({
  ...competition,
  yearGroups: ["Needs verification"],
  registration: competition.phase,
  deadline: "Exact date needs verification",
  officialUrl: "",
  schoolLead: "TBC",
  verification: "Verify current dates, eligibility and entry route on the official competition website."
}));

export const statuses = ["Recommended", "Department considering", "Pupils entered"];
