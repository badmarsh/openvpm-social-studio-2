import { BrandKit, Template, Post } from '../types';

export const DEFAULT_PRACTICE_ID = 'practice_oakwood_vet';

export const DEFAULT_BRAND_KIT: BrandKit = {
  practiceId: DEFAULT_PRACTICE_ID,
  clinicName: 'Oakwood Veterinary Hospital & Wellness Center',
  logoUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=200&q=80',
  primaryColor: '#0d9488', // Teal 600
  secondaryColor: '#f5f5f4', // Sand neutral
  fontStyle: 'warm',
  toneOfVoice: 'Compassionate, clear, reassuring, community-minded, and easy for any pet owner to understand.',
  services: [
    'Wellness & Preventive Care',
    'Comprehensive Dental Care',
    'Routine & Advanced Surgery',
    'In-House Diagnostics & Digital X-Ray',
    'Senior Pet Care Management',
    'Microchipping & Vaccinations'
  ],
  teamMembers: [
    {
      id: 'tm_1',
      name: 'Dr. Sarah Lin, DVM',
      role: 'Medical Director',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tm_2',
      name: 'Marcus Vance, LVT',
      role: 'Lead Veterinary Technician',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'tm_3',
      name: 'Elena Rostova',
      role: 'Client Care Coordinator',
      photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80'
    }
  ],
  address: '1420 Oakwood Valley Way, Suite 100, Austin, TX 78745',
  phone: '(512) 555-0198',
  website: 'www.oakwoodvetclinic.com',
  disclaimerText: 'For general pet wellness awareness only. Always consult our veterinary team directly for personalized medical evaluations or emergency triage.'
};

export const SEED_TEMPLATES: Template[] = [
  // Preventive Care & Wellness
  {
    id: 'tpl_vaccine_reminder',
    category: 'Preventive Care & Wellness',
    name: 'Vaccine/Parasite Reminder',
    description: 'Friendly callout for a specific overdue care topic with light urgency and a call-to-book CTA.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A warm graphic reminding pet owners about {{topic}} (e.g. Heartworm/Flea/Rabies protection). Warm teal and soft sand background, featuring a happy healthy dog and cat.',
    exampleCaption: 'Is your pet up to date on heartworm and flea prevention? Protecting your furry family members is easiest when done regularly. Give us a call or book online to check their wellness schedule!'
  },
  {
    id: 'tpl_wellness_plan',
    category: 'Preventive Care & Wellness',
    name: 'Wellness Plan Spotlight',
    description: 'Explain one wellness plan benefit in plain language without inventing prices.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An inviting graphic highlighting {{benefit}} (e.g. complimentary dental checks or annual bloodwork) as part of custom pet wellness care.',
    exampleCaption: 'Our comprehensive wellness plans include routine preventative checkups and early health screenings so your pet enjoys a happy, active life. [[insert plan details]]'
  },
  {
    id: 'tpl_senior_pet',
    category: 'Preventive Care & Wellness',
    name: 'Senior Pet Checkup Nudge',
    description: 'Warm, non-alarming reminder that senior pets benefit from twice-yearly checkups.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A gentle image of a loving senior Golden Retriever or tabby cat resting comfortably next to an attentive vet staff member.',
    exampleCaption: 'Pets age faster than we do! Senior pets (7+ years) thrive with bi-annual wellness exams to catch subtle changes early. Schedule a cozy checkup with our team today.'
  },

  // Educational
  {
    id: 'tpl_did_you_know',
    category: 'Educational',
    name: 'Did You Know?',
    description: 'One true, non-diagnostic pet-health fact, framed as "ask your vet," not definitive advice.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An educational quote card graphic asking "Did You Know?" regarding {{factTopic}} with a playful paw illustration.',
    exampleCaption: 'Did you know cats are masters at masking discomfort? Regular gentle exams help us keep tabs on their joint health and hydration. Have questions? Ask our veterinary team at your next visit!'
  },
  {
    id: 'tpl_myth_vs_fact',
    category: 'Educational',
    name: 'Myth vs. Fact',
    description: 'A common pet-care myth followed by an accurate, non-alarming correction.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A 2-panel comparison graphic side-by-side: MYTH: {{mythText}} | FACT: {{factText}}. Clean layout with teal headers.',
    exampleCaption: 'MYTH: Dogs with warm, dry noses are always sick.\n\nFACT: A dog’s nose temperature fluctuates naturally throughout the day! Always look at activity level and appetite instead, and call us if you ever feel unsure.'
  },
  {
    id: 'tpl_when_to_call',
    category: 'Educational',
    name: 'When to Call Us',
    description: 'Non-diagnostic checklist of symptoms that warrant a call — explicitly not a medical diagnosis.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A clean checklist graphic titled "When To Give Our Clinic A Call" listing key wellness indicators.',
    exampleCaption: 'Not sure if your pet needs to be seen? Here are 4 signs it is time for a quick checkup:\n• Changes in drinking or eating habits\n• Persistent coughing or lethargy\n• Sudden mobility changes\n• Unexplained hiding behavior'
  },
  {
    id: 'tpl_seasonal_hazard',
    category: 'Educational',
    name: 'Seasonal Hazard Tip',
    description: 'Seasonal-hazard awareness plus a practical prevention tip.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A seasonal graphic highlighting safety tips regarding {{seasonOrHazard}} (e.g. summer heat paw protection or holiday plant hazards).',
    exampleCaption: 'As temperatures rise, pavement gets hot fast! Test the sidewalk with the back of your hand for 7 seconds. If it is too hot for you, it is too hot for your pup’s paws.'
  },

  // Practice & Team
  {
    id: 'tpl_meet_team',
    category: 'Practice & Team',
    name: 'Meet the Team',
    description: 'Warm intro to a named staff member: role, fun fact, why they love vet med.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A friendly staff spotlight card featuring {{memberName}}, {{role}}, with a soft warm background.',
    exampleCaption: 'Meet {{memberName}}, our {{role}}! Fun fact: {{funFact}}. "My favorite part of working at {{clinicName}} is building lifelong bonds with our patients and making vet visits fear-free!"'
  },
  {
    id: 'tpl_day_in_life',
    category: 'Practice & Team',
    name: 'Day in the Life',
    description: 'Upbeat behind-the-scenes montage feel, no graphic medical imagery.',
    platforms: ['IG', 'Reels'],
    aspectRatios: ['9:16', '1:1'],
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'Behind the scenes montage clip showing morning prep, cozy treat stations, and team smiles.',
    exampleCaption: 'Ever wondered what happens behind the scenes at {{clinicName}}? From morning patient belly rubs to organizing gentle recovery suites, our team puts heart into every moment.'
  },
  {
    id: 'tpl_new_service',
    category: 'Practice & Team',
    name: 'New Service Announcement',
    description: 'Announce a new service or equipment in benefit-focused language.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An announcement graphic introducing {{serviceName}} with modern, gentle medical imagery.',
    exampleCaption: 'We are thrilled to now offer {{serviceName}}! This allows our care team to evaluate your pet with even greater precision and comfort. Tap the link in bio or call us to learn more.'
  },
  {
    id: 'tpl_milestone',
    category: 'Practice & Team',
    name: 'Practice Milestone',
    description: 'Celebrate an anniversary or community milestone with your clients.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1516453734593-8d198ae84bcf?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A celebratory graphic with soft festive accents marking {{milestoneText}}.',
    exampleCaption: 'We are celebrating {{milestoneText}}! Thank you to our incredible pet community for trusting us with your pets’ care year after year. We could not do this without you!'
  },

  // Client & Patient Engagement
  {
    id: 'tpl_pet_of_week',
    category: 'Client & Patient Engagement',
    name: 'Pet of the Week',
    description: 'Celebrate a client-submitted pet photo. REQUIRES photo-consent flag before use.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A cute "Pet of the Week" frame showcasing {{petName}} the {{breedOrSpecies}} with star accents.',
    exampleCaption: 'Meet {{petName}}, our Pet of the Week! {{petName}} brought so many smiles to our clinic during their routine visit. Give them a round of applause in the comments below! 🐾',
    requiresConsent: true
  },
  {
    id: 'tpl_before_after',
    category: 'Client & Patient Engagement',
    name: 'Before/After Grooming',
    description: 'Cosmetic transformation only, never implies medical outcome. REQUIRES consent flag.',
    platforms: ['IG'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A 2-panel side-by-side cosmetic grooming transformation card for {{petName}}.',
    exampleCaption: 'Look at this fluffy spa day transformation! {{petName}} walked out feeling fresh and ready for cuddle time. Cosmetic grooming spa appointments fill up fast—book your pet’s pampering session today!',
    requiresConsent: true
  },
  {
    id: 'tpl_testimonial_card',
    category: 'Client & Patient Engagement',
    name: 'Client Testimonial Card',
    description: 'Quote-card layout for a REAL testimonial pasted in by staff. Never invent a quote.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1554692997-c750694e211f?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An elegant review quote card with 5 star ratings and a warm testimonial text layout.',
    exampleCaption: '"{{pastedQuote}}" — {{clientName}}\n\nThank you so much for your kind words! Our staff strives to treat every pet like our own.',
    requiresQuoteInput: true,
    requiresConsent: true
  },
  {
    id: 'tpl_engagement_poll',
    category: 'Client & Patient Engagement',
    name: 'Engagement Poll',
    description: 'Light prompt with illustrated options for community interaction.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1596773356073-102dbd6ec032?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An interactive question graphic asking {{pollQuestion}} with Option A vs Option B visual choices.',
    exampleCaption: 'Settling a friendly debate in the clinic today: Is your pet a morning alarm clock or a habitual snooze button presser? Drop an emoji below to vote! ⏰🐶🐱'
  },

  // Promotions & Announcements
  {
    id: 'tpl_seasonal_offer',
    category: 'Promotions & Announcements',
    name: 'Seasonal Offer',
    description: 'Time-bound offer using brand-kit details. Never invent a discount amount.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1605263152648-522dbf9e9de2?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A clean promotional graphic highlighting {{offerTitle}} at {{clinicName}} with a call-to-book banner.',
    exampleCaption: 'Spring into wellness! During {{offerTitle}}, schedule your pet’s checkup and ask our team about preventative wellness benefits. [[insert specific offer details]]'
  },
  {
    id: 'tpl_new_client',
    category: 'Promotions & Announcements',
    name: 'New Client Welcome',
    description: 'Welcoming invitation to book a first visit for new neighbors.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A warm, inviting graphic welcoming new pets and families to {{clinicName}}.',
    exampleCaption: 'New to the area or looking for a fear-free veterinary team? We are welcoming new patients! Visit {{website}} or call {{phone}} to schedule your first visit.'
  },
  {
    id: 'tpl_holiday_hours',
    category: 'Promotions & Announcements',
    name: 'Holiday Hours',
    description: 'Clear, calm hours-change notice for upcoming holidays.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A clear informational notice detailing clinic holiday hours for {{holidayName}}.',
    exampleCaption: 'Please note our upcoming clinic hours for {{holidayName}}:\n• {{dateAndHours}}\n\nBe sure to request medication refills early so your pets stay covered!'
  },
  {
    id: 'tpl_urgent_hours',
    category: 'Promotions & Announcements',
    name: 'Urgent/Emergency Care Hours',
    description: 'Clear statement of after-hours availability. Never gives triage medical advice.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1626201389868-b80587d603a1?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A bold, easy-to-read emergency contact and urgent care hours information card.',
    exampleCaption: 'Knowing where to turn in an emergency brings peace of mind. Here is our current urgent care availability and trusted partner emergency clinic details for after-hours care.'
  },

  // Community & Events
  {
    id: 'tpl_adoption_partner',
    category: 'Community & Events',
    name: 'Adoption/Shelter Partner Spotlight',
    description: 'Spotlight a partner shelter or adoptable pet with clear attribution to partner org.',
    platforms: ['IG', 'FB'],
    aspectRatios: ['1:1', '4:5'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'A shelter spotlight card featuring {{partnerName}} and an adoptable pet photo.',
    exampleCaption: 'Community Spotlight! We are proud to partner with {{partnerName}}. Meet {{petName}}, currently looking for a forever home! Contact {{partnerName}} directly for adoption details.'
  },
  {
    id: 'tpl_community_event',
    category: 'Community & Events',
    name: 'Community Event Invite',
    description: 'Open house / vaccine clinic / microchip event with date, time, and location fields.',
    platforms: ['IG', 'FB', 'GBP'],
    aspectRatios: ['1:1', '4:5', '16:9'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',
    promptSkeleton: 'An event flyer graphic for {{eventName}} on {{eventDate}} at {{clinicName}}.',
    exampleCaption: 'Join us for {{eventName}}!\n📅 Date: {{eventDate}}\n⏰ Time: {{eventTime}}\n📍 Location: {{clinicName}}\n\nStop by to meet the team, learn pet tips, and enjoy community fun!'
  },

  // Reels / Video-first (Stubs)
  {
    id: 'tpl_quick_tip_reel',
    category: 'Reels / Video-first',
    name: 'Quick Tip Reel',
    description: '15-20s hook + one tip + CTA.',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Short video concept: 15 second quick wellness tip.',
    exampleCaption: '3 simple steps to keep your pup’s teeth clean at home! 🦷✨ Tap to learn more.',
    isStub: true
  },
  {
    id: 'tpl_vet_intro_reel',
    category: 'Reels / Video-first',
    name: 'Meet-the-Vet Intro Reel',
    description: 'Short, warm intro concept for a named vet.',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Short video concept: Meet Dr. Sarah Lin in 20 seconds.',
    exampleCaption: 'Get to know Dr. Sarah Lin! Why she chose vet med and her favorite patient stories.',
    isStub: true
  },
  {
    id: 'tpl_cuteness_reel',
    category: 'Reels / Video-first',
    name: 'Patient Cuteness Reel',
    description: 'Charming short clip featuring a consented patient photo animated to motion.',
    platforms: ['Reels', 'TikTok'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Short video concept: Cute patient moment clip.',
    exampleCaption: 'When the treat jar opens at Oakwood Vet! 🐾 Instant happiness.',
    isStub: true
  },
  {
    id: 'tpl_procedure_explainer_reel',
    category: 'Reels / Video-first',
    name: 'Procedure Explainer Reel',
    description: 'Plain-language explainer of a routine, non-graphic procedure to reduce client anxiety.',
    platforms: ['Reels'],
    aspectRatios: ['9:16'],
    mediaType: 'video',
    promptSkeleton: 'Short video concept: What happens during a routine dental cleaning.',
    exampleCaption: 'Demystifying routine dental cleanings! Here is how we ensure your pet rests comfortably.',
    isStub: true
  }
];

export const INITIAL_DEMO_POSTS: Post[] = [
  {
    id: 'post_demo_1',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_vaccine_reminder',
    status: 'scheduled',
    createdBy: 'Marcus Vance (Tech)',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    scheduledTime: '10:00 AM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Is your pet protected for the upcoming season? Flea, tick, and heartworm preventatives are essential year-round protection. Give Oakwood Veterinary Hospital a call today to review your pet’s wellness plan!',
        hashtags: ['#OakwoodVet', '#PetHealth', '#FleaAndTickPrevention', '#VetCare', '#AustinPets', '#WellnessExam'],
        mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Happy Golden Retriever receiving a friendly checkup at a veterinary clinic.'
      },
      FB: {
        platform: 'FB',
        caption: 'Is your pet protected for the upcoming season? Flea, tick, and heartworm preventatives are essential year-round protection. Give Oakwood Veterinary Hospital a call today to review your pet’s wellness plan!',
        hashtags: ['#OakwoodVet', '#PetWellness', '#AustinPets'],
        mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Happy Golden Retriever receiving a friendly checkup at a veterinary clinic.'
      }
    },
    reviewNotes: ['Approved by Dr. Sarah Lin on Monday morning.'],
    history: [
      {
        id: 'hist_1',
        status: 'draft',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        user: 'Marcus Vance',
        note: 'Created initial draft from template'
      },
      {
        id: 'hist_2',
        status: 'in_review',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        user: 'Marcus Vance',
        note: 'Submitted for manager review'
      },
      {
        id: 'hist_3',
        status: 'scheduled',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        user: 'Dr. Sarah Lin (Approver)',
        note: 'Approved and scheduled for Thursday at 10:00 AM'
      }
    ],
    overlayText: 'Protection Time! 🐾',
    hasWatermark: true
  },
  {
    id: 'post_demo_2',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_senior_pet',
    status: 'in_review',
    createdBy: 'Elena Rostova (Front Desk)',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    scheduledTime: '02:00 PM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Did you know senior pets benefit from twice-yearly checkups? As pets grow older, subtle health changes are easiest to support when detected early. We love taking care of our senior furry friends at Oakwood Vet!',
        hashtags: ['#SeniorPetCare', '#OakwoodVet', '#PawsomeSeniors', '#AustinVets', '#PetWellness'],
        mediaUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '4:5',
        altText: 'A cozy senior dog resting comfortably with gentle care.'
      }
    },
    reviewNotes: ['Elena: Added extra soft tone for senior pet parents.'],
    history: [
      {
        id: 'hist_4',
        status: 'draft',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        user: 'Elena Rostova',
        note: 'Drafted post for senior month spotlight'
      },
      {
        id: 'hist_5',
        status: 'in_review',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        user: 'Elena Rostova',
        note: 'Requested review from Dr. Lin'
      }
    ],
    overlayText: 'Cozy Senior Care 💛',
    hasWatermark: true
  },
  {
    id: 'post_demo_3',
    practiceId: DEFAULT_PRACTICE_ID,
    templateId: 'tpl_pet_of_week',
    status: 'draft',
    createdBy: 'Marcus Vance (Tech)',
    createdAt: new Date().toISOString(),
    scheduledDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    scheduledTime: '11:30 AM',
    variants: {
      IG: {
        platform: 'IG',
        caption: 'Meet Milo, our Pet of the Week! 🐾 Milo came in for a routine checkup and charmed everyone in the lobby. Leave a star in the comments for Milo!',
        hashtags: ['#PetOfTheWeek', '#OakwoodPets', '#CuteDogAlert', '#AustinVetLife'],
        mediaUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
        aspectRatio: '1:1',
        altText: 'Milo the fluffy puppy smiling at the camera.'
      }
    },
    hasConsent: true,
    reviewNotes: ['Client consent signed in clinic app.'],
    history: [
      {
        id: 'hist_6',
        status: 'draft',
        timestamp: new Date().toISOString(),
        user: 'Marcus Vance',
        note: 'Draft created with owner consent verified'
      }
    ],
    overlayText: 'Pet of the Week! ⭐',
    hasWatermark: true
  }
];

export const SEED_CANVAS_TEMPLATES: import('../types').CanvasTemplate[] = [
  {
    id: 'tpl_sop_intake',
    name: 'Klinický SOP: Prijatie pacienta',
    description: 'Štandardný operačný postup pre príjem pacienta v ambulancii s Fear-Free protokolom.',
    category: 'SOP',
    contentSkeleton: `<h1>Klinický Štandardný Operačný Postup (SOP): Prijatie Pacienta</h1>
<p><em>Verzia 2.4 | Platnosť od: 2026-01-01 | Schválil: MVDr. Sarah Lin</em></p>

<h2>1. Recepcia (Front Desk)</h2>
<ul>
  <li><strong>Privítanie klienta:</strong> Pozdravte klienta a zvieratko menom v pokojnom, nízkom tóne.</li>
  <li><strong>Fear-Free kontrola:</strong> Ponúknite feromónovú utierku (Adaptil pre psov, Feliway pre mačky) priamo na prepravku.</li>
  <li><strong>Overenie údajov:</strong> Skontrolujte kontaktné údaje a očkovací preukaz v systéme OpenVPM.</li>
</ul>

<h2>2. Veterinárny Techník (Vet Tech)</h2>
<ul>
  <li><strong>Váženie & Triage:</strong> Odvážte pacienta bez stresu (pamlsky na váhe). Zmerajte teplotu a tep.</li>
  <li><strong>Anamnéza:</strong> Zapíšte hlavné problémy zvieratka a doterajšiu liečbu do OpenVPM karty.</li>
</ul>

<h2>3. Veterinárny Lekár (Vet)</h2>
<ul>
  <li><strong>Klinické vyšetrenie:</strong> Vykonajte systematické vyšetrenie (nos-chvost) za prítomnosti majiteľa.</li>
  <li><strong>Plán starostlivosti:</strong> Vysvetlite diagnostiku a navrhnutú liečbu zrozumiteľným, nenaháňajúcim strach tónom.</li>
</ul>`
  },
  {
    id: 'tpl_financial_kpi',
    name: 'Finančný plán a KPIs',
    description: 'Strategický finančný model, cieľové tržby a diagram akvizície klientov.',
    category: 'Strategy',
    contentSkeleton: `<h1>Strategický Finančný Plán & KPIs 2026</h1>
<p>Prehľad finančných scenárov a akvizičného toku pre OpenVPM ambulanciu.</p>

<h2>1. Scenáre Tržieb (Revenue Scenarios)</h2>
<table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 8px;">Scenár</th>
      <th style="padding: 8px;">Mesačné Návštevy</th>
      <th style="padding: 8px;">Priemerný Účet (€)</th>
      <th style="padding: 8px;">Mesačný Obrat (€)</th>
      <th style="padding: 8px;">Cieľ Wellness Plánov</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Konservatívny</td>
      <td style="padding: 8px;">320</td>
      <td style="padding: 8px;">65 €</td>
      <td style="padding: 8px;">20 800 €</td>
      <td style="padding: 8px;">45 aktivácií</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>Cieľový (Base Case)</strong></td>
      <td style="padding: 8px;"><strong>450</strong></td>
      <td style="padding: 8px;"><strong>78 €</strong></td>
      <td style="padding: 8px;"><strong>35 100 €</strong></td>
      <td style="padding: 8px;"><strong>80 aktivácií</strong></td>
    </tr>
    <tr>
      <td style="padding: 8px;">Rastový (Optimistický)</td>
      <td style="padding: 8px;">580</td>
      <td style="padding: 8px;">92 €</td>
      <td style="padding: 8px;">53 360 €</td>
      <td style="padding: 8px;">120 aktivácií</td>
    </tr>
  </tbody>
</table>

<h2>2. Akvizičný Tok Klientov (Aquisition Flowchart)</h2>
<pre class="mermaid">
graph TD
    A[Online Reklama / Google Recenzie] --> B[Sociálne Siete & Edukatívny Príspevok]
    B --> C[Rezervácia cez OpenVPM Portal]
    C --> D[Prvá Návšteva & Fear-Free Zážitok]
    D --> E[Aktivácia Ročného Wellness Plánu]
    E --> F[Lojálny Klient & Odporúčanie]
</pre>`
  },
  {
    id: 'tpl_hr_job_post',
    name: 'Pracovný Inzerát: Asistentka',
    description: 'Empaticky formulovaný pracovný inzerát pre veterinárneho asistenta s dôrazom na Fear-Free.',
    category: 'HR',
    contentSkeleton: `<h1>Pracovná pozícia: Veterinárny Asistent / Asistentka (Fear-Free)</h1>
<p><strong>Miesto práce:</strong> OpenVPM Pet Clinic | <strong>Druh pracovného pomeru:</strong> Plný úväzok / Skrátený úväzok</p>

<h2>O nás</h2>
<p>V OpenVPM Pet Clinic veríme, že návšteva veterinára nemusí byť spojená so stresom. Hľadáme empatického kolegu/kolegyňu, pre ktorého je pohoda zvierat a klientov na prvom mieste.</p>

<h2>Náplň práce</h2>
<ul>
  <li>Asistencia pri vyšetreniach a zákrokoch s využitím Fear-Free metodiky.</li>
  <li>Komunikácia s majiteľmi zvierat pri príjme a odovzdávaní pacientov.</li>
  <li>Starostlivosť o hospitalizovaných pacientov a príprava operačnej sály.</li>
  <li>Práca s veterinárnym softvérom OpenVPM.</li>
</ul>

<h2>Požiadavky</h2>
<ul>
  <li>Láskavý a trpezlivý prístup ku zvieratám.</li>
  <li>Zmysel pre detail, spoľahlivosť a tímový duch.</li>
  <li>Prax vo veterinárnej oblasti je výhodou, nie však podmienkou – radi vás zaškolíme!</li>
</ul>`
  },
  {
    id: 'tpl_client_handout',
    name: 'Klientsky edukačný leták',
    description: 'Dvojjazyčný (SK/HU) leták starostlivosti po operačnom zákroku.',
    category: 'Client_Handout',
    contentSkeleton: `<h1>Edukačný Leták: Starostlivosť po Operačnom Zákroku / Műtét utáni ápolás</h1>
<p>Dôležité pokyny pre majiteľov po prepustení pacienta z domácej opatery.</p>

<table border="1" style="width:100%; border-collapse: collapse;">
  <thead>
    <tr style="background-color: #0d9488; color: white;">
      <th style="padding: 10px; width: 50%;">Slovenský Jazyk (SK)</th>
      <th style="padding: 10px; width: 50%;">Magyar Nyelv (HU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; vertical-align: top;">
        <h3>1. Odpočinok a Kľud</h3>
        <p>Pacienta umiestnite do teplej, tichej miestnosti bez prievanu. Zamedzte skákaniu na nábytok aspoň 7-10 dní.</p>
        <h3>2. Kŕmenie a Voda</h3>
        <p>Vodu podávajte v malých množstvách. Krmivo ponúknite až večer (polovičnú dávku), ak zviera nezvracia.</p>
        <h3>3. Kontrola Rany</h3>
        <p>Ranu udržujte čistú a suchú. Zamedzte lízaniu rany pomocou ochranného goliera.</p>
      </td>
      <td style="padding: 10px; vertical-align: top;">
        <h3>1. Pihenés és Nyugalom</h3>
        <p>Helyezze a beteget meleg, csendes, huzatment bútorra ugrálást legalább 7-10 napig kerülje.</p>
        <h3>2. Etetés és Itatás</h3>
        <p>Kis adagokban adjon vizet. Ételt csak este kínáljon (fél adagot), ha a kedvenc nem hány.</p>
        <h3>3. A Seb Ellenőrzése</h3>
        <p>Tartsa a sebet tisztán és szárazon. Akadályozza meg a seb nyalogatását védőgallérral.</p>
      </td>
    </tr>
  </tbody>
</table>`
  }
];

export const SEED_CANVAS_DOCUMENTS: import('../types').CanvasDocument[] = [
  {
    id: 'doc_1',
    practiceId: DEFAULT_PRACTICE_ID,
    title: 'Klinický SOP: Prijatie pacienta v ambulancii',
    content: SEED_CANVAS_TEMPLATES[0].contentSkeleton,
    status: 'published',
    authorId: 'user_1',
    authorName: 'MVDr. Sarah Lin',
    tags: ['SOP', 'Fear-Free', 'Recepcia'],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'doc_2',
    practiceId: DEFAULT_PRACTICE_ID,
    title: 'Finančný plán a KPIs 2026',
    content: SEED_CANVAS_TEMPLATES[1].contentSkeleton,
    status: 'draft',
    authorId: 'user_2',
    authorName: 'Marcus Vance',
    tags: ['Financie', 'Strategia', 'KPIs'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

